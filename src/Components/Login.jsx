import React from 'react'
import centerImage from '../assets/Group 82 1.png'
import  '../styles/Login.css'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

export default function Login() {
  const [activeBullet, setActiveBullet] = useState(1)

  const bulletTexts = {
    1: {
      boldText: "World's Safest And Largest Digital Notebook",
      smallText: "Notely is the world's safest, Largest and intelligent digital notebook. Join over 10M+ users already using Notely."
    },
    2: {
      boldText: "Secure Your Notes with Advanced Encryption",
      smallText: "Your notes are protected with industry-leading encryption, ensuring complete privacy and security."
    },
    3: {
      boldText: "Access Your Notes Anytime, Anywhere",
      smallText: "Sync your notes across all your devices seamlessly, so you can pick up where you left off."
    }
  }

  useEffect(()=> {
    const interval = setInterval(()=> {
      setActiveBullet((prev) => (prev % Object.keys(bulletTexts).length) + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [activeBullet])

  return (
    <div className='wrapper'>
        <div className="app-title">Notely</div>
        
        <div className="texts">
        <div className="center-image"><img className='img' src={centerImage} alt="" /></div>
          <div className="bold-text">{bulletTexts[activeBullet].boldText}</div>
          <div className="text">{bulletTexts[activeBullet].smallText}</div>
          <div className='bullet-point-wrapper'>
            {
              Object.keys(bulletTexts).map((key) => (
                <div
                  key={key}
                  className={`bullet ${activeBullet === Number(key) ? 'active' : ''}`}
                  onClick={() => setActiveBullet(Number(key))}
                ></div>
              ))
            }
        </div>
        </div>
        <Link className='link' to="signup"> <button className="get-started">GET STARTED</button></Link>
        <Link className="sign-in">Already have na account?</Link>
    </div>
  )
}
