import { useState } from 'react';
import './newService.css'

export function NewService() {

  // const [logInState, setLogInState] = useState(LogInState);

  // const handleChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setLogInState((logInState) => ({
  //     ...logInState,
  //     [name]: value,
  //   }));
  // };

  // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

  //   e.preventDefault();
  //   const { email, password } = logInState;
  //   const user = { email, password };

  //   try {
  //     const requestOptions = {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(user)
  //     };
  //     const response = await fetch('http://localhost:3000/api/users/login', requestOptions);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await response.json();
  //     console.log('handleSubmit ~ user:', data);
  //   } catch (error) {
  //     console.error('Error posting message:', error);
  //     // Handle error or provide feedback to the user
  //   }
  // }

  // return (
  //   <div className='authBckgrnd'>
  //     <div className='auth'>
  //       <h1 className='authTitle'>Welcome back!</h1>
  //       <form className='authForm' onSubmit={handleSubmit}>
  //         <input
  //           type="text"
  //           className='authInput'
  //           placeholder='email'
  //           name='email'
  //           value={logInState.email}
  //           onChange={handleChange}
  //           required
  //         />
  //         <hr className='authHr' />
  //         <input
  //           type="password"
  //           className='authInput'
  //           placeholder='password'
  //           name='password'
  //           value={logInState.password}
  //           onChange={handleChange}
  //           required
  //         />
  //         <hr className='authHr' />
  //         <button type='submit' className='authButton authSubmit'>Submit</button>
  //       </form>
  //     </div>
  //   </div>
  // );
}