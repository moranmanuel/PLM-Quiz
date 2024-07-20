import { QuizContext } from '../QuizContext';
import './InputPlayerName.css';
import React from 'react';
import clsx from 'clsx';

function InputPlayerName() {
    const {
        playerName,
        setPlayerName,
        error,
        shake
    } = React.useContext(QuizContext)

    return (
        <div className='input-container'>
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
            />
        </div>
    );
}

export {InputPlayerName};