import React from 'react';
import { QuizContext } from '../QuizContext';
import { Header } from '../Header';
import { InputPlayerName } from '../InputPlayerName';
import { StartButton } from '../StartButton';
import { Question } from '../Question';
import { OptionsList } from '../OptionsList';
import { Options } from '../Options';
import { Timer } from '../Timer';
import { Message } from '../Message';
import { GameOver } from '../GameOver';

function AppUI() {
  const {
    gameStarted,
    gameOver,
    optionsArraySorted
  } = React.useContext(QuizContext)

  return (
    <>
      {(!gameStarted && !gameOver) && (
        <>
          <Header />
          <InputPlayerName />
          <StartButton />
        </>
      )}
      
      {gameStarted && (
        <>
          <Question />

          <OptionsList>
            {optionsArraySorted.map(option => (
              <Options 
                key={option}
                text={option}
              />
            ))}
          </OptionsList>

          <Timer />

          <Message />
        </>
      )}

      {gameOver && (
        <GameOver />
      )}
    </>
  );
}

export { AppUI };