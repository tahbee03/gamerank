import { Form, InputGroup } from "react-bootstrap";
import { useState } from "react";
import SearchResult from "../SearchResult/SearchResult";
const api = import.meta.env.VITE_API_URL; // URL to game API via environment variable
const key = import.meta.env.VITE_API_KEY; // Key for game API

function GameSearch({ setGameData }) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  async function match(input) {
    if (input == "") setResults(null);
    else {
      setLoading(true);
      let r = await fetch(`${api}games?key=${key}&search=${input}`);
      let d = await r.json();
      setLoading(false);
      setResults(d.results.slice(0, 5)); // Only show the top five search results
    }
  }

  function handleClick(game) { // Pass as prop to <SearchResult /> to receive selected game
    setResults(null);
    setGameData(game); // Passed as prop from <Review /> to send selected game
  }

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search for game here."
          onChange={(e) => match(e.target.value)}
        />
      </InputGroup>
      {(loading) && (
        <div className="container">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!(loading) && (
        <div className="container">
          {(results) && (results.length == 0) && (
            <p>No games match your search.</p>
          )}
          {(results) && (results.length > 0) && (
            results.map((game, i) => (
              <SearchResult
                key={i}
                id={game.id}
                name={game.name}
                image={game.background_image}
                handleClick={handleClick}
              />
            ))
          )}
        </div>
      )}
    </>
  );
}

export default GameSearch;