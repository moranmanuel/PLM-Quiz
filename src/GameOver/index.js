import React from 'react';
import { QuizContext } from '../QuizContext';
import './GameOver.css'

function GameOver() {
    const {
        correctAnswers,
        totalAnswers
    } = React.useContext(QuizContext)
    return (
        <div className='gameover-message-container'>
            <h1 className='gameover-message'>Respondiste bien {correctAnswers} preguntas de {totalAnswers}</h1>
        </div>
    );
}

export { GameOver };