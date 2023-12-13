import Navbar from '../Navbar/Navbar.jsx';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { BsStar } from "react-icons/bs";
// import { BsStarHalf } from "react-icons/bs";
// import { BsStarFill } from "react-icons/bs";
import { useState, useEffect } from 'react';
import Review from '../Review/Review.jsx';
import StarRating from '../StarRating.jsx';
import './Profile.css';
import Ranking from '../Ranking/Ranking.jsx';
const server = import.meta.env.VITE_BACKEND_SERVER; // URL to back-end server via environment variable


function Profile() {
    const [createReviewModalShow, setCreateReviewModalShow] = useState(false);
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = sessionStorage.getItem("user");

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const response = await fetch(`${server}rankings`);
            const data = await response.json();

            if (!response.ok) {
                console.log(data.error);
            }
            else {
                // console.log(data);
                // console.log(data.filter(r => r.author == JSON.parse(user).id));
                setRankings(data.filter(r => r.author == JSON.parse(user).id));
            }
            setLoading(false);
        }

        fetchData();
    }, []);

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

                <div className="section" id="ranking">
                    <p className="section-title">Recent Rankings</p>
                    <hr className="divider" />
                    <div className="row">
                        {(loading) && (
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        )}
                        {!(loading) && (rankings.length == 0) && (
                            <p>No rankings!</p>
                        )}
                        {!(loading) && (rankings.length > 0) && (
                            rankings.map(r => (
                                <Ranking
                                    picurl={r.picUrl}
                                    title={r.title}
                                    rank={r.rank}
                                    date={r.createdAt}
                                    spoiler={r.spoiler}
                                    desc={r.desc}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Profile  