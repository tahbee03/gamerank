import { useEffect, useState } from "react";
import { ModalTitle } from "react-bootstrap";
import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Followers.css';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // useNavigate()
const server = import.meta.env.VITE_BACKEND_SERVER;

export default function Followers(props) {
    const { username } = useParams();
    const [followers, setFollowers] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); 

    // Fetch user's data to load on page
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${server}users`);
            const data = await response.json();

            if (!response.ok) {
                console.log(data.error);
            }
            else {
                setUser(data.find(u => u.username === username));
            }
        }
        fetchData();
    }, [username]);

    // Fetch user's followers
    useEffect(() => {
        if (user) {
            fetch(`${server}users/${user._id}/followers`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setFollowers(data);
                    // console.log(data);
                })
                .catch((error) => console.error("Fetch error:", error));
        }
    }, [user]);

    return (
        <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <ModalTitle>
                Followers
            </ModalTitle>
        </Modal.Header>
        <Modal.Body>
        {(followers.length == 0) && (
            <p>No followers!</p>
        )}
        {(followers.length > 0) && (
            <div>
                {followers.map(follower => (
                <React.Fragment key={follower._id}>
                <span 
                    onClick={() => { navigate(`/Profile/${follower.username}`); window.location.reload(); }}
                    className="followers-clickable"
                >
                    {follower.username}
                </span>
                <br />
                </React.Fragment>
                ))}
            </div>
        )}
        </Modal.Body>
        </Modal>
    );
}
