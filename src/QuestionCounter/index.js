import React from 'react';
import './QuestionCounter.css'
import { QuizContext } from '../QuizContext';

function QuestionCounter() {
    const {
        totalQuestions,
        quizQuestions
    } = React.useContext(QuizContext)

    const questionNumber = (totalQuestions + 1) - quizQuestions.length

    return (
        <div className='question-counter'>{`${questionNumber}/${totalQuestions}`}</div>
    );
}

export { QuestionCounter };