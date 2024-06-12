import React from 'react';

const QuizContext = React.createContext();

function QuizProvider({ children }) {
    const defaultQuestions = [
        'En que año empezo Paren la mano?',
        'Quien popularizo el famoso "EEEEESI"?',
        'Quien es el integrante del programa con mejor asistencia?'
    ]
    
    const defaultOptions = [
        ['2022', '2021', '2023', '2024'],
        ['Alfredo', 'Luquitas', 'German', 'Roberto'],
        ['Alfredo', 'German', 'Roberto', 'Luquitas']
    ]

    const aleatory = (max) => {
        return Math.floor(Math.random() * ((max -1) - 0 + 1) + 0)
    }

    const shuffleOptions = (arr) => {
        let newSortedArray = [...arr]
        for (let i = newSortedArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newSortedArray[i], newSortedArray[j]] = [newSortedArray[j], newSortedArray[i]]
        }
        return newSortedArray
    }

    const [gameStarted, setGameStarted] = React.useState(false)
    const [gameOver, setGameOver] = React.useState(false)
    const [questionsArray, setQuestionsArray] = React.useState(defaultQuestions)
    const [optionsArray, setOptionsArray] = React.useState(defaultOptions)
    const [aleatoryNumber, setAleatoryNumber] = React.useState(aleatory(questionsArray.length))
    const [optionsArraySorted, setOptionsArraySorted] = React.useState(shuffleOptions(optionsArray[aleatoryNumber]))
    const [isAnswerCorrect, setIsAnswerCorrect] = React.useState(false)
    const [answer, setAnswer] = React.useState('')
    const [correctAnswers, setCorrectAnswers] = React.useState(0)
    const [disableOptions, setDisableOptions] = React.useState(false)

    const totalAnswers = defaultQuestions.length

    const checkAnswer = (text) => {
        setDisableOptions(true)
        setTimeout(() => setDisableOptions(false), 2000)
        if (text === optionsArray[aleatoryNumber][0]) {
            setCorrectAnswers(prevState => prevState+1)
            setIsAnswerCorrect(true)
            setAnswer(text)   
            setTimeout(() => setIsAnswerCorrect(false), 2000)
            setTimeout(() => setAnswer(''), 2000)
            setTimeout(() => updateQuestions(), 2000)
        } else {
            setIsAnswerCorrect(false)
            setAnswer(text)   
            setTimeout(() => updateQuestions(), 2000)
            setTimeout(() => setAnswer(''), 2000)
        }
    }

    const updateQuestions = () => {
        if (questionsArray.length > 1) {
            const newQuestionsArray = [...questionsArray]
            const newOptionsArray = [...optionsArray]
            newQuestionsArray.splice(aleatoryNumber, 1)
            newOptionsArray.splice(aleatoryNumber, 1)
            setQuestionsArray(newQuestionsArray)
            let newAleatoryNumber = aleatory(newQuestionsArray.length)
            setOptionsArray(newOptionsArray)
            setAleatoryNumber(newAleatoryNumber)
            setOptionsArraySorted(shuffleOptions(newOptionsArray[newAleatoryNumber]))
        } else {
            setGameStarted(false)
            setGameOver(true)
        }
    }
    
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
            correctAnswers,
            disableOptions,
            totalAnswers,
            checkAnswer,
            shuffleOptions
        }}>
            {children}
        </QuizContext.Provider>
    );
}

export { QuizContext, QuizProvider };