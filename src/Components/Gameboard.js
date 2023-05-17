import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import Character from './Character'
import EndScene from './EndScene'
import '../Styles/Gameboard.css'


export default function Gameboard(props) {
    const [charImages, setCharImages] = useState([])
    const [charList, setCharList] = useState([])
    const [mapList, setMapList] = useState([])
    const [characterAlive, setCharacterAlive] = useState([])
    const [roundActive, setRoundActive] = useState(false)
    const [showEndScene, setShowEndScene] = useState(false);
    const [showEndButtonScene, setShowEndButtonScene] = useState(false)
    const [score, setScore] = useState(0)

 
    useEffect(() => {
        buildCharImages()
        buildMapList()
    }, [])

    useEffect(() => {
        setScore(props.score)
        props.resetScore()
    }, [showEndScene])

    useEffect(() => {
        setCharacterAlive([])
    }, [showEndButtonScene])


    useEffect(() => {
        if (props.timer === 0 && roundActive) {
            handleEndScene()
            setRoundActive(false)
        }
    }, [props.timer])

    function handleEndScene() {
        setShowEndScene(true)
        const gameboard = document.getElementById('gameboard')
        gameboard.style.backgroundImage = ('')
    }

    const resetCharacterAlive = () => {
        const newArray = []
        setCharacterAlive(newArray)
    }

    function handleEndRound() {
        if (characterAlive.length === charImages.length) {
          
          // Update text and score
          props.setText('You Found All')
            props.increaseScore()
          //Update round/ reset data
            setRoundActive(false)
            props.toggleTimer()
            setShowEndButtonScene(true)
        }
      }
      

    function buildMapList() {
        function importAll(r) {
            return r.keys().map(r);
        }
        const images = importAll(require.context('../Assets/', true, /\.jpg/)) 
        setMapList(images);
    }

    function buildCharImages() {
        function importAll(r) {
            return r.keys().map(r);
        }
        const images = importAll(require.context('../Assets/', true, /\.png/))
        setCharImages(images);
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

        const newCharList = charImages.slice().sort(() => Math.random() - 0.5);
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
        setCharList(charElements)

        props.setText('Find Waldo, Lady Waldo and Wizzard')
    }

    function handleCharFound(event) {
        if (!characterAlive.includes(event.target.src)) {
            const newCharacterAlive = characterAlive
            newCharacterAlive.push(event.target.src)
            setCharacterAlive(newCharacterAlive);
        }
        handleEndRound()
        console.log(`Char:${charImages.length}, Alive:${characterAlive.length}`)    
    }

    function handleButton() {
        resetCharacterAlive()
        setRoundActive(true)
        handleSetupGameboard()
        props.resetTimer()
        props.toggleTimer()
        setShowEndScene(false)
        setShowEndButtonScene(false)
        props.resetScore()
    }

    function handleNextGame() {
        setRoundActive(true)
        handleSetupGameboard()
        props.toggleTimer()
        setShowEndScene(false)
        setShowEndButtonScene(false)
    }

        return (
        <div  className='gameBoardDiv'>
            <div id='gameboard'>
                {!roundActive && (
                    <button onClick={handleButton} className='startGameBtn btn btn-info position-absolute'>Start Game</button>
                )}
                {roundActive &&(charList
                )}
           </div>
      {showEndScene &&
        ReactDOM.createPortal(
            <EndScene handleButton={handleButton} score={score} />,
            document.body
      )}
      {showEndButtonScene &&
        ReactDOM.createPortal(
            <>
            <button onClick={handleNextGame} className='startGameBtn btn btn-info position-absolute'>Next Game</button>
            <button onClick={handleEndScene} className='leaveGameBtn btn btn-danger position-absolute'>Leave Game</button>
            </>, 
            document.body
        )
      }
        </div>
        )
}
