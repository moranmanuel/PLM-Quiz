import React from 'react'
import './Question.css'
import { QuizContext } from '../QuizContext';

function Question() {
    const {
        questionsArray,
        aleatoryNumber
    } = React.useContext(QuizContext)

    return (
        <h1 className='question'>{questionsArray[aleatoryNumber]}</h1>
    );
}

export { Question }