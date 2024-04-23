import { useState } from 'react';
import './userService.css'

export default function UserServices({ services }: { services: string[] }) {
  const [cutOff, setCutOff] = useState(3);

  return (
    <div className='profileCopmsContainer'>
      <ul id='myServicestUl'>
        {services.slice(0, cutOff).map((service, index) => (
          <div key={index}>
            <li className='myServicesIl'>
              <h4>{service}</h4>
            </li>
            <hr className='myServicesHr' />
          </div>
        ))}
      </ul>
      <button className='profileCopmsButton' onClick={() => setCutOff(cutOff + 2)}>Load More</button>

    </div>
  );
}