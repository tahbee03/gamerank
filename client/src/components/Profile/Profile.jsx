import Navbar from '../Navbar.jsx';
import './Profile.css';

function Profile() {
    return (
        <div>
            <Navbar/>
            <div>
                <div className="profile">
                <img src="default-avatar.jpg" alt="Avatar"></img>
                <div className="name">Name</div>
                <div className="edit-btn"><button>Edit Profile</button></div>
                </div>
                <div className="bar">
                    hi
                </div>
                
            </div>

            <div className="activity">
            <div className="rct-act">Recent Activity</div>
            <hr className="divider" />
            </div>
            

        </div>
        
    )
}

export default Profile  