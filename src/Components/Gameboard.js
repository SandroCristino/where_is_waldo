import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import Character from './Character'
import EndScene from './EndScene'
import '../Styles/Gameboard.css'


export default function Gameboard(props) {
    const [charList, setCharList] = useState([])
    const [mapList, setMapList] = useState([])
    const [characterAlive, setCharacterAlive] = useState([])
    const [roundActive, setRoundActive] = useState(false)

 
    useEffect(() => {
        buildCharList()
        buildMapList()
        console.log('Reload useEffect()')
    }, [])

    useEffect(() => {
        if (props.timer === 0 && roundActive) handleEndScene()
    }, [props.timer])

    function handleEndScene() {
        const gameboard = document.getElementById('gameboard')
        gameboard.style.backgroundImage = ('')
        const currentScore = props.score
        ReactDOM.render( 
            <EndScene 
            handleButton={handleButton}
            score={currentScore}
            />, gameboard)
    }

    const resetCharacterAlive = () => {
        const newArray = []
        setCharacterAlive(newArray)
    }

    function handleEndRound() {
        if (characterAlive.length === charList.length) {
          
          // Update text and score
          props.setText('You Found All')
          props.increaseScore()

          //Update round/ reset data
            setRoundActive(false)
            props.toggleTimer()

          // Display select buttons
          const gameboard = document.getElementById('gameboard')
          const buttonGroup = () => (
                <>
                    <button onClick={handleButton} className='startGameBtn btn btn-info position-absolute'>Start Game</button>
                    <button onClick={handleEndScene} className='leaveGameBtn btn btn-danger position-absolute'>Leave Game</button>
                </>
          )
          ReactDOM.render(buttonGroup(), gameboard)
        }
      }
      

    function buildMapList() {
        function importAll(r) {
            return r.keys().map(r);
        }
        const images = importAll(require.context('../Assets/', true, /\.jpg/)) 
        setMapList(images);
    }

    function buildCharList() {
        function importAll(r) {
            return r.keys().map(r);
        }
        const images = importAll(require.context('../Assets/', true, /\.png/))
        setCharList(images);
    }

    function handleSetupGameboard() {
        const map = mapList.slice().sort(() => Math.random() - 0.5)[0]
        const gameboard = document.getElementById('gameboard')
        gameboard.style.backgroundImage = `url(${map})`


        const gameboardRect = gameboard.getBoundingClientRect()
        const charWidth = 70
        const charHeight = 70
        const maxX = gameboardRect.width - charWidth 
        const maxY = gameboardRect.height - charHeight

        const newCharList = charList.slice().sort(() => Math.random() - 0.5);
        const charElements = newCharList.map((char, index) => {
            const xPos = Math.floor(Math.random() * (maxX  + 1))   
            const yPos = Math.floor(Math.random() * (maxY  + 1))
            return [
                <Character
                setText={props.setText}
                src={char}
                  style={{
                    left: `${xPos}px`,
                    top: `${yPos - (index * charHeight)}px`,
                  }}
                  key = {index}
                  onClick={handleCharFound}
                ></Character>
            ];
        })

        ReactDOM.render(charElements, gameboard)

        props.setText('Find Waldo, Lady Waldo and Wizzard')
    }

    function handleCharFound(event) {
        if (!characterAlive.includes(event.target.src)) {
            const newCharacterAlive = characterAlive
            newCharacterAlive.push(event.target.src)
            setCharacterAlive(newCharacterAlive);
        }
        // if (!characterAlive.includes(event.target.src)) {
        //     const newCharacterAlive = [...characterAlive, event.target.src];
        //     setCharacterAlive(newCharacterAlive);
        //     console.log(newCharacterAlive)
        // }
        handleEndRound()
        console.log(`Char:${charList.length}, Alive:${characterAlive.length}`)    
    }

    function handleButton() {
        resetCharacterAlive()
        setRoundActive(true)
        handleSetupGameboard()
        props.toggleTimer()
    }

        return (
        <div  className='gameBoardDiv'>
            <div id='gameboard'>
                <button onClick={handleButton} className='startGameBtn btn btn-info position-absolute'>Start Game</button>
           </div>
        </div>
        )
}
