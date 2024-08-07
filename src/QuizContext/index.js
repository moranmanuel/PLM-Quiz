import React from 'react';
import { addData } from '../Supabase/addData'
import { supabase } from '../Supabase/supabaseClient';

const QuizContext = React.createContext();

function QuizProvider({ children }) {
    const [gameStarted, setGameStarted] = React.useState(false);
    const [gameOver, setGameOver] = React.useState(false);
    const [quizQuestions, setQuizQuestions] = React.useState([]);
    const [optionsArraySorted, setOptionsArraySorted] = React.useState([]);
    const [isAnswerCorrect, setIsAnswerCorrect] = React.useState(false);
    const [answer, setAnswer] = React.useState('');
    const [score, setScore] = React.useState(0);
    const [disableOptions, setDisableOptions] = React.useState(false);
    const [timeLeft, setTimeLeft] = React.useState(10); 
    const [isTimerActive, setIsTimerActive] = React.useState(false); 
    const [isTimeOver, setIsTimeOver] = React.useState(false); 
    const [playerName, setPlayerName] = React.useState('')
    const [error, setError] = React.useState(false)
    const [shake, setShake] = React.useState(false)
    const [playersSupabase, setPlayersSupabase] = React.useState([]);
    
    React.useEffect(() => {
        getPlayers();
        getQuestions();
    }, []);
    
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    async function getPlayers() {
        const { data } = await supabase.from("players").select().order('score', {ascending: false });
        setPlayersSupabase([...data]);
    }

    async function getQuestions() {
        const { data } = await supabase.from("quiz_questions").select();
        
        const shuffledData = shuffleArray(data)
        setQuizQuestions([...shuffledData]);
        
        if (data.length > 0) {
            setOptionsArraySorted(shuffleArray(data[0].options))
        }
    }

    const startGame = () => {
        if (playerName && !isNameAlreadyTaken()) {
            createPlayer()
            setGameStarted(true);
            setIsTimerActive(true);        
        } else {
            setError(true)
            setShake(true)
            setTimeout(() => setShake(false), 200)
            setTimeout(() => setShake(false), 200)
        }
    }

    const checkAnswer = (text) => {
        setDisableOptions(true)
        setTimeout(() => setDisableOptions(false), 2000)
        if (text === quizQuestions[0].correct_answer) {
            updateScore()
            setIsAnswerCorrect(true)
            setAnswer(text)   
            setTimeout(() => setIsAnswerCorrect(false), 2000)
            setTimeout(() => setAnswer(''), 2000)
            setTimeout(() => updateQuestions(), 2000)
        } else if (!text) {
            setIsTimeOver(true)
            setTimeout(() => updateQuestions(), 2000)
            setTimeout(() => setIsTimeOver(false), 2000)
        } else {
            setIsAnswerCorrect(false)
            setAnswer(text)   
            setTimeout(() => updateQuestions(), 2000)
            setTimeout(() => setAnswer(''), 2000)
        }
        setIsTimerActive(false);
    }

    const updateScore = () => {
        setScore(prevState => prevState+1)
        updateRanking()
    }

    const updateRanking = () => {
        for (let i = 0; i < playersSupabase.length; i++) {
            playersSupabase[i].ranking = i+1
        }

        updateRecords()
    }

    const updateRecords = async () => {
        await supabase.from('players').update({ score: score + 1 }).eq('name', playerName)
        for (let i = 0; i < playersSupabase.length; i++) {
            await supabase.from('players').update({ ranking: i+1 }).eq('name', playersSupabase[i].name)
        }
    }

    const updateQuestions = async () => {
        quizQuestions.splice(0,1)
        
        if (quizQuestions.length > 0) {
            setTimeLeft(10);
            setIsTimerActive(true)
            setOptionsArraySorted(shuffleArray(quizQuestions[0].options))
        } else {
            setGameStarted(false)
            setGameOver(true)
        }
    }

    const isNameAlreadyTaken = () => {
        return playersSupabase && playersSupabase.some(obj => obj.name.toLowerCase() === playerName.toLowerCase());
    }

    const createPlayer = async () => {
        const newPlayer = {name:playerName, score:0, ranking:playersSupabase.length}
        await addData(newPlayer);
    }

    React.useEffect(() => {
        if (isTimerActive && !isTimeOver) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            checkAnswer()
        }
    }, [isTimerActive, timeLeft]);

    return (
        <QuizContext.Provider value={{
            gameStarted,
            gameOver,
            optionsArraySorted,
            isAnswerCorrect,
            answer,
            disableOptions,
            timeLeft,
            isTimeOver,
            checkAnswer,
            playerName,
            setPlayerName,
            error,
            shake,
            startGame,
            playersSupabase,
            score,
            quizQuestions
        }}>
            {children}
        </QuizContext.Provider>
    );
}

export { QuizContext, QuizProvider };