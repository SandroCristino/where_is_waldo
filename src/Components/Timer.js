import React, {useEffect } from 'react';

export default function MyComponent(props) {

  useEffect(() => {
    let interval = null;

    if (props.seconds > 0) {
      interval = setInterval(() => {
        props.decreaseTimer()
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [props.seconds]);


  return (
    <div>
      <h5>{props.seconds}s</h5>
    </div>
  );
}
