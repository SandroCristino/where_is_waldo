import React, {useState} from 'react';
import Header from './Components/Header'
import Footer from './Components/Footer'
import Gameboard from './Components/Gameboard';

function App() {
  const [textBox, setTextBox] = useState('Welcome To The Party')

  const setText = (text) => {
    setTextBox(text)
  }

  return (
    <div className="App">
      <Header text={textBox}/>
      <Gameboard 
      setText={setText}/> 
      <Footer />
    </div>
  );
}

export default App;
