import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import Character from './Character'
import EndScene from './EndScene'
import '../Styles/Gameboard.css'


export default function Gameboard(props) {
    const [charList, setCharList] = useState([])
    const [mapList, setMapList] = useState([])
    const [buttonVisibility, setButtonVisibility] = useState(true)
    const [characterAlive, setCharacterAlive] = useState([])
    const [level, setLevel] = useState(1)

 
    useEffect(() => {
        buildCharList()
        buildMapList()
    }, [])

    useEffect(() => {
        console.log('Decrease')
    }, [props.timer])

    function handleEndRound() {
        if (characterAlive.length === charList.length) {
            props.setText('You Found All')
            props.increaseScore()
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
            setCharacterAlive(newCharacterAlive)
            handleEndRound();
        }
    
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
