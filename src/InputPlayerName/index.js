import { QuizContext } from '../QuizContext';
import './InputPlayerName.css';
import React from 'react';
import clsx from 'clsx';

function InputPlayerName() {
    const {
        playerName,
        setPlayerName,
        error,
        shake,
        startGame
    } = React.useContext(QuizContext)

    const onSubmit = (event) => {
        event.preventDefault()
        startGame()
    }

    return (
        <div className='input-container'>
            <form onSubmit={onSubmit}>
                <input 
                    type='text' 
                    className={clsx('input-player-name', {
                        'input-shake': shake,
                        'input-error': error
                    })}
                    value={playerName}
                    onChange={(event) => {
                        setPlayerName(event.target.value)
                    }}    
                    placeholder='Ingresa tu nombre'
                    autoFocus
                />
            </form>
        </div>
    );
}

export {InputPlayerName};