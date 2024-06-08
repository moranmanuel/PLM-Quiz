import React from 'react';
import './Options.css'
import { QuizContext } from '../QuizContext';

function Options({ text }) {
    const {
        checkAnswer
    } = React.useContext(QuizContext)
    
    return (
        <li className='options'>
            <p
                onClick={() => checkAnswer(text)}
            >{text}</p>
        </li>
    );
}

export { Options }