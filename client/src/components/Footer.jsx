import "../styles/Footer.css";
// import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";

export default function Footer() {
    return (
        <footer>
            <section className="footer--katanakoders">
                <h6>
                    Katana Koders
                </h6>
                <hr />
                <ul>
                    <li>Talike</li>
                    <li>Jon</li>
                    <li>Sri</li>
                    <li>Pablo</li>
                </ul>
            </section>
            <section className="footer--techsection">
                <h6>
                    Technology
                </h6>
                <hr />
                <ul>
                    <li>MongoDB</li>
                    <li>JWT</li>
                    <li>ReactJS</li>
                    <li>Bootstrap</li>
                    <li>Veat</li>
                    <li>Express/Node.js</li>
                    <li>Figma</li>
                </ul>
            </section>
        </footer>
    );
}