import React from 'react'
import './Question.css'
import { QuizContext } from '../QuizContext';

function Question() {
    const {
        question
    } = React.useContext(QuizContext)

    return (
        <h1 className='question'>{question()}</h1>
    );
}

export { Question }