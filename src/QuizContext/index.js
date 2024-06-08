import React from 'react';

const QuizContext = React.createContext();

function QuizProvider({ children }) {
    const [gameStarted, setGameStarted] = React.useState(false)
    const [aleatoryNumber, setAleatoryNumber] = React.useState(0)

    const questionsArray = [
        'En que año empezo Paren la mano?',
        'Quien popularizo el famoso "EEEEESI"?',
        'Quien es el integrante del programa con mejor asistencia?'
    ]

    const optionsArray = [
        ['2022', '2021', '2023', '2024'],
        ['Alfredo', 'Luquitas', 'German', 'Roberto'],
        ['Alfredo', 'Luquitas', 'German', 'Roberto']
    ]

    const aleatory = (max) => {
        return Math.floor(Math.random() * ((max -1) - 0 + 1) + 0)
    }

    const question = () => {
      return questionsArray[aleatoryNumber]
    }

    const options = []

    console.log(aleatoryNumber);

    options.push(...optionsArray[aleatoryNumber])



    const checkAnswer = (text) => {
        if (text === optionsArray[aleatoryNumber][0]) {
            alert('La respuesta es correcta')
            questionsArray.splice(aleatoryNumber, 1)
            console.log(questionsArray)
            optionsArray.splice(aleatoryNumber, 1)
            console.log(optionsArray)
            setAleatoryNumber(aleatory(questionsArray.length))
        }
    }

    return (
        <QuizContext.Provider value={{
            gameStarted,
            setGameStarted,
            optionsArray,
            question,
            options,
            checkAnswer
        }}>
            {children}
        </QuizContext.Provider>
    );
}

export { QuizContext, QuizProvider };