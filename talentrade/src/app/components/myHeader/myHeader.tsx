'use client'
import './myHeader.css';
import { LogIn, Register } from "../authComps/authComps";
import { useEffect, useState } from "react";

export default function MyHeader() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

  const toggleSignUp = () => setShowSignUp(!showSignUp);
  const toggleLogIn = () => setShowLogIn(!showLogIn);
  const closeAuthForms = () => {
    setShowSignUp(false);
    setShowLogIn(false);
  };

  useEffect(() => {
    const handleClose = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key === 'Enter') {
        closeAuthForms();
      } else if (event instanceof MouseEvent && (event.target as Element).classList.contains('authBckgrnd')) {
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
      {showSignUp && <div className="authBckgrnd"><Register onClose={closeAuthForms} /></div>}
      {showLogIn && <div className="authBckgrnd"><LogIn onClose={closeAuthForms} /></div>}

      <header id="myHeader">
        <h1 id="headerTitle">TALEN<span className="headerRed">TRADE</span></h1>
        <div id='headerNav'>
          <h3 className="headerH3" >ABOUT US</h3>
          <h3 className="headerRed headerH3" onClick={toggleSignUp}>SIGN UP</h3>
          <h3 className="headerRed headerH3" onClick={toggleLogIn}>LOG IN</h3>
        </div>
      </header>
    </>
  );
}