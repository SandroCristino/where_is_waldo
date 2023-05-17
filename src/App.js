import React, {useState} from 'react';
import Header from './Components/Header'
import Footer from './Components/Footer'
import Gameboard from './Components/Gameboard';

function App() {
  const [textBox, setTextBox] = useState('Welcome To The Party')
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(30)
  const [timerActive, setTimerActive] = useState(false)


  const setText = (text) => {
    setTextBox(text)
  }

  const increaseScore = () => {
    setScore(score + 1)
  }

  const resetScore = () => {
    setScore(0)
  }

  const decreaseTimer = () => {
    setTimer(timer - 1)
  }

  const toggleTimer = () => {
    setTimerActive(prevTimerActive => !prevTimerActive);
  };

  const resetTimer = () => {
    setTimer(30)
  }

  return (
    <div className="App">
      <Header text={textBox} score={score} timer={timer} decreaseTimer={decreaseTimer} timerActive={timerActive}/>
      <Gameboard 
      setText={setText} 
      increaseScore={increaseScore} 
      score={score}
      resetScore={resetScore} 
      timer={timer} 
      toggleTimer={toggleTimer}
      resetTimer={resetTimer}
      /> 
      <Footer />
    </div>
  );
}

export default App;
