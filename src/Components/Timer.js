import React, {useEffect } from 'react';

export default function Timer(props) {

  // Counting down to zero
  useEffect(() => {
    let interval = null;

    // Either counter is greater zero or timer is active 
    if (props.seconds > 0 && props.timerActive) {
      interval = setInterval(() => {
        props.decreaseTimer()
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [props.seconds, props.timerActive]);


  return (
    <div>
      <h5>{props.seconds}s</h5>
    </div>
  );
}
