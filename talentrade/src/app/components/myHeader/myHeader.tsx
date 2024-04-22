'use client'
import './myHeader.css';
import { LogIn, Register } from "../authComps/authComps";
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function MyHeader() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log('MyHeader ~ isLoggedIn:', isLoggedIn);

  const toggleSignUp = () => setShowSignUp(!showSignUp);
  const toggleLogIn = () => setShowLogIn(!showLogIn);
  const closeAuthForms = () => {
    setShowSignUp(false);
    setShowLogIn(false);
  };

  useEffect(() => {
    const handleClose = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof MouseEvent && (event.target as Element).classList.contains('authBckgrnd')) {
        closeAuthForms();
      }
    };

    document.addEventListener('click', handleClose);
    document.addEventListener('keydown', handleClose);

    return () => {
      document.removeEventListener('click', handleClose);
      document.removeEventListener('keydown', handleClose);
    };
  }, []);

  return (
    <>
      {showSignUp && <div className="authBckgrnd"><Register onClose={closeAuthForms} setIs={setIsLoggedIn} /></div>}
      {showLogIn && <div className="authBckgrnd"><LogIn onClose={closeAuthForms} setIs={setIsLoggedIn} /></div>}

      <header id="myHeader">
        <Link href={'/'} id="headerTitle">
          <h1>TALEN<span className="headerRed">TRADE</span></h1>
        </Link>
        <div id='headerNav'>
          <h3 className="headerH3" >ABOUT US</h3>
          {!isLoggedIn &&
            <>
              <h3 className="headerRed headerH3" onClick={toggleSignUp}>SIGN UP</h3>
              <h3 className="headerRed headerH3" onClick={toggleLogIn}>LOG IN</h3>
            </>
          }
          {isLoggedIn &&
            <Link href={'/662624f03119c7fe982964e6/profile'}>
              <img src="/picture7.png" alt="" id='headerImg' />
            </Link>
          }
        </div>
      </header>
    </>
  );
}