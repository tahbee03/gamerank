import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const api = import.meta.env.VITE_API_URL;
const key = import.meta.env.VITE_API_KEY;

export default function GameContent() {
    const [gamesData, setGamesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${api}games?key=${key}`);
                const data = await response.json();
                setGamesData(data.results); // Assuming data.results is the array of games
            } catch (error) {
                setError('Failed to fetch games');
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container>
            {loading ? (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                <Row>
                    {gamesData.map((game, index) => (
                        <Col key={index} md={4}>
                            <Link to={{
                                pathname: `/game/${game.id}`,
                                state: { 
                                    game: {
                                        title: game.name,
                                        picture: game.background_image,
                                        description: game.description || 'No description available.',
                                        date: game.released,
                                        publisher: game.publishers?.[0]?.name || 'Unknown publisher',
                                        reviews: game.reviews_count || 'No reviews'
                                    }
                                }
                            }}>
                                <div className="game-card" style={{ textAlign: 'center' }}>
                                    <img src={game.background_image} alt={game.name} style={{ width: '100%', height: 'auto' }} />
                                    <div>
                                        <h2>{game.name}</h2>
                                        <h3>Developed by {game.publishers?.[0]?.name || 'Unknown publisher'}</h3>
                                        <h4>Released: {game.released}</h4>
                                        <p>{game.description}</p>
                                        <p>{game.reviews_count} reviews</p>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}
