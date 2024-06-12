import React from 'react';
import './Timer.css'
import { QuizContext } from '../QuizContext';

function Timer() {
    const {
        timeLeft
    } = React.useContext(QuizContext)

    return (
        <div className='timer'>{timeLeft}</div>
    );
}

export { Timer };