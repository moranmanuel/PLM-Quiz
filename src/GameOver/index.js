import React from 'react';
import { QuizContext } from '../QuizContext';
import './GameOver.css'
import clsx from 'clsx';

function GameOver() {
    const {
        players,
        playerName
    } = React.useContext(QuizContext)

    const currentPlayerIndex = players.findIndex(player => player.name === playerName)
    const topPlayers = players.slice(0, 10);
    const additionalPlayer = currentPlayerIndex >= 10 ? players[currentPlayerIndex] : null;
    const currentPlayer = (name) => {
        if (name === playerName) {
            return true
        } else {
            return false
        }
    }

    return (
        <div className='gameover-message-container'>
            <div className='gameover-message-titles'>
                <span>PLAYER</span>
                <span>SCORE</span>
                <span>RANKING</span>
            </div>
            {topPlayers.map(player => (
                <div key={player.name} className={clsx('gameover-message-titles', {
                    'gameover-message-current-player': currentPlayer(player.name)
                })}>
                    <span>{player.name}</span>
                    <span>{player.score}</span>
                    <span>{player.ranking}</span>
                </div>
            ))}
            {additionalPlayer && (
                <div key={additionalPlayer.name} className='gameover-message gameover-message-current-player'>
                    <span>{additionalPlayer.name}</span>
                    <span>{additionalPlayer.score}</span>
                    <span>{additionalPlayer.ranking}</span>
                </div>
            )}
        </div>
    );
}

export { GameOver };