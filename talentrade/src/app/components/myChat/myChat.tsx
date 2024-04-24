/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import './myChat.css'
import { Feedback } from '../feedback/feedback';
import React from 'react';

export default function MyChat({ id }: { id: string }) {

  const [messages, setMessages] = useState<any[]>([]);
  const [completed, setCompleted] = useState<any[]>([]);
  const [cutOff, setCutOff] = useState(3);
  const [pictures, setPictures] = useState<string[]>([]);


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

  useEffect(() => {
    const fetchPicturesAsync = async () => {
      const pics = await Promise.all(messages.slice(0, cutOff).map(msg => fetchPictures(msg.senderId)));
      setPictures(pics);
    };

    fetchPicturesAsync();
  }, [messages, cutOff]);

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
      <ul id='myChatUl'>
        {messages.slice(0, cutOff).map((msg, index) => (
          <React.Fragment key={msg._id}>
            <li className='myChatIl'>
              <img src={pictures[index] || '/default.png'} alt="small profile" />
              <h4>{msg.request}</h4>
              <FaCheck id='myChatCheck' onClick={() => handleAccept(msg._id)} />
              <ImCross id='myChatX' onClick={() => handleReject(msg._id)} />
            </li>
            <hr className='myChatHr' />
          </React.Fragment>
        )
        )}
      </ul>
      <button className='profileCopmsButton' onClick={() => setCutOff(cutOff + 2)}>Load More</button>
    </div>
  );
}