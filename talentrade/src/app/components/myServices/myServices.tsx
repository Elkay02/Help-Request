import React, { useState, useEffect } from 'react';
import './myServices.css'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function MyServices({ services, id }: { services: string[], id: string }) {
  const [service, setService] = useState('new service');
  const [updatedServices, setUpdatedServices] = useState<string[]>(services);

  useEffect(() => {
    fetchServices();
  }, []); // Fetch services when the component mounts

  async function fetchServices() {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUpdatedServices(data.services);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  }

  async function handleEdit(index: number) {
    const servicePut = { service, index };

    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(servicePut)
      };
      const response = await fetch(`http://localhost:3000/api/users/${id}/services/edit`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchServices(); // Fetch updated services after edit
    } catch (error) {
      console.error('Error updating service:', error);
    }
    setService('');
  }

  async function handleDelete(index: number) {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index })
      };
      const response = await fetch(`http://localhost:3000/api/users/${id}/services/delete`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchServices(); // Fetch updated services after delete
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  }

  async function handleAdd() {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service })
      };
      const response = await fetch(`http://localhost:3000/api/users/${id}/services`, requestOptions);
      if (!response.ok) {

        throw new Error('Network response was not ok');
      }
      fetchServices(); // Fetch updated services after add
    } catch (error) {
      console.error('Error adding service:', error);
    }
    setService('');
  }

  return (
    <div className='profileCopmsContainer'>
      <ul id='myServicestUl'>
        {updatedServices.map((service, index) => (
          <React.Fragment key={index}>
            <li className='myServicesIl'>
              <h4>{service}</h4>
              <div>
                <FaEdit className='myServicesIcon' onClick={() => handleEdit(index)} />
                <MdDelete className='myServicesIcon' onClick={() => handleDelete(index)} />
              </div>
            </li>
            <hr className='myServicesHr' />
          </React.Fragment>
        ))}
      </ul>
      <input type="text" value={service} onChange={(e) => { setService(e.target.value) }} />
      <button className='profileCopmsButton' onClick={() => handleAdd()} >Add New</button>
    </div>
  );
}
