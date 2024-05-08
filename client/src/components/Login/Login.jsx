import "./Login.css";
import { useNavigate } from "react-router-dom"; // useNavigate()
import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import ModalTitle from "react-bootstrap/esm/ModalTitle";

const server = import.meta.env.VITE_BACKEND_SERVER; // URL to back-end server via environment variable

function Login(props) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
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
    setMsg(null);
    setLoading(true);
    const controller = new AbortController();
    const timeoutID = setTimeout(() => controller.abort(), 10000); // Ten-second timer for the fetch call

    try {
      const response = await fetch(`${server}users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        signal: controller.signal
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }
      else {
        clearTimeout(timeoutID); // Stop timer prematurely (if necessary)
        sessionStorage.setItem("user", JSON.stringify(data)); // Stores user in browser session storage
        navigate(`/Profile/${username}`);
      }
    } catch (error) {
      clearTimeout(timeoutID); // Stop timer prematurely (if necessary)
      console.log(error);

      if (error.name === "AbortError") setMsg("Server took too long to respond. Please try again later."); // Slow connection
      else if (error.name === "Error") setMsg(error.message); // Error sent from server
      else if (error.message === "Failed to fetch") setMsg("Could not connect to server."); // Server is not running
      else setMsg(`${error.message}.`); // All other errors
    }

    setLoading(false);
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
            <h2>Login</h2>
          </div>
        </ModalTitle>
      </Modal.Header>
      <Modal.Body>
        <InputGroup size="md" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Username</InputGroup.Text>
          <Form.Control
            aria-label="Small"
            placeholder="Username"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => setUsername(e.target.value)}
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
        {(msg) && (
          <p className="error-msg">{msg}</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div id="submit">
          <Button variant="dark" onClick={handleSubmit} disabled={loading}>
            {(loading) ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                Submit
              </>
            )}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
export default Login;
