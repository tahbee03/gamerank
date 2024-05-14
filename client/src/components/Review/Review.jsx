import { useState } from 'react';
import "./Review.css"
import StarRating from '../StarRating/StarRating.jsx';
import GameSearch from '../GameSearch/GameSearch.jsx';
import { Button, Modal, Form, InputGroup, ModalTitle } from "react-bootstrap";
const server = import.meta.env.VITE_BACKEND_SERVER; // URL to back-end server via environment variable

function Review(props) {
  const [rank, setRank] = useState(0); //use the stars to determine the ranking of the review
  const [spoiler, setSpoiler] = useState(false);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [gameData, setGameData] = useState(null);

  async function handleSubmit() {
    setLoading(true);
    const user = sessionStorage.getItem("user");
    const response = await fetch(`${server}rankings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author: JSON.parse(user).id, picUrl: gameData.image, title: gameData.name, rank, spoiler, desc, gameID: gameData.id })
    });
    const data = await response.json();

    if (!response.ok) {
      console.log(data.error);
    }
    else {
      window.location.reload();
    }
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <ModalTitle>
          <div id="title">
            <h2>Review a Game</h2>
          </div>
        </ModalTitle>
      </Modal.Header>
      <Modal.Body>
        {!(gameData) && (
          <GameSearch setGameData={setGameData} />
        )}
        {(gameData) && (
          <div className="selected-game mb-3">
            <div className="col-6">
              <img src={gameData.image} alt="game-pic" className="game-pic" />
            </div>
            <div className="col-5">
              <p>{gameData.name}</p>
            </div>
            <div className="col-1">
              <span className="material-symbols-outlined x-symbol" onClick={() => setGameData(null)}>
                close
              </span>
            </div>
          </div>
        )}
        <InputGroup size="md" className="mb-3">
          <Form.Control
            placeholder="Write your review here."
            as="textarea" rows={3}
            onChange={(e) => setDesc(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Form.Check
            type="switch"
            label="Spoiler?"
            onChange={() => setSpoiler(!spoiler)}
          />
        </InputGroup>
        <InputGroup>
          <StarRating
            rank={rank}
            setRank={setRank}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        {(loading) && (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {!(loading) && (
          <div id="submit">
            <Button variant="dark" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default Review;
