import './Footer.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='footer--katanaKoders'>
                        <div className='flip-card'>
                            <div className='flip-card-inner'>
                                <div className='flip-card-front'>
                                    <h1>GameRank Developers</h1>
                                </div>
                                <div className='flip-card-back'>
                                    <section className='flip-card--katanaKoders'>
                                        <h1>The Katana Koders</h1>
                                        <hr />
                                        <h5>Fu Jun Pan: Github <a href='https://github.com/lolfjp'>(lolfjp)</a> | <a href='https://www.linkedin.com/in/fu-jun-pan-80964621b/'>LinkedIn</a></h5>
                                        <h5>Pablo Lara: Github <a href='https://github.com/pl01'>(pl01)</a> | <a href='https://www.linkedin.com/in/pablo-lara/'>LinkedIn</a></h5>
                                        <h5>Sri Tarun Gulumuru: Github <a href='https://github.com/sritarung'>(sritarung)</a> | <a href='https://www.linkedin.com/in/sri-tarung/'>LinkedIn</a></h5>
                                        <h5>Talike Bennett: Github <a href='https://github.com/tahbee03'>(tahbee03)</a> | <a href='https://www.linkedin.com/in/talikebennett/'>LinkedIn</a></h5>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col className='footer--techSection'>
                        <div className='flip-card'>
                            <div className='flip-card-inner'>
                                <div className='flip-card-front'>
                                    <h1>GameRank Technology</h1>
                                </div>
                                <div className='flip-card-back'>
                                    <section className='flip-card--techSection'>
                                        <h1>Development Software</h1>
                                        <hr />
                                        <p><img src='https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white' /></p>
                                        <p><img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' /></p>
                                        <p><img src='https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white' /></p>
                                        <p><img src='https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white' /></p>
                                        <p><img src='https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E' /></p>
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