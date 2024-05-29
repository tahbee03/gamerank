import './TopReviewers.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate()
import Navbar from "../../components/Navbar/Navbar.jsx";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
        <Container style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }} className='top-reviewers-container'>
          <Row>
            <Col>
              <div className='top-reviewers-title'>
                <h1>Top Reviewers by Reviews</h1>
              </div>
                {topReviewers.map((reviewer,) => (
                  <div className='top-reviewers-list' key={reviewer._id}>
                    User [<span className="user" onClick={() => navigate(`/Profile/${reviewer.username}`)}>{reviewer.username}</span>] with {reviewer.reviewCount} reviews
                  </div>
                ))}
            </Col>
          </Row>
        </Container>
    </>
  );
}
