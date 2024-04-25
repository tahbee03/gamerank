import React, { useState, useEffect } from 'react';
const api = import.meta.env.VITE_API_URL;
const key = import.meta.env.VITE_API_KEY;

export default function TrendingGames() {
    // Initialized hooks for managing the states for games, loading, and errors during API request.
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);    
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const url = `${api}games?key=${key}`;
                const response = await fetch(url);

                // if the API response is not ok to handle it in the catch block
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json(); // Convert the response to JSON format

                setGames(data); // Update the games state with the fetched data
                setLoading(false); // Set loading to false as the data fetching is complete
            } catch (err) {
                setError(err.message); // Catch any errors that occur during the fetch operation
                setLoading(false); // Set loading to false as the fetching process has ended (either in success or failure)
            }
        };

        fetchGames();
    }, [api, key]); // Dependencies array to control the effect's re-execution based on changes to api or key

    if (error) return <div>Error: {error}</div>; // show any error message if an error occurs during the fetch

    return (
        <>
        {(loading) && (
            <div className="container">
                <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            )
        }
            <h2>Trending Games</h2>
            <div className="game-list">
                {games.map(game => (
                    <div key={game.id} className="game-card">
                        <img src={game.artUrl} alt={game.title} />
                        <h3>{game.title}</h3>
                        <p>Average Rating: {game.averageRating}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
