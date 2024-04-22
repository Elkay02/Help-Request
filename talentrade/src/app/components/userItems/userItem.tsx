import Link from 'next/link';
import './userItem.css'

export default function UserItem({ id, firstname = "L", lastname = "K", service = "No Services Yet", rating = 0, profile = "/default.png", helped = 0 }: {
  id: string;
  firstname: string;
  lastname: string;
  service: any;
  rating: number;
  profile: string;
  helped: number;
}) {
  return (
    <Link href={`/${id}/profile`} id='userItemLink'>
      <div id='userItem'>
        <img src={profile} alt={`${firstname} ${lastname}`} id='userItemImg' />
        <div id='userItemInfo'>
          <h1 id='userItemName'>{firstname + " " + lastname}</h1>
          <h4 id='userItemService'>{service}</h4>
          <p id='userItemParag'>{`people helped: ${helped}
              rating: ${rating}`}</p>
        </div>
      </div>
    </Link>
  );
}