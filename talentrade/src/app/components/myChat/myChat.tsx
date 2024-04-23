/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import './myChat.css'
import { Feedback } from '../feedback/feedback';

export default function MyChat({ id }: { id: string }) {

  const [messages, setMessages] = useState<any[]>([]);
  const [completed, setCompleted] = useState<any[]>([]);
  const [cutOff, setCutOff] = useState(3);

  async function fetchMessages() {
    try {
      const res = await fetch('http://localhost:3000/api/messages');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setMessages(data.filter((msg: any) => msg.receiverId === id && msg.state === 'pending'));
      setCompleted(data.filter((msg: any) => msg.senderId === id && msg.state === 'accepted'));
    } catch (error) {
      console.error('Failed to fetch Messages:', error);
    }
  }

  async function fetchPictures(id: string) {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}/picture`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return data;

    } catch (error) {
      console.error('Failed to fetch Messages:', error);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  async function handleAccept(messageId: any) {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(`http://localhost:3000/api/messages/${messageId}`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error updating service:', error);
    }
    fetchMessages();
  }

  async function handleReject(messageId: any) {
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
    fetchMessages();
  }

  return (
    <div className='profileCopmsContainer'>
      {completed.map((msg) => {
        return <Feedback pic={'/default.png'} helperId={msg.senderId} messageId={msg._id} />
      })}
      <ul id='myChartUl'>
        {messages.slice(0, cutOff).map(async (msg, index) => {
          const pic = await fetchPictures(msg.senderId)
          return (
            <>
              <li className='myChartIl'>
                <img src={pic} alt="small profile" />
                <h4>{msg.request}</h4>
                <FaCheck id='myChartCheck' onClick={() => handleAccept(msg._id)} />
                <ImCross id='myChartX' onClick={() => handleReject(msg._id)} />
              </li>
              <hr className='myChartHr' />
            </>
          );
        })}
      </ul>
      <button className='profileCopmsButton' onClick={() => setCutOff(cutOff + 2)}>Load More</button>
    </div>
  );
}