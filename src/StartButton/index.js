import React from 'react'
import './StartButton.css'
import { FaPlayCircle } from "react-icons/fa";
import { QuizContext } from '../QuizContext';

function StartButton() {
    const {
        setGameStarted
    } = React.useContext(QuizContext)

    return (
        <div className='play-button-container'>
            <FaPlayCircle 
                className='play-button'
                onClick={() => setGameStarted(true)}
            />
        </div>
    );
}

export { StartButton }