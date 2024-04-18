/* eslint-disable @next/next/no-img-element */
'use client'
import './profile.css'
import { useState } from "react";
import MyChat from "../components/myChat/myChat";
import MyServices from "../components/myServices/myServices";
import UserChat from "../components/userChat/userChat";
import UserServices from "../components/userServices/userServices";

export default function Page({ params }: { params: { id: string } }) {
  const [isMyProfile, setIsMyProfile] = useState(true)
  const [showChat, setShowChat] = useState(true)
  return (
    <div id="profile">
      <div id="profileLeft">

        <h1>NAME NAME</h1>

        {isMyProfile &&
          <>
            <div className='profileNav'>
              <h2 className={showChat ? 'profileH2 profileShow' : 'profileH2 profileHide'} onClick={() => { setShowChat(true) }}>Chat History</h2>
              <h2 className={!showChat ? 'profileH2 profileShow' : 'profileH2 profileHide'} onClick={() => { setShowChat(false) }}>My Services</h2>
            </div>
            {showChat && <MyChat />}
            {!showChat && <MyServices />}
          </>
        }
        {!isMyProfile &&
          <>
            <div className='profileNav'>
              <h2 className={showChat ? 'profileH2 profileShow' : 'profileH2 profileHide'} onClick={() => { setShowChat(true) }}>Chat</h2>
              <h2 className={!showChat ? 'profileH2 profileShow' : 'profileH2 profileHide'} onClick={() => { setShowChat(false) }}>Services</h2>
            </div>
            {showChat && <UserChat />}
            {!showChat && <UserServices />}
          </>
        }
      </div>
      <div id="profileRight">
        <img src="/picture7.png" alt="User Profile" onClick={() => { setIsMyProfile(!isMyProfile) }} id='profileImg' />
        <p id="profileParag">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem neque voluptatem iusto vero modi qui ullam voluptate odit, enim eveniet delectus incidunt, eum autem eaque temporibus adipisci velit ipsam. Praesentium?</p>
        <div id='profileStats'>
          <h2>Statistics</h2>
          {isMyProfile &&
            <h5>Credits: <span>5</span></h5>
          }
          <h5>Rating: <span>4.5</span></h5>
          <h5>People Helped: <span>10</span></h5>
          {!isMyProfile &&
            <h5>Num of Services Offered: <span>3</span></h5>
          }

        </div>
      </div>
    </div>
  );
}