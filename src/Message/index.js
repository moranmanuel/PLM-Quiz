import React from 'react';
import './Message.css'
import { QuizContext } from '../QuizContext';
import clsx from 'clsx';


function Message() {
    const {
        isTimeOver,
        answer,
        answersExplanation,
        aleatoryNumber
    } = React.useContext(QuizContext)

    const answerExplanation = answersExplanation[aleatoryNumber] 

    return (
        <p className={clsx('message', {
            'time-over-message': isTimeOver,
            'answer-explanation-message': answer
        })}>{clsx({
            'Se acabo el tiempo!': isTimeOver,
            [answerExplanation]: answer
        })}
        </p>
    );
}

export { Message };