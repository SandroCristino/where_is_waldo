import React, {useState} from 'react'


export default function Character() {

    // eslint-disable-next-line no-unused-vars
    function handleClick(event) {
        event.target.classList.add('glow')
    }

    return (
        <div>
            <div id='characterImg' onClick={handleClick}></div>
        </div>
    )
}
