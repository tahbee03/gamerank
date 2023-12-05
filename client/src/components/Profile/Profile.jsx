import Navbar from '../Navbar.jsx';
import './Profile.css';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsStar } from "react-icons/bs";
// import { BsStarHalf } from "react-icons/bs";
// import { BsStarFill } from "react-icons/bs";


function Profile() {
    return (
        <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xxs"
        >
            <div>
                <Navbar/>
                <div className="top">
                    <div className="profile">
                        <img src="default-avatar.jpg" alt="Avatar"></img>
                        <div className="name">Name</div>
                        <div className="edit-btn"><button>Edit Profile</button></div>
                    </div>
                    <div className="bar">
                        <td><a href="#activity">Activity</a></td>
                        <td><a href="#ranking">Ranks</a></td>
                        <td><a href="#listing">Lists</a></td>
                        <td>Socials</td>
                        <td>Followers: 0</td>
                        <td>Following: 0</td>
                    </div>
                </div>

                <div className="section" id="activity">
                <div className="section-title">Recent Activity</div>
                <hr className="divider" />
                    <Row className="rct-act">
                        <Col className="act"><img src="default-avatar.jpg" alt="Activity"></img><BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></Col>
                        <Col className="act"><img src="asdkasdaergo" alt="Activity"></img><BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></Col>
                        <Col className="act"><img src="default-avatar.jpg" alt="Activity"></img><BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></Col>
                        <Col className="act"><img src="default-avatar.jpg" alt="Activity"></img><BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></Col>
                        <Col className="act"><img src="default-avatar.jpg" alt="Activity"></img><BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></Col>
                    </Row>
                </div>

                <div className="section" id="ranking">
                <div className="section-title">Recent Rankings</div>
                <hr className="divider" />
                <div>
                    <div className="ranking">
                        <img src="default-avatar.jpg" alt="Ranking"></img>
                        <div>
                            <tr className="game-title">GAME TITLE</tr>
                            <tr><BsStar /><BsStar /><BsStar /><BsStar /><BsStar /> Ranked: 12/4/2023</tr>
                            <tr className="spoilers">Review contains spoilers</tr>
                            <tr>Title is Truly The Most Genres That Has Ever Gamed.</tr>
                        </div>
                    </div>
                    
                </div>
                </div>      

                <div className="section" id="listing">
                <div className="section-title">Recent Lists</div>
                <hr className="divider" />
                    <div className="listing">
                        <img src="default-avatar.jpg" alt="Listing"></img>

                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Profile  