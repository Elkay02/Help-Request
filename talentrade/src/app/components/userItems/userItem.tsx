import './userItem.css'

export default function UserItem({ firstname, lastname, service, rating, profile, helped }: {
  firstname: string;
  lastname: string;
  service: string;
  rating: number;
  profile: string;
  helped: number;
}) {
  return (
    <div id='userItem'>
      <img src={profile} alt={`${firstname} ${lastname}`} id='userItemImg' />
      <div id='userItemInfo'>
        <h1 id='userItemName'>{firstname + " " + lastname}</h1>
        <h4 id='userItemService'>{service}</h4>
        <p id='userItemParag'>{`people helped: ${helped}
              rating: ${rating}`}</p>
      </div>
    </div>
  );
}