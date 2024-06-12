import React from 'react';
import './Options.css';
import { QuizContext } from '../QuizContext';
import clsx from 'clsx';


function Options({ text }) {
    const {
        checkAnswer,
        isAnswerCorrect,
        answer,
        disableOptions
    } = React.useContext(QuizContext)
    
    return (
        <li 
            className={clsx('options', {
                'options-correct': isAnswerCorrect && answer === text,
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