import './TopReviewers.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate()
import Navbar from "../Navbar/Navbar.jsx";
const server = import.meta.env.VITE_BACKEND_SERVER;

export default function TopReviewers() {
  const [topReviewers, setTopReviewers] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`${server}users/topreviewers`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTopReviewers(data);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h1>Top Reviewers by Reviews</h1>
          {topReviewers.map((reviewer,) => (
            <div key={reviewer._id}>
              User [<span className="user" onClick={() => navigate(`/Profile/${reviewer.username}`)}>{reviewer.username}</span>] with {reviewer.reviewCount} reviews
            </div>
          ))} 
      </div>
    </>
  );
}
