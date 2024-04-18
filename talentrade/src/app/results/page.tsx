import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import './results.css'
import { FaSortAmountDown } from "react-icons/fa";
import MyFooter from "../components/myFooter/myFooter";

export default function Page() {
  const users = [
    {
      firstname: "John",
      lastname: "Doe",
      email: "johndoe@example.com",
      services: ["Web Design", "Graphic Design", "SEO"],
      credit: 15,
      peopleHelped: 34,
      rating: 4.5,
      profilePicture: "/picture1.png"
    },
    {
      firstname: "Jane",
      lastname: "Smith",
      email: "janesmith@example.com",
      services: ["Content Writing", "Social Media Marketing", "Email Marketing"],
      credit: 12,
      peopleHelped: 29,
      rating: 4.2,
      profilePicture: "/picture2.png"
    },
    {
      firstname: "Alice",
      lastname: "Johnson",
      email: "alicejohnson@example.com",
      services: ["App Development", "UI/UX Design", "Digital Marketing"],
      credit: 18,
      peopleHelped: 41,
      rating: 4.7,
      profilePicture: "/picture3.png"
    },
    {
      firstname: "Bobby",
      lastname: "Brown",
      email: "bobbybrown@example.com",
      services: ["Consulting", "Market Research", "Branding"],
      credit: 10,
      peopleHelped: 36,
      rating: 4.0,
      profilePicture: "/picture4.png"
    },
    {
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
      <div className="mainSearch">
        <input type="text" placeholder="Search..." className="mainInput" />
        <Link href="/results">
          <IoSearch className="mainIcon" />
        </Link>
      </div>
      <div>
        <h1>TOP RESULTS</h1>
        <FaSortAmountDown />
      </div>
      {/* people */}
      <h1>l</h1>
      <h1>l</h1>
      <h1>l</h1>
      <h1>l</h1>
      <h1>l</h1>
      <h1>l</h1>
      <h1>l</h1>
      <h1>l</h1>
      <button>Load More</button>
      <MyFooter />
    </>
  );
}