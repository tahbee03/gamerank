// TODO: Rename file and component to Register.jsx and Register, respectively

import { useState } from 'react';
import { useNavigate } from "react-router-dom"; // useNavigate()
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ModalTitle from "react-bootstrap/esm/ModalTitle";
import "./Register.css"
const server = import.meta.env.VITE_BACKEND_SERVER; // URL to back-end server via environment variable

function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Needed to redirect to another page

  function showPassword() {
    var x = document.getElementById("inputPassword5");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  async function handleSubmit() {
    const response = await fetch(`${server}users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });
    const data = await response.json();

    if (!response.ok) console.log(data.error);
    else {
      sessionStorage.setItem("user", JSON.stringify(data)); // Stores user in browser session storage
      navigate("/Profile");
    }

    // TODO: Modify so error messages are displayed on the front-end
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
            <h2>Register</h2>
          </div>
        </ModalTitle>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>
        <InputGroup size="md" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Email</InputGroup.Text>
          <Form.Control
            aria-label="Small"
            placeholder="Email"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text id="inputGroup-sizing-sm">Password</InputGroup.Text>
          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </Form.Text> */}
        </InputGroup>
        <InputGroup>
          <Form className="lg" id="switch">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Show the password"
              onClick={showPassword}
            />
          </Form>
        </InputGroup>
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

export default Register;
