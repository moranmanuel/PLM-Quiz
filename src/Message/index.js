import React from 'react';
import './Message.css'
import { QuizContext } from '../QuizContext';
import clsx from 'clsx';


function Message() {
    const {
        isTimeOver,
        answer,
        quizQuestions,
        largeQuestion
    } = React.useContext(QuizContext)

    const answerExplanation = quizQuestions[0].answer_explanation

    return (
        <p className={clsx('message', {
            'time-over-message' : isTimeOver,
            'answer-explanation-message' : answer,
            'questions-counter' : !isTimeOver && !answer,
            'large-questions' : largeQuestion()
        })}>{clsx({
            'Se acabo el tiempo!': isTimeOver,
            [answerExplanation]: answer
        })}
        </p>
    );
}

export { Message };