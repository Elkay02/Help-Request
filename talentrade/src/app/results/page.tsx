'use client'
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import './results.css'
import { FaSortAmountDown } from "react-icons/fa";
import MyFooter from "../components/myFooter/myFooter";
import UserItem from "../components/userItems/userItem";
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { similarity } from "../utils/search";
import SortOverlay from "../components/sortOverlay/sortOverlay";

type User = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  services: string[];
  credit: number;
  peopleHelped: number;
  rating: number;
  picture: string;
};

type Service = {
  _id: string;
  service: string;
  users: string[];
}


export default function Page() {

  const router = useRouter();
  const [newSearch, setNewSearch] = useState('');
  const [showSort, setShowSort] = useState(false);
  const [sortCategory, setSortCategory] = useState('');
  const [cutOff, setCutOff] = useState(8);

  const handleSearch = () => {
    const queryString = new URLSearchParams({ q: newSearch }).toString(); // Construct query string
    const url = `/results?${queryString}`; // Construct URL string
    router.push(url); // Push the URL
  };

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
        const filteredData = data.filter((service: Service) => similarity(search, service.service) > 0.35)
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

        let filteredUsers = data.filter((user: User) => userIds.includes(user._id));
        switch (sortCategory) {
          case 'rating':
            filteredUsers = filteredUsers.sort((a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating)
            break;

          case 'people':
            filteredUsers = filteredUsers.sort((a: { peopleHelped: number; }, b: { peopleHelped: number; }) => b.peopleHelped - a.peopleHelped)
            break;

          default:
            break;
        }
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    }

    fetchUsers();

  }, [userIds, sortCategory]);


  return (
    <>
      <div className="resultsSearch">
        <input type="text" placeholder="Search..." className="resultsInput" value={newSearch} onChange={(e) => { setNewSearch(e.target.value) }} />
        <IoSearch className="resultsIcon" onClick={handleSearch} />
      </div>
      <div id="resultTopTxt">
        <h1>TOP RESULTS</h1>
        <h2 onClick={() => { setShowSort(!showSort) }}>SORT <FaSortAmountDown /></h2>
        {showSort && <SortOverlay setCat={setSortCategory} setShow={setShowSort} />}
      </div>
      <div id="resultsUsers">
        {
          users.slice(0, cutOff).map((user: User) => {
            let filtServ = services.filter(service => service.users.includes(user._id))
            let serv = filtServ.length ? filtServ[0].service : user.services[0]
            return <UserItem
              id={user._id.toString()}
              firstname={user.firstname}
              lastname={user.lastname}
              service={serv}
              rating={user.rating}
              profile={user.picture}
              helped={user.peopleHelped}
            />
          })}
      </div>
      <button id="resultsButton" onClick={() => setCutOff(cutOff + 4)}>Load More</button>
      <MyFooter />
    </>
  );
}