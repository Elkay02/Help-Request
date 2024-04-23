import { useState } from 'react';
import './feedback.css'

export function Feedback({ pic, helperId, messageId }: { pic: string, helperId: string, messageId: string }) {

  const [service, setService] = useState('');

  const handleChange = (e: any) => {
    setService(e.target.value);
  };

  async function handleSubmit(e: any, messageId: any) {
    e.preventDefault();
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(`http://localhost:3000/api/messages/${messageId}`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error updating service:', error);
    }
  }


  return (
    <div className='newServBckgrnd'>
      <div className='newServ'>
        <div id='feedbackHead'>
          <h1 className='newServTitle'>Give Feedback to your helper</h1>
          <img src={pic} alt="" id='feedbackImg' />
        </div>
        <form className='newServForm' onSubmit={(e) => handleSubmit(e, messageId)}>
          <h3 className='feedbackH3'>Rating:</h3>
          <input type="range" min="0" max="10" step="1" data-tick-step="1" className="slider" id="myRange" />
          <div className="ticks">
            <span className="tick">0</span>
            <span className="tick">1</span>
            <span className="tick">2</span>
            <span className="tick">3</span>
            <span className="tick">4</span>
            <span className="tick">5</span>
          </div>
          <hr className='newServHr' />
          <h3 className='feedbackH3'>Length of Service:</h3>
          <div>
            <input
              type="number"
              id="hours"
              className='feedbackInput'
              placeholder='0'
              min="0"
              name='hours'
              // value={hours}
              onChange={handleChange}
              onKeyDown={(e) => e.preventDefault()}
              required
            />
            <label className='feedbackLabel' htmlFor="hours">Hours</label>
            <input
              type="number"
              id="minutes"
              className='feedbackInput'
              placeholder='0'
              name='minutes'
              // value={minutes}
              onChange={handleChange}
              min="0"
              max="45"
              step="15"
              onKeyDown={(e) => e.preventDefault()}
              required
            />
            <label className='feedbackLabel' htmlFor="minutes">Minutes</label>
          </div>
          <hr className='newServHr' />
          <button type='submit' className='newServButton newServSubmit'>Submit</button>
        </form>
      </div>
    </div>
  );
}