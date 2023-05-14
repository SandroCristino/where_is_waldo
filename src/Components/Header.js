import React, { useState } from 'react';

export default function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid justify-between">
      <div>Where Is Waldo</div>
      <div>{props.text}</div>
      <div>Score: {props.score}</div>
      </div>
    </nav>
  );
}
