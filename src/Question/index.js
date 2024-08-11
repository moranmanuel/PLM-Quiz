import React from 'react';
import './Question.css';
import { QuizContext } from '../QuizContext';
import clsx from 'clsx';

function Question() {
    const {
        quizQuestions,
        largeQuestion
    } = React.useContext(QuizContext)

    return (
        <h1 className={clsx('question', {
            'large-question': largeQuestion()
        })}>
            {quizQuestions[0].question}
        </h1>
    );
}

export { Question };