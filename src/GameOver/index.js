import React from 'react';
import { QuizContext } from '../QuizContext';
import './GameOver.css'

function GameOver() {
    const {
        players,
        playerName
    } = React.useContext(QuizContext)

    let elements = []
    const currentPlayerIndex = players.findIndex(player => player.name === playerName)

    const renderItems = () => {
        console.log(players[0]);
        for (let i = 0; i < 10; i++) {
            elements.push(<h1 key={players[i].name} className='gameover-message'>{players[i].name} | {players[i].score}</h1>)
        }
        
        return elements
    }

    if (players.length > 10 && currentPlayerIndex > 10) {
        console.log(elements);
        return (
            <div className='gameover-message-container'>
                {renderItems()}
                <h1 key={players[currentPlayerIndex].name} className='gameover-message'>{players[currentPlayerIndex].name} | {players[currentPlayerIndex].score}</h1>
            </div>
        ); 
    } else  if (players.length > 10) {
        for (let i = 0; i < 10; i++) {
            return (
                <div className='gameover-message-container'>
                    {renderItems()}
                </div>
            );         
        }
    } else {
        return (
            <div className='gameover-message-container'>
                {players.map((player) => (
                    <h1 key={player.name} className='gameover-message'>{player.name} | {player.score}</h1>
                ))}
            </div>
        ); 
    }
}

export { GameOver };