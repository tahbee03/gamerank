import Navbar from '../../components/Navbar/Navbar.jsx';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import defaultAvatar from '/default-avatar.jpg';
import { useState, useEffect } from 'react';
import Review from '../../components/Review/Review.jsx';
import Followers from '../../components/Followers/Followers.jsx';
import Following from '../../components/Following/Following.jsx';
import DeleteAccount from '../../components/DeleteAccount/DeleteAccount.jsx';
import { useParams } from "react-router-dom";
import './Profile.css';
import Ranking from '../../components/Ranking/Ranking.jsx';
const server = import.meta.env.VITE_BACKEND_SERVER; // URL to back-end server via environment variable


function Profile() {
    const { username } = useParams();
    const [createReviewModalShow, setCreateReviewModalShow] = useState(false);
    const [createFollowersModalShow, setCreateFollowersModalShow] = useState(false);
    const [createFollowingModalShow, setCreateFollowingModalShow] = useState(false);
    const [createDeleteAccountModalShow, setCreateDeleteAccountModalShow] = useState(false);
    const [rankings, setRankings] = useState([]);
    const [user, setUser] = useState(null);
    const currentUser = sessionStorage.getItem("user");
    const [loading, setLoading] = useState(false);

    // Fetch user's data to load on page
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const response = await fetch(`${server}users`);
            const data = await response.json();

            if (!response.ok) {
                console.log(data.error);
            }
            else {
                setUser(data.filter(u => u.username == username)[0]);
                // console.log(data.filter(u => u.username == username)[0]);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    // Fetch user's rankings to load on page when user data is loaded
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const response = await fetch(`${server}rankings`);
            const data = await response.json();

            if (!response.ok) {
                console.log(data.error);
            }
            else {
                setRankings(data.filter(r => r.author == user._id));
                // console.log(data.filter(r => r.author == user._id));
            }
            setLoading(false);
        }
        if (user != null) fetchData();
    }, [user]);

    async function handleFollow() {
        try {
            const response = await fetch(`${server}users/follow/${JSON.parse(currentUser).id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userIdToFollow: user._id })
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data);
            else {
                window.sessionStorage.setItem("user", JSON.stringify(data));
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleUnfollow() {
        try {
            const response = await fetch(`${server}users/unfollow/${JSON.parse(currentUser).id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userIdToUnfollow: user._id })
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data);
            else {
                window.sessionStorage.setItem("user", JSON.stringify(data));
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xxs"
        >
            <div>
                <Navbar />
                {(!user) && (
                    <p>Loading...</p>
                )}
                {(user) && (
                    <>
                        <div className="top">
                            <div className="profile">
                                <img src={defaultAvatar} alt="Avatar"></img>
                                <div className="name">{user.username}</div>
                                {(currentUser != null) && (JSON.parse(currentUser).username == username) && (
                                    <>
                                        <div className="edit-btn"><button>Edit Profile</button></div>
                                        <div className="delete-btn" onClick={() => setCreateDeleteAccountModalShow(true)}><button>Delete Account</button></div>
                                    </>
                                )}
                            </div>
                            <div className="bar">
                                {(currentUser != null) && (JSON.parse(currentUser).username == username) && (
                                    <td className="clickable" onClick={() => setCreateReviewModalShow(true)}>Review</td>
                                )}
                                {(currentUser != null) && (JSON.parse(currentUser).username != username) && !user.following && (
                                    <td className="clickable" onClick={handleFollow}>Follow</td>
                                )}
                                {(currentUser != null) && (JSON.parse(currentUser).username != username) && user.following && (
                                    JSON.parse(currentUser).following.includes(user._id) ? (
                                        <td className="clickable" onClick={handleUnfollow}>Unfollow</td>
                                    ) : (
                                        <td className="clickable" onClick={handleFollow}>Follow</td>
                                    )
                                )}
                                <td className="clickable">Activity</td>
                                <td className="clickable">Socials</td>
                                <td className="clickable" onClick={() => setCreateFollowersModalShow(true)}>Followers: {user.followers.length}</td>
                                <td className="clickable" onClick={() => setCreateFollowingModalShow(true)}>Following: {user.following.length}</td>
                            </div>
                            <Review
                                show={createReviewModalShow}
                                onHide={() => setCreateReviewModalShow(false)}
                            />
                            <Followers
                                show={createFollowersModalShow}
                                onHide={() => setCreateFollowersModalShow(false)}
                            />
                            <Following
                                show={createFollowingModalShow}
                                onHide={() => setCreateFollowingModalShow(false)}
                            />
                            <DeleteAccount
                                show={createDeleteAccountModalShow}
                                onHide={() => setCreateDeleteAccountModalShow(false)}
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
                                            id={r._id}
                                            author={r.author}
                                            gameID={r.gameID}
                                            picurl={r.picUrl}
                                            title={r.title}
                                            rank={r.rank}
                                            date={r.createdAt}
                                            spoiler={r.spoiler}
                                            desc={r.desc}
                                            canDelete={(currentUser != null) && (JSON.parse(currentUser).username == username)}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </ThemeProvider>
    )
}

export default Profile  