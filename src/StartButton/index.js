import React from 'react'
import './StartButton.css'
import { FaPlayCircle } from "react-icons/fa";
import { QuizContext } from '../QuizContext';

function StartButton() {
    const {
        playerName,
        nameIsAlreadyTaken,
        setGameStarted,
        setIsTimerActive,
        setError,
        setShake,
        createPlayer
    } = React.useContext(QuizContext)

    
    const startGame = () => {
        if (playerName && !nameIsAlreadyTaken()) {
            createPlayer()
            setGameStarted(true);
            setIsTimerActive(true);        
        } else {
            setError(true)
            setShake(true)
            setTimeout(() => setShake(false), 200)
            setTimeout(() => setShake(false), 200)
        }
    }

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