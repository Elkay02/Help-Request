/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import './myChat.css'

export default function MyChat({ id }: { id: string }) {

  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch('http://localhost:3000/api/messages');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log('fetchMessages ~ data:', data);
        setMessages(data.filter((msg: any) => msg.receiverId));
      } catch (error) {
        console.error('Failed to fetch Messages:', error);
      }
    }

    fetchMessages();
  }, []);

  return (
    <div className='profileCopmsContainer'>
      <ul id='myChartUl'>
        {messages.map((msg, index) => {
          return (
            <>
              <li className='myChartIl'>
                <img src="/picture9.png" alt="small profile" />
                <h4>{msg.request}h</h4>
              </li>
              <hr className='myChartHr' />
            </>
          );
        })}
      </ul>
      <button className='profileCopmsButton'>Load More</button>
    </div>
  );
}