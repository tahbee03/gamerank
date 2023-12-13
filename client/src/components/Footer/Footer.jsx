import './Footer.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='footer--katanaKoders'>
                        <div class='flip-card'>
                            <div class='flip-card-inner'>
                                <div class='flip-card-front'>
                                    <h1>GameRank Developers</h1>
                                </div>
                                <div class='flip-card-back'>
                                    <section className='flip-card--katanaKoders'>
                                        <h1>The Katana Koders</h1>
                                        <hr/>
                                        <h5>John: Github (PL01) | LinkedIn</h5>
                                        <h5>Talike: Github () | LinkedIn</h5>
                                        <h5>Pablo Lara: Github () | LinkedIn</h5>
                                        <h5>Sri: Github () | LinkedIn</h5>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col className='footer--techSection'>
                        <div class='flip-card'>
                                <div class='flip-card-inner'>
                                    <div class='flip-card-front'>
                                        <h1>GameRank Technology</h1>
                                    </div>
                                    <div class='flip-card-back'>
                                        <section className='flip-card--techSection'>
                                        <h1>Development Software</h1>
                                            <hr/>
                                            <p><img src='https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white'/></p>
                                            <p><img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' /></p>
                                            <p><img src='https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white'/></p>
                                            <p><img src='https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white'/></p>
                                            <p><img src='https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E'/></p>
                                        </section>
                                    </div>
                                </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}