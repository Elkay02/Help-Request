import './userService.css'

export default function UserServices({ services }: { services: string[] }) {
  return (
    <div className='profileCopmsContainer'>
      <ul id='myServicestUl'>
        <li className='myServicesIl'>
          <h4>Web Design</h4>
        </li>
        <hr className='myServicesHr' />
        <li className='myServicesIl'>
          <h4>Graphic Design</h4>
        </li>
        <hr className='myServicesHr' />
        <li className='myServicesIl'>
          <h4>SEO</h4>
        </li>
        <hr className='myServicesHr' />
      </ul>
      <button className='profileCopmsButton'>Load More</button>

    </div>
  );
}