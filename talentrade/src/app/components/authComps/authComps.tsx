import { useState } from 'react';
import './authComps.css'

interface AuthComponentProps {
  onClose: () => void;
}

const RegisterState = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
};

export function Register({ onClose }: AuthComponentProps) {

  const [regState, setRegState] = useState(RegisterState);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRegState((regState) => ({
      ...regState,
      [name]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password, firstname, lastname } = regState;
    const user = { email, password, firstname, lastname };

    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      };
      const response = await fetch('http://localhost:3000/api/users/register', requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      onClose();
    } catch (error) {
      console.error('Error posting message:', error);
      // Handle error or provide feedback to the user
    }
  }

  return (
    <div className='authBckgrnd'>
      <div className='auth'>
        <h1 className='authTitle'>Welcome to TalenTrade!</h1>
        <form className='authForm' onSubmit={handleSubmit}>
          <input
            type="text"
            className='authInput'
            placeholder='firstname'
            name='firstname'
            value={regState.firstname}
            onChange={handleChange}
            required
          />
          <hr className='authHr' />
          <input
            type="text"
            className='authInput'
            placeholder='lastname'
            name='lastname'
            value={regState.lastname}
            onChange={handleChange}
            required
          />
          <hr className='authHr' />
          <input
            type="text"
            className='authInput'
            placeholder='email'
            name='email'
            value={regState.email}
            onChange={handleChange}
            required
          />
          <hr className='authHr' />
          <input
            type="password"
            className='authInput'
            placeholder='password'
            name='password'
            value={regState.password}
            onChange={handleChange}
            required
          />
          <hr className='authHr' />
          <div id='authSubmits'>
            <div>
              <button className='authButton' onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                const fileInput = document.getElementById('getFile');
                if (fileInput) {
                  fileInput.click();
                }
              }}>Upload your Pic</button>
              <input type='file' id="getFile" style={{ display: 'none' }}></input>
            </div>
            <button type='submit' className='authButton authSubmit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const LogInState = {
  email: '',
  password: '',
};

export function LogIn({ onClose }: AuthComponentProps) {

  const [logInState, setLogInState] = useState(LogInState);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLogInState((logInState) => ({
      ...logInState,
      [name]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();
    const { email, password } = logInState;
    const user = { email, password };

    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      };
      const response = await fetch('http://localhost:3000/api/users/login', requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      onClose();
    } catch (error) {
      console.error('Error posting message:', error);
      // Handle error or provide feedback to the user
    }
  }

  return (
    <div className='authBckgrnd'>
      <div className='auth'>
        <h1 className='authTitle'>Welcome back!</h1>
        <form className='authForm' onSubmit={handleSubmit}>
          <input
            type="text"
            className='authInput'
            placeholder='email'
            name='email'
            value={logInState.email}
            onChange={handleChange}
            required
          />
          <hr className='authHr' />
          <input
            type="password"
            className='authInput'
            placeholder='password'
            name='password'
            value={logInState.password}
            onChange={handleChange}
            required
          />
          <hr className='authHr' />
          <button type='submit' className='authButton authSubmit'>Submit</button>
        </form>
      </div>
    </div>
  );
}