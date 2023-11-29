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
                <div>
                    <div className="profile">
                    <img src="default-avatar.jpg" alt="Avatar"></img>
                    <div className="name">Name</div>
                    <div className="edit-btn"><button>Edit Profile</button></div>
                    </div>
                    <div className="bar">
                        test
                    </div>
                    
                </div>

                <div className="section">
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

                <div className="section">
                <div className="section-title">Recent Rankings</div>
                <hr className="divider" />
                </div>            

                <div className="section">
                <div className="section-title">Recent Lists</div>
                <hr className="divider" />
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Profile  