import { useEffect, useState } from "react";
import { ModalTitle } from "react-bootstrap";
import React from "react";
import Modal from 'react-bootstrap/Modal';
import './Following.css';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // useNavigate()
const server = import.meta.env.VITE_BACKEND_SERVER;

export default function Following(props) {
    const { username } = useParams();
    const [following, setFollowing] = useState([]);
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

    // Fetch user's following
    useEffect(() => {
        if (user) {
            fetch(`${server}users/${user._id}/following`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setFollowing(data);
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
                    Following
                </ModalTitle>
            </Modal.Header>
            <Modal.Body>
                {(following.length == 0) && (
                    <p>No following!</p>
                )}
                {(following.length > 0) && (
                    <div>
                        {following.map(following => (
                            <React.Fragment key={following._id}>
                                <span
                                    onClick={() => { navigate(`/Profile/${following.username}`); window.location.reload(); }}
                                    className="following-clickable"
                                >
                                    {following.username}
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
