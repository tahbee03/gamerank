import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/Featured.css'

export default function Featured(){
    return (
        <section className = "featured--content">
            <h5>
                Featured Games
            </h5>
            <hr/>
            <Container>
                <Row>
                    <Col></Col>
                    <Col>Game 2</Col>
                    <Col>Game 3</Col>
                    <Col>Game 4</Col>
                    <Col>Game 5</Col>
                    <Col>Game 6</Col>
                    <Col>Game 7</Col>
                    <Col>Game 8</Col>
                    <Col>Game 9</Col>
                    <Col>Game 10</Col>
                </Row>
            </Container>
        </section>
    );
}  