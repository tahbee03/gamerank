import Navbar from '../Navbar/Navbar.jsx';
import './Profile.css';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsStar } from "react-icons/bs";
import { useState } from 'react';
import Review from '../Review/Review.jsx';
import StarRating from '../StarRating.jsx';

// import { BsStarHalf } from "react-icons/bs";
// import { BsStarFill } from "react-icons/bs";


function Profile() {
    const [createReviewModalShow, setCreateReviewModalShow] = useState(false);
    const user = sessionStorage.getItem("user");

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
                        <div className="name">{JSON.parse(user).username}</div>
                        <div className="edit-btn"><button>Edit Profile</button></div>
                    </div>
                    <div className="bar">
                        <td onClick={() => setCreateReviewModalShow(true)} >Review</td>                        
                        <td onClick={() => window.location.href = "#activity"}>Activity</td>
                        <td onClick={() => window.location.href = "#ranking"}>Ranking</td>
                        <td>Socials</td>
                        <td>Followers: 0</td>
                        <td>Following: 0</td>
                    </div>
                    <Review
                        show={createReviewModalShow}
                        onHide={() => setCreateReviewModalShow(false)}
                    />
                </div>

                <div className="section" id="activity">
                <div className="section-title">Recent Activity</div>
                <hr className="divider" />
                    <Row className="rct-act">
                        <Col className="act"><img src="default-avatar.jpg" alt="Activity"></img><StarRating /></Col>
                        <Col className="act"><img src="empty" alt="Activity"></img><StarRating /></Col>
                        <Col className="act"><img src="default-avatar.jpg" alt="Activity"></img><StarRating /></Col>
                        <Col className="act"><img src="default-avatar.jpg" alt="Activity"></img><StarRating /></Col>
                        <Col className="act"><img src="default-avatar.jpg" alt="Activity"></img><StarRating /></Col>
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

            </div>
        </ThemeProvider>
    )
}

export default Profile  