import Navbar from '../Navbar.jsx';
import './Profile.css';

function Profile() {
    return (
        <div>
        <Navbar/>
        <div className="profile">
        <img src="default-avatar.jpg" alt="Avatar"></img>
        <div className="name">Name</div>
        <div className="edit-btn"><button>Edit Profile</button></div>
        </div>
        </div>
        
    )
}

export default Profile  