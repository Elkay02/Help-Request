import './authComps.css'

interface AuthComponentProps {
  onClose: () => void;  // Define a function type for onClose
}

export function Register({ onClose }: AuthComponentProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();  // Prevent the default form submission behavior
    // Here you can add your form submission logic, for example, an API call
    // await submitForm(data);

    onClose();  // Close the overlay after form submission
  };

  return (
    <div className='authBckgrnd'>
      <div className='auth'>
        <h1 className='authTitle'>Welcome to TalenTrade!</h1>
        <form className='authForm' onSubmit={handleSubmit}>
          <input type="text" className='authInput' placeholder='firstname' />
          <hr className='authHr' />
          <input type="text" className='authInput' placeholder='lastname' />
          <hr className='authHr' />
          <input type="text" className='authInput' placeholder='email' />
          <hr className='authHr' />
          <input type="text" className='authInput' placeholder='password' />
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
              }}>Your text here</button>
              <input type='file' id="getFile" style={{ display: 'none' }}></input>
            </div>
            <button type='submit' className='authButton authSubmit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function LogIn({ onClose }: AuthComponentProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();  // Prevent the default form submission behavior
    // Here you can add your form submission logic, for example, an API call
    // await submitForm(data);

    onClose();  // Close the overlay after form submission
  };

  return (
    <div className='authBckgrnd'>
      <div className='auth'>
        <h1 className='authTitle'>Welcome back!</h1>
        <form className='authForm' onSubmit={handleSubmit}>
          <input type="text" className='authInput' placeholder='email' />
          <hr className='authHr' />
          <input type="text" className='authInput' placeholder='password' />
          <hr className='authHr' />
          <button type='submit' className='authButton authSubmit'>Submit</button>
        </form>
      </div>
    </div>
  );
}