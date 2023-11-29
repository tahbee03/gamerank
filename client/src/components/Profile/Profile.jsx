import Navbar from '../Navbar/Navbar.jsx';
import './Profile.css';

function Profile() {
    const user = sessionStorage.getItem("user");

    return (
        <div>
            <Navbar />
            <div className="profile">
                <img src="default-avatar.jpg" alt="Avatar"></img>
                <div className="name">{JSON.parse(user).username}</div>
                <div className="edit-btn"><button>Edit Profile</button></div>
            </div>
        </div>

    )
}

export default Profile  