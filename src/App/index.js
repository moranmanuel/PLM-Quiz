import React from 'react';
import { AppUI } from './AppUI';
import { QuizProvider } from '../QuizContext';

function App() {  
  return (
    <QuizProvider>
      <AppUI />
    </QuizProvider>
  )
}

export default App;