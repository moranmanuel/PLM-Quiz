import React from 'react';
import { addData } from '../Supabase/addData'
import { supabase } from '../Supabase/supabaseClient';

const QuizContext = React.createContext();

function QuizProvider({ children }) {
    // const defaultQuestions = [
    //     'En que año empezo Paren la mano?',
    //     'Quien popularizo el famoso "EEEEESI"?',
    //     'Quien es el integrante del programa con mejor asistencia?'
    // ]
    
    // const defaultOptions = [
    //     ['2022', '2021', '2023', '2024'],
    //     ['Alfredo', 'Luquitas', 'German', 'Roberto'],
    //     ['Alfredo', 'German', 'Roberto', 'Luquitas']
    // ]

    // const defaultAnswersExplanation = [
    //     'PLM empezo en 2022, mas especificamente el 1 de marzo fue el primer programa',
    //     'La broma empezo como una exageracion de grito de messi y rapidamente se hizo furor',
    //     'Segun Jazmin Badia, Alfredo es el integrante que mas asistio al programa seguido por el intrepido Beder'
    // ]

    const shuffleOptions = (arr) => {
        let newSortedArray = [...arr]
        for (let i = newSortedArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newSortedArray[i], newSortedArray[j]] = [newSortedArray[j], newSortedArray[i]]
        }
        return newSortedArray
    }

    const [gameStarted, setGameStarted] = React.useState(false);
    const [gameOver, setGameOver] = React.useState(false);
    const [quizQuestions, setQuizQuestions] = React.useState([]);
    const [questionsArray, setQuestionsArray] = React.useState(defaultQuestions);
    const [optionsArray, setOptionsArray] = React.useState(defaultOptions);
    const [questionNumber, setQuestionNumber] = React.useState(0);
    const [optionsArraySorted, setOptionsArraySorted] = React.useState(shuffleOptions(quizQuestions[questionNumber].options));
    const [isAnswerCorrect, setIsAnswerCorrect] = React.useState(false);
    const [answer, setAnswer] = React.useState('');
    const [score, setScore] = React.useState(0);
    const [disableOptions, setDisableOptions] = React.useState(false);
    const [timeLeft, setTimeLeft] = React.useState(10); 
    const [isTimerActive, setIsTimerActive] = React.useState(false); 
    const [isTimeOver, setIsTimeOver] = React.useState(false); 
    const [answersExplanation, setAnswersExplanation] = React.useState(defaultAnswersExplanation)
    const [playerName, setPlayerName] = React.useState('')
    const [error, setError] = React.useState(false)
    const [shake, setShake] = React.useState(false)
    const [playersSupabase, setPlayersSupabase] = React.useState([]);
    
    React.useEffect(() => {
        getPlayers();
        getQuestions();
    }, []);
  
    async function getPlayers() {
        const { data } = await supabase.from("players").select().order('score', {ascending: false });
        setPlayersSupabase([...data]);
    }

    async function getQuestions() {
        const { data } = await supabase.from("quiz_questions").select('*').eq('is_active', true).order('random()');
        setQuizQuestions([...data]);
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
        if (text === optionsArray[aleatoryNumber][0]) {
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
        await supabase.from('quiz_questions').update({ is_active: false }).eq('id', quizQuestions[questionNumber].id)

        if (quizQuestions.length > 1) {
            setQuestionNumber((prev) => prev + 1)
            setTimeLeft(10);
            setIsTimerActive(true)
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
        const error = await addData(newPlayer);
    }

    React.useEffect(() => {
        if (isTimerActive && timeLeft > 0) {
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
            setGameStarted,
            questionsArray,
            optionsArray,
            aleatoryNumber,
            optionsArraySorted,
            isAnswerCorrect,
            answer,
            disableOptions,
            timeLeft,
            setIsTimerActive,
            isTimeOver,
            checkAnswer,
            shuffleOptions,
            answersExplanation,
            playerName,
            setPlayerName,
            isNameAlreadyTaken,
            error,
            setError,
            shake,
            setShake,
            createPlayer,
            startGame,
            playersSupabase,
            score
        }}>
            {children}
        </QuizContext.Provider>
    );
}

export { QuizContext, QuizProvider };