import React from 'react'
import './Question.css'
import { QuizContext } from '../QuizContext';

function Question() {
    const {
        quizQuestions
    } = React.useContext(QuizContext)
    
    return (
        <h1 className='question'>{quizQuestions[0].question}</h1>
    );
}

export { Question }