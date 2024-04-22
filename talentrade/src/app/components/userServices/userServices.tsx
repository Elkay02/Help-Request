import './userService.css'

export default function UserServices({ services }: { services: string[] }) {

  return (
    <div className='profileCopmsContainer'>
      <ul id='myServicestUl'>
        {services.map((service, index) => (
          <div key={index}>
            <li className='myServicesIl'>
              <h4>{service}</h4>
            </li>
            <hr className='myServicesHr' />
          </div>
        ))}
      </ul>
      <button className='profileCopmsButton'>Load More</button>

    </div>
  );
}