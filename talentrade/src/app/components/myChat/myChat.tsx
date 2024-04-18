/* eslint-disable @next/next/no-img-element */
import './myChat.css'

export default function MyChat() {
  return (
    <div className='profileCopmsContainer'>
      <ul id='myChartUl'>
        <li className='myChartIl'>
          <img src="/picture9.png" alt="small profile" />
          <h4>Jane Smith</h4>
        </li>
        <hr className='myChartHr' />
        <li className='myChartIl'>
          <img src="/picture10.png" alt="small profile" />
          <h4>Alice Johnson</h4>
        </li>
        <hr className='myChartHr' />
        <li className='myChartIl'>
          <img src="/picture8.png" alt="small profile" />
          <h4>Bob Brown</h4>
        </li>
        <hr className='myChartHr' />
      </ul>
      <button className='profileCopmsButton'>Load More</button>
    </div>
  );
}