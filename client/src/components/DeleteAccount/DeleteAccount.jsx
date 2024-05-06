import Modal from 'react-bootstrap/Modal'; // <Modal>, <Modal.Header>, <Modal.Body>, <Modal.Footer>
import { ModalTitle } from 'react-bootstrap'; // <ModalTitle>
import InputGroup from "react-bootstrap/InputGroup"; // <InputGroup>
import Form from "react-bootstrap/Form"; // <Form>, <Form.Control>, <Form.Check>
import Button from "react-bootstrap/Button"; // <Button>
import { useState } from 'react'; // useState()
import { useParams } from "react-router-dom"; // useParams()
import "./DeleteAccount.css";
const server = import.meta.env.VITE_BACKEND_SERVER; // URL to back-end

export default function DeleteAccount(props) {
    const { username } = useParams();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);

    function showPassword() {
        const p = document.getElementById("user-password");
        (p.type === "password") ? p.type = "text" : p.type = "password";
    }

    async function handleSubmit() {
        async function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        setLoading(true);
        setMessage(null);
        setStatus(null);

        // STEP 1: Check if entered password is correct
        const loginResponse = await fetch(`${server}users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        const loginData = await loginResponse.json();

        if (!loginResponse.ok) {
            setMessage(loginData.error);
            setLoading(false);
            return;
        }

        // STEP 2: Disable mouse clicks and hide background while process is ongoing
        setStatus("Initiating...");
        for (let element of document.querySelectorAll("*")) element.style.pointerEvents = "none";
        document.querySelector(".fade.modal-backdrop.show").style.opacity = 1;
        const user = JSON.parse(sessionStorage.getItem("user"));
        console.log(user);
        await sleep(5000);

        // STEP 3: Remove all rankings associated with user
        setStatus("Removing rankings...");
        const rankingResponse = await fetch(`${server}rankings`);
        const rankingData = await rankingResponse.json();

        if (!rankingResponse.ok) {
            setMessage(rankingData.error);
            setLoading(false);
            return;
        }

        const rankings = rankingData.filter(r => r.author == user.id);
        for (let ranking of rankings) {
            await fetch(`${server}rankings/${ranking._id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ author: user.id })
            });
        }

        await sleep(1000);

        // STEP 4: Remove user followers and following
        setStatus("Removing connections...");
        for (let f of user.followers) {
            await fetch(`${server}users/unfollow/${f}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userIdToUnfollow: user.id })
            });
        }

        for (let ff of user.following) {
            await fetch(`${server}users/unfollow/${user.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userIdToUnfollow: ff })
            });
        }

        await sleep(1000);

        // STEP 5: Delete user
        setStatus("Deleting account...");
        const deleteResponse = await fetch(`${server}users/${user.id}`, {
            method: "DELETE"
        });
        const deleteData = deleteResponse.json();

        if (!deleteResponse.ok) {
            setMessage(deleteData.error);
            setLoading(false);
            return;
        }

        sessionStorage.removeItem("user");

        await sleep(1000);

        // STEP 6: Navigate to home page
        setStatus("Wrapping up...");
        await sleep(5000);
        window.location.href = "/";
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <ModalTitle>Delete Account</ModalTitle>
            </Modal.Header>
            <Modal.Body>
                <p>This action is irreversible! If you are sure about this, enter your password to delete your account.</p>
                <InputGroup size="md" className="mb-3">
                    <Form.Control
                        type="password"
                        id="user-password"
                        aria-describedby="passwordHelpBlock"
                        placeholder="Enter password here"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputGroup>
                <InputGroup>
                    <Form className="lg" id="switch">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Show password"
                            onClick={showPassword}
                        />
                    </Form>
                </InputGroup>
                {(message) && (
                    <div>
                        <p className="error-msg">{message}</p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                {(status) && (
                    <p>{status}</p>
                )}
                <Button variant="dark" onClick={handleSubmit}>
                    {(loading) && (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                    {!(loading) && (
                        <>Confirm</>
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}