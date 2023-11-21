import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/Featured.css'

export default function AutoLayoutExample(){
    return (
        <Container>
            <Row>
                <Col>1 of 5</Col>
                <Col>2 of 5</Col>
                <Col>3 of 5</Col>
                <Col>4 of 5</Col>
                <Col>5 of 5</Col>
            </Row>
        </Container>
    );
}  