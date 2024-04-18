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
          <input type="text" className='authInput' />
          <input type="text" className='authInput' />
          <input type="text" className='authInput' />
          <input type="text" className='authInput' />
          <button type='submit' className='authButton'>enter</button>
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
          <input type="text" className='authInput' />
          <input type="text" className='authInput' />
          <button type='submit' className='authButton'>enter</button>
        </form>
      </div>
    </div>
  );
}