import React from 'react';
import { QuizContext } from '../QuizContext';
import { Header } from '../Header';
import { StartButton } from '../StartButton';
import { Question } from '../Question';
import { OptionsList } from '../OptionsList';
import { Options } from '../Options';
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
          <StartButton/>
        </>
      )}
      
      {gameStarted && (
        <>
          <Question/>

          <OptionsList>
            {optionsArraySorted.map(option => (
              <Options 
                key={option}
                text={option}
              />
            ))}
          </OptionsList>
        </>
      )}

      {gameOver && (
        <GameOver />
      )}
    </>
  );
}

export { AppUI };