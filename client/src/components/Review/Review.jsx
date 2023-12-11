import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ModalTitle from "react-bootstrap/esm/ModalTitle";
import "./Review.css"
import StarRating from '../StarRating';
const server = import.meta.env.VITE_BACKEND_SERVER; // URL to back-end server via environment variable

function Review(props) {
  const [picUrl, setPicUrl] = useState("");
  const [title, setTitle] = useState("");
  const [rank, setRank] = useState(""); //use the stars to determine the ranking of the review
  const [date, setDate] = useState(""); //use current Date to get the date
  const [spoiler, setSpoiler] = useState("");
  const [desc, setDesc] = useState("");

  async function handleSubmit() {
    const response = await fetch(`${server}reviews/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ picUrl, title, rank, date, spoiler, desc })
    });
    const data = await response.json();
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
        <InputGroup size="md" className="mb-3">
          <Form.Control
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="URL"
            onChange={(e) => setPicUrl(e.target.value)}
          />
        </InputGroup>
        <InputGroup size="md" className="mb-3">
          <Form.Control
            placeholder="This is where you write your review."
            as="textarea" rows={3}
            onChange={(e) => setDesc(e.target.value)}

          />
        </InputGroup>
        <Form.Check 
          type="switch"
          label="Spoiler?"
          onChange={(e) => setSpoiler(e.target.value)}
        />
        <StarRating />
      </Modal.Body>
      <Modal.Footer>
        <div id="submit">
          <Button variant="dark" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default Review;
