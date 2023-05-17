import React, {useState} from 'react'
import '../Styles/Character.css'


export default function Character(props) {
    const [clicked, setClicked] = useState(false);

    function handleClick(event) {
        // If character isn't clicked 
        if (!clicked) {
            event.target.classList.add('glow')
            setClicked(true)
            const src = event.target.src;
            switch (true){
                case src.includes('char1'):
                    props.setText('There Is Lady Waldo')
                    break
                case src.includes('char2'):
                    props.setText('That Is Waldo')
                    break
                case src.includes('char3'):
                    props.setText('You found The Wizzard')
                    break
                default:
                    console.log('Default has been activated')
            }
        }
    }

    function handleButtonClick(event) {
        handleClick(event)
        props.onClick(event)
    }

    return (
        <div className='imgContainer'>
            <img src={props.src} style={{
                left: props.style.left,
                top: props.style.top
            }} 
            alt='This should be something different' 
            id='characterImg' 
            onClick={handleButtonClick}></img>
        </div>
    )
}
