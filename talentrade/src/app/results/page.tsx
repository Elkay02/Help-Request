'use client'
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import './results.css'
import { FaSortAmountDown } from "react-icons/fa";
import MyFooter from "../components/myFooter/myFooter";
import UserItem from "../components/userItems/userItem";
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation'
import { similarity } from "../utils/search";

type User = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  services: string[];
  credit: number;
  peopleHelped: number;
  rating: number;
  profilePicture: string;
};

type Service = {
  _id: string;
  service: string;
  users: string[];
}


export default function Page() {

  const [newSearch, setNewSearch] = useState('');

  const [userIds, setUserIds] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const searchParams = useSearchParams()
  const search = searchParams ? searchParams.get('q') : '';

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('http://localhost:3000/api/services');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const filteredData = data.filter((service: Service) => similarity(search, service.service) > 0.4)
        setServices(filteredData);
        const resultUsers = filteredData
          .map((service: Service) => service.users)
          .reduce((acc: any[], users: any[]) => {
            users.forEach(user => {
              if (!acc.includes(user)) {
                acc.push(user);
              }
            });
            return acc;
          }, []);
        setUserIds(resultUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    }

    fetchServices();
  }, [search]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('http://localhost:3000/api/users');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        const filteredUsers = data.filter((user: User) => userIds.includes(user._id));
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    }

    fetchUsers();

  }, [userIds]);


  return (
    <>
      <div className="resultsSearch">
        <input type="text" placeholder="Search..." className="resultsInput" value={newSearch} onChange={(e) => { setNewSearch(e.target.value) }} />
        <Link href={`/result?q=${newSearch}`}>
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
            let serv = services.filter(service => service.users.includes(user._id))[0].service
            return <UserItem
              id={user._id.toString()}
              firstname={user.firstname}
              lastname={user.lastname}
              service={serv}
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