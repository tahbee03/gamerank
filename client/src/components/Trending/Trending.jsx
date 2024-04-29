import React from 'react';
import { useState, useEffect } from 'react';
import './Trending.css';

const api = import.meta.env.VITE_API_URL;
const key = import.meta.env.VITE_API_KEY;

export default function TrendingGames(){

    const [gamesData, setGamesData] = useState([]); // State hook for storing games data
    const [loading, setLoading] = useState(true); // State hook for managing the loading status of the API request

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${api}games?key=${key}`);
                const data = await response.json();
                setGamesData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return(
        <>
            {
                (loading) && (
                    <div className="container">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )
            }

            {
                !(loading) && (gamesData) && (
                    <div>
                        <h2>Trending Games!</h2>
                        <div className="game-list">
                            {gamesData.map((game, i) => (
                                <div key={i} className="game-card">
                                    <img src={game.background_image}/>
                                    <h3>{game.name}</h3>
                                    <p>Average Rating: Insert Rating Tracking System here?</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </>
    )

}