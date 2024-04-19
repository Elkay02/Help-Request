import { useState } from 'react';
import './userChat.css'

export default function UserChat({ id }: { id: string }) {

  const [request, setRequest] = useState('');
  const receiverId = '66214dd28aa8898405626c1a'
  const senderId = id

  async function handleSend(e: any) {

    const user = { request, senderId, receiverId };

    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      };
      const response = await fetch('http://localhost:3000/api/messages', requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('handleSubmit ~ user:', data);
    } catch (error) {
      console.error('Error posting message:', error);
      // Handle error or provide feedback to the user
    }
    setRequest('')
  }

  return (
    <div className='profileCopmsContainer'>
      <h1>Describe your inquiry:</h1>
      <textarea name="Request" id="userChatTextArea" value={request} cols={30} rows={10} placeholder='Type Here...' onChange={(e) => setRequest(e.target.value)}></textarea>
      <button className='profileCopmsButton' onClick={handleSend}>Send</button>
    </div>
  );
}