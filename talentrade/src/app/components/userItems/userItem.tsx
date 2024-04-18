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
    <div>
      <img src={profile} alt={`${firstname} ${lastname}`} />
      <h1>{firstname + " " + lastname}</h1>
      <h2>{service}</h2>
      <p>{`I helped ${helped} people and they rated me ${rating}`}</p>
    </div>
  );
}