import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/Featured.css'

// Enviornment variables. Not for public.
// const url = import.meta.env.VITE_API_URL
// const key = import.meta.env.VITE_API_KEY

export default function Featured(){

    // async function gameData(){
    //     const response = await fetch(`${url}games?key=${key}`);
        
    //     const data = await response.json();

    //     console.log(data);
    // } 

    return (
        <div className = "featured--content">
            <h5>
                Featured Games
            </h5>
            <hr/>
            <Container>
                <Row>
                    {/* <Col><button onClick={gameData}>Click me</button></Col> */}
                    <Col className='featured--games'><img src = 'game1.jpg'/></Col>
                    <Col className='featured--games'><img src = 'game2.jpg'/></Col>
                    <Col className='featured--games'><img src = 'game3.jpg'/></Col>
                    <Col className='featured--games'><img src = 'game4.jpg'/></Col>
                    <Col className='featured--games'><img src = 'game5.jpg'/></Col>
                </Row>
            </Container>
        </div>
    );
}  