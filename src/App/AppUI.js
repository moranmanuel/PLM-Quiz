import React from 'react';
import { QuizContext } from '../QuizContext';
import { Header } from '../Header';
import { StartButton } from '../StartButton';
import { Question } from '../Question';
import { OptionsList } from '../OptionsList';
import { Options } from '../Options';

function AppUI() {
  const {
    gameStarted,
    options,
    optionsArray
  } = React.useContext(QuizContext)

  return (
    <>
      {!gameStarted && (
        <>
          <Header />
          <StartButton/>
        </>
      )}
      {gameStarted && (
        <>
          <Question/>

          <OptionsList>
            {options.map(option => (
              <Options 
                key={option}
                text={option}
              />
            ))}
          </OptionsList>
        </>
      )}
    </>
  );
}

export { AppUI };