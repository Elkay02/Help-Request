import './myServices.css'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function MyServices() {
  return (
    <div className='profileCopmsContainer'>
      <ul id='myServicestUl'>
        <li className='myServicesIl'>
          <h4>Web Design</h4>
          <div>
            <FaEdit className='myServicesIcon' />
            <MdDelete className='myServicesIcon' />
          </div>
        </li>
        <hr className='myServicesHr' />
        <li className='myServicesIl'>
          <h4>Graphic Design</h4>
          <div>
            <FaEdit className='myServicesIcon' />
            <MdDelete className='myServicesIcon' />
          </div>
        </li>
        <hr className='myServicesHr' />
        <li className='myServicesIl'>
          <h4>SEO</h4>
          <div>
            <FaEdit className='myServicesIcon' />
            <MdDelete className='myServicesIcon' />
          </div>
        </li>
        <hr className='myServicesHr' />
      </ul>
      <button className='profileCopmsButton'>Add New</button>

    </div>
  );
}