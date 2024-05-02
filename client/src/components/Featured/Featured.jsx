import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FeaturedGame from '../FeaturedGame/FeaturedGame.jsx';
import './Featured.css';
import { useEffect, useState } from 'react'

const api = import.meta.env.VITE_API_URL;
const key = import.meta.env.VITE_API_KEY;

export default function Featured() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchData() {
        setLoading(true);
        let r = await fetch(`${api}games?key=${key}`);
        let d = await r.json();

        setData(d.results);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container>
            <h2>Featured Games</h2>
            {(loading) && (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            {!(loading) && (data) && (
                <>
                    <Row>
                        {data.filter((_, i) => (i > -1 && i < 3)).map((game, i) => (
                            <Col key={i}>
                                <a href={`/Games/${game.id}`}>
                                    <FeaturedGame
                                        title={game.name}
                                        picture={game.background_image}
                                        reviews={game.reviews_count}
                                    />
                                </a>
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        {data.filter((_, i) => (i > 2 && i < 6)).map((game, i) => (
                            <Col key={i}>
                                <a href={`/Games/${game.id}`}>
                                    <FeaturedGame
                                        title={game.name}
                                        picture={game.background_image}
                                        reviews={game.reviews_count}
                                    />
                                </a>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </Container>
    );
}  