import React from 'react'
import { FaGithub } from 'react-icons/fa/index.js'
import '../Styles/Footer.css'

export default function Footer() {
  return (
    <div>
        <footer className='d-flex text-center bg-dark text-light pb-2 pt-1 justify-content-center align-items-center'>
            <p className='mx-3 footerText'>SandyWezzy on GitHub</p>
            <a className='footerIcon' href="https://github.com/SandyWezzy"  target="_blank" rel="noreferrer"><FaGithub /></a>
        </footer>
    </div>
  
  )
}