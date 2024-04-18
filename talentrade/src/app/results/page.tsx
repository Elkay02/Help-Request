import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import './results.css'
import { FaSortAmountDown } from "react-icons/fa";
import MyFooter from "../components/myFooter/myFooter";
import UserItem from "../components/userItems/userItem";

export default function Page() {

  const users = [
    {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      email: "johndoe@example.com",
      services: ["Web Design", "Graphic Design", "SEO"],
      credit: 15,
      peopleHelped: 34,
      rating: 4.5,
      profilePicture: "/picture7.png"
    },
    {
      id: 2,
      firstname: "Jane",
      lastname: "Smith",
      email: "janesmith@example.com",
      services: ["Content Writing", "Social Media Marketing", "Email Marketing"],
      credit: 12,
      peopleHelped: 29,
      rating: 4.2,
      profilePicture: "/picture9.png"
    },
    {
      id: 3,
      firstname: "Alice",
      lastname: "Johnson",
      email: "alicejohnson@example.com",
      services: ["App Development", "UI/UX Design", "Digital Marketing"],
      credit: 18,
      peopleHelped: 41,
      rating: 4.7,
      profilePicture: "/picture8.png"
    },
    {
      id: 4,
      firstname: "Bob",
      lastname: "Brown",
      email: "bobbrown@example.com",
      services: ["Consulting", "Market Research", "Branding"],
      credit: 10,
      peopleHelped: 36,
      rating: 4.0,
      profilePicture: "/picture10.png"
    },
    {
      id: 5,
      firstname: "Eva",
      lastname: "Green",
      email: "evagreen@example.com",
      services: ["Photography", "Video Production", "Editing"],
      credit: 20,
      peopleHelped: 47,
      rating: 4.8,
      profilePicture: "/picture5.png"
    },
    {
      id: 6,
      firstname: "Mike",
      lastname: "Ross",
      email: "mikeross@example.com",
      services: ["IT Support", "Network Security", "Software Installation"],
      credit: 14,
      peopleHelped: 25,
      rating: 3.9,
      profilePicture: "/picture6.png"
    }
  ];

  const userOne = users[0];

  return (
    <>
      <div className="resultsSearch">
        <input type="text" placeholder="Search..." className="resultsInput" />
        <Link href="/results">
          <IoSearch className="resultsIcon" />
        </Link>
      </div>
      <div id="resultTopTxt">
        <h1>TOP RESULTS</h1>
        <h2>SORT <FaSortAmountDown /></h2>
      </div>
      <div id="resultsUsers">
        {users.map((user, index) => {
          return <UserItem
            key={index}
            firstname={user.firstname}
            lastname={user.lastname}
            service={user.services[0]}
            rating={user.rating}
            profile={user.profilePicture}
            helped={user.peopleHelped}
          />
        })}
      </div>
      <button id="resultsButton">Load More</button>
      <MyFooter />
    </>
  );
}