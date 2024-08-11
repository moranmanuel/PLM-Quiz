import React from 'react';
import './Options.css';
import { QuizContext } from '../QuizContext';
import clsx from 'clsx';


function Options({ text }) {
    const {
        checkAnswer,
        isAnswerCorrect,
        answer,
        disableOptions,
        quizQuestions
    } = React.useContext(QuizContext)
    
    return (
        <li 
            className={clsx('options', {
                'last-option': quizQuestions[0].options[3] === text,
                'options-correct': answer && quizQuestions[0].correct_answer === text,
                'options-incorrect': !isAnswerCorrect && answer === text,
                'clicked' : disableOptions
            })}
            onClick={() => checkAnswer(text)}
        >
            <p>{text}</p>
        </li>
    );
}

export { Options }