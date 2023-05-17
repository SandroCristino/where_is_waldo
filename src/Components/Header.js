import React from 'react';
import Timer from '../Components/Timer'

export default function Navbar(props) {

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid justify-between">
      <div>Where Is Waldo</div>
      <div className='shadow p-2 bg-info rounded'>{props.text}</div>
      <div>
        < Timer seconds={props.timer} decreaseTimer={props.decreaseTimer} timerActive={props.timerActive}/>
        <div>Score: {props.score}</div>
      </div>
      </div>
    </nav>
  );
}
