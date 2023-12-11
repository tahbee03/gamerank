import Navbar from '../Navbar/Navbar.jsx';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import Review from '../Review/Review.jsx';
import StarRating from '../StarRating.jsx';
import './Profile.css';


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

            </div>
        </ThemeProvider>
    )
}

export default Profile  