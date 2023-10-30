// import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ModalTitle from "react-bootstrap/esm/ModalTitle";
import "../styles/Custom.css";

function Login(props) {
    function showPassword(){
        var x = document.getElementById("inputPassword5");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
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
            <h2>Login</h2>
          </div>
        </ModalTitle>
      </Modal.Header>
      <Modal.Body>
        <InputGroup size="md" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Email</InputGroup.Text>
          <Form.Control
            aria-label="Small"
            placeholder="Email"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text id="inputGroup-sizing-sm">Password</InputGroup.Text>
          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            placeholder="password"
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
            <Button variant="dark">
                Submit
            </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
export default Login;
