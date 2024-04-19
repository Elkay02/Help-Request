/* eslint-disable @next/next/no-img-element */
'use client'
import './profile.css'
import { useEffect, useState } from "react";
import MyChat from "../../components/myChat/myChat";
import MyServices from "../../components/myServices/myServices";
import UserChat from "../../components/userChat/userChat";
import UserServices from "../../components/userServices/userServices";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [isMyProfile, setIsMyProfile] = useState(true)
  const [showChat, setShowChat] = useState(true)
  const [user, setUser] = useState({
    firstname: "default",
    lastname: "default",
    profilePicture: "/default.png",
    services: [],
    credit: 0,
    peopleHelped: 0,
    rating: 0,
  })

  useEffect(() => {
    async function fetchUser(id: string) {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setUser(data[0]);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    }
    fetchUser(id);
  }, []);

  console.log('Page ~ user:', user);


  return (
    <div id="profile">
      <div id="profileLeft">

        <h1>{user.firstname + " " + user.lastname}</h1>

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
        <img src={user.profilePicture} alt="User Profile" onClick={() => { setIsMyProfile(!isMyProfile) }} id='profileImg' />
        <p id="profileParag">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem neque voluptatem iusto vero modi qui ullam voluptate odit, enim eveniet delectus incidunt, eum autem eaque temporibus adipisci velit ipsam. Praesentium?</p>
        <div id='profileStats'>
          <h2>Statistics</h2>
          {isMyProfile &&
            <h5>Credits: <span>{user.credit}</span></h5>
          }
          <h5>Rating: <span>{user.rating}</span></h5>
          <h5>People Helped: <span>{user.peopleHelped}</span></h5>
          {!isMyProfile &&
            <h5>Num of Services Offered: <span>{user.services.length}</span></h5>
          }

        </div>
      </div>
    </div>
  );
}