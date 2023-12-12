import Navbar from '../Navbar/Navbar.jsx';
import './Profile.css';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { BsStar } from "react-icons/bs";
// import { BsStarHalf } from "react-icons/bs";
// import { BsStarFill } from "react-icons/bs";
import Ranking from '../Ranking/Ranking.jsx';


function Profile() {
    const user = sessionStorage.getItem("user");

    return (
        <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xxs"
        >
            <div>
                <Navbar />
                <div className="top">
                    <div className="profile">
                        <img src="default-avatar.jpg" alt="Avatar"></img>
                        <div className="name">{JSON.parse(user).username}</div>
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

                {/* <div className="section" id="activity">
                    <p className="section-title">Recent Activity</p>
                    <hr className="divider" />
                    <Row className="rct-act">
                        <Col className="act"><img src="default-avatar.jpg" alt="Activity"></img><BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></Col>
                        <Col className="act"><img src="asdkasdaergo" alt="Activity"></img><BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></Col>
                        <Col className="act"><img src="default-avatar.jpg" alt="Activity"></img><BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></Col>
                        <Col className="act"><img src="default-avatar.jpg" alt="Activity"></img><BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></Col>
                        <Col className="act"><img src="default-avatar.jpg" alt="Activity"></img><BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></Col>
                    </Row>
                </div> */}

                <div className="section" id="ranking">
                    <p className="section-title">Recent Rankings</p>
                    <hr className="divider" />
                    <div className="row">
                        <Ranking
                            picurl={"https://assets1.ignimgs.com/2019/05/17/pokemon-ruby---button-sm-1558057647902.jpg"}
                            title={"Pokémon Ruby"}
                            rank={4}
                            date={"12/8/23"}
                            spoiler={false}
                            desc={"I could play this for hours!"}
                        />
                        <Ranking
                            picurl={"https://cdn.cloudflare.steamstatic.com/steam/apps/319510/ss_b5bf2127754d4e9bf6ab1c94e599d47f93a6708a.1920x1080.jpg?t=1666889251"}
                            title={"Five Nights at Freddy's"}
                            rank={5}
                            date={"12/8/23"}
                            spoiler={false}
                            desc={"Amazing game!"}
                        />
                        <Ranking
                            picurl={"https://cdn2.unrealengine.com/fortnite-chapter-4-og-overview-page-key-art-bg-1920x1080-1fbc3a1c0297.jpg"}
                            title={"Fortnite"}
                            rank={2}
                            date={"12/8/23"}
                            spoiler={true}
                            desc={"Are you kidding me?"}
                        />
                    </div>
                </div>

                {/* TODO: Create a form so users can create their own rankings. Users should also be able to remove them. */}

                {/* <div className="section" id="listing">
                    <p className="section-title">Recent Lists</p>
                    <hr className="divider" />
                    <div className="listing">
                        <img src="default-avatar.jpg" alt="Listing"></img>
                    </div>
                </div> */}
            </div>
        </ThemeProvider>
    )
}

export default Profile  