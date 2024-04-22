import { useState } from 'react';
import './newService.css'

export function NewService({ isAdd, id, index, set }: { isAdd: boolean, id: string, index: number, set: any }) {

  const [service, setService] = useState('');

  const handleChange = (e: any) => {
    setService(e.target.value);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isAdd) handleAdd();
    else handleEdit(index);
    set(false)
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
    } catch (error) {
      console.error('Error adding service:', error);
    }
    setService('');
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
    } catch (error) {
      console.error('Error updating service:', error);
    }
    setService('');
  }

  return (
    <div className='newServBckgrnd'>
      <div className='newServ'>
        <h1 className='newServTitle'>{isAdd ? 'Add a New Service' : 'Edit Your Service'}</h1>
        <form className='newServForm' onSubmit={handleSubmit}>
          <input
            type="text"
            className='newServInput'
            placeholder='Service'
            name='service'
            value={service}
            onChange={handleChange}
            required
          />
          <hr className='newServHr' />
          <button type='submit' className='newServButton newServSubmit'>Submit</button>
        </form>
      </div>
    </div>
  );
}