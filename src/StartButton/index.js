import React from 'react'
import './StartButton.css'
import { FaPlayCircle } from "react-icons/fa";
import { QuizContext } from '../QuizContext';

function StartButton() {
    const {
        startGame
    } = React.useContext(QuizContext)

    return (
        <div className='play-button-container'>
            <FaPlayCircle 
                className='play-button'
                onClick={() => startGame()}
            />
        </div>
    );
}

export { StartButton }