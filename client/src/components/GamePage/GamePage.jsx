import './GamePage.css'
import { format } from "date-fns"; // format()
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
const api = import.meta.env.VITE_API_URL;
const key = import.meta.env.VITE_API_KEY;

export default function GamePage() {
    const { id } = useParams(); // Game ID grabbed from URL
    const [game, setGame] = useState(null); // State that holds game data after being fetched
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadGame() {
            setLoading(true);
            try {
                const response = await fetch(`${api}games/${id}?key=${key}`);
                const data = await response.json();

                setGame(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        loadGame();
    }, []);

    return (
        <>
            <Navbar />
            {(loading) && (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            {!(loading) && !(game) && (
                <div><h1>Game data is not available.</h1></div>
            )}
            {!(loading) && (game) && (
                <Container className="game-container">
                    <Row className='game-row'>
                        <Col className='game-art-column d-flex align-items-center' md={6}>
                            <img className="game-pic" src={game.background_image} alt="cover-art-for-the-game" />
                        </Col>
                        <Col className='game-details-column' md={6}>
                            <h1 className="game-title">{game.name}</h1>
                            <h3 className="game-publisher">Developed by {game.publishers[0].name}</h3>
                            <h4 className="game-released-date">Released: {format(new Date(game.released), "yyyy")}</h4>
                            <p className="game-description">{game.description_raw}</p>
                            <p className="game-reviews">{game.reviews_count} reviews</p>
                        </Col>
                    </Row>
                </Container>
            )}
            <Footer />
        </>
    );
}
