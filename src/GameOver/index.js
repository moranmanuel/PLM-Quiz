import React from 'react';
import { QuizContext } from '../QuizContext';
import './GameOver.css'

function GameOver() {
    const {
        players
    } = React.useContext(QuizContext)

    return (
        <div className='gameover-message-container'>
            {players.map((player) => (
                <h1 key={player.name} className='gameover-message'>{player.name} | {player.score}</h1>
            ))}
        </div>
    ); 
}

export { GameOver };