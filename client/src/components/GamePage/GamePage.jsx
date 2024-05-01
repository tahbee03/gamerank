import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function GamesPage() {
    const location = useLocation();
    const { game } = location.state || {}; // Safely accessing game data from router state

    if (!game) {
        return <div><h1>Game data is not available.</h1></div>;
    }

    return (
        <>
            <Navbar />
            <Container className="game-container">
                <Row>
                    <Col>
                        <img className="game-pic" src={game.picture} alt="cover-art-for-the-game" />
                    </Col>
                    <Col>
                        <h1 className="game-title">{game.title}</h1>
                        <h3>Developed by {game.publisher}</h3>
                        <h4>Released: {game.date}</h4>
                        <p>{game.description}</p>
                        <p>{game.reviews_count} reviews</p>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
