'use client'
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import './results.css'
import { FaSortAmountDown } from "react-icons/fa";
import MyFooter from "../components/myFooter/myFooter";
import UserItem from "../components/userItems/userItem";
import React, { useEffect, useState } from 'react';

type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  services: string[];
  credit: number;
  peopleHelped: number;
  rating: number;
  profilePicture: string;
};

export default function Page() {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('http://localhost:3000/api/users');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <>
      <div className="resultsSearch">
        <input type="text" placeholder="Search..." className="resultsInput" />
        <Link href="/results">
          <IoSearch className="resultsIcon" />
        </Link>
      </div>
      <div id="resultTopTxt">
        <h1>TOP RESULTS</h1>
        <h2>SORT <FaSortAmountDown /></h2>
      </div>
      <div id="resultsUsers">
        {
          users.map((user: User) => {
            return <UserItem
              key={user.id}
              firstname={user.firstname}
              lastname={user.lastname}
              service={user.services ? user.services[0] : undefined}
              rating={user.rating}
              profile={user.profilePicture}
              helped={user.peopleHelped}
            />
          })}
      </div>
      <button id="resultsButton">Load More</button>
      <MyFooter />
    </>
  );
}