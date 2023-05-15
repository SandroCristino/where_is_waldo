import React, {useState} from 'react';
import Header from './Components/Header'
import Footer from './Components/Footer'
import Gameboard from './Components/Gameboard';

function App() {
  const [textBox, setTextBox] = useState('Welcome To The Party')
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(30)

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



  return (
    <div className="App">
      <Header text={textBox} score={score} timer={timer} decreaseTimer={decreaseTimer}/>
      <Gameboard 
      setText={setText} increaseScore={increaseScore} resetScore={resetScore} timer={timer}/> 
      <Footer />
    </div>
  );
}

export default App;
