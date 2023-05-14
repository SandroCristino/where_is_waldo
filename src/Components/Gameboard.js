import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import Character from './Character'
import EndScene from './EndScene'
import '../Styles/Gameboard.css'


export default function Gameboard(props) {
    const [charList, setCharList] = useState([])
    const [mapList, setMapList] = useState([])
    const [buttonVisibility, setButtonVisibility] = useState(true)
    const [characterAlive, setCharacterAlive] = useState(3)
 
    useEffect(() => {
        buildCharList()
        buildMapList()
    }, [])

    function handleEndRound() {
        if (characterAlive === 0) <EndScene />
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
        const map = mapList.shift()
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
                <div
                  style={{
                    position: 'relative',
                    left: `${xPos}px`,
                    top: `${yPos - (index * charHeight)}px`,
                    width: '70px',
                    height: '70px',
                    backgroundImage: `url(${char})`,
                    backgroundColor: 'none',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                  }}
                  key = {index}
                  onClick = {(handleCharFound)}
                ><Character/></div>
              ];
        })

        ReactDOM.render(charElements, gameboard)
        props.setText('Find Waldo, Lady Waldo and Wizzard')
    }

    function handleCharFound() {
        handleEndRound();
    }

    function handleButton() {
        handleSetupGameboard()
        setButtonVisibility(false)
    }

        return (
        <div  className='gameBoardDiv'>
            <div id='gameboard'>
            </div>
            {buttonVisibility && (
                 <button onClick={handleButton} className='btn btn-info position-absolute'>Start Game</button>
            )}
           
        </div>
        )
}
