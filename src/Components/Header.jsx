// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth} from '../utils/AuthContext'
// const Header = () => {
//     const navigate = useNavigate()
//     const {user,logoutUser} = useAuth()
    

//     // const logoutClick = () => {
//     //     navigate('/login')
//     // }

//   return (
//     <div className="header">

//         <div>
//             <Link id="header-logo" to="/">Dee'Auth</Link>
//         </div>

//         <div className="links--wrapper">
//             {user ? (
//                 <>
//                 <Link to="/" className="header--link">Home</Link>
//                 <Link to="/profile" className="header--link">Profile</Link>

//                 <button onClick={logoutUser} className="btn">Logout</button>
//             </>
//             ):(
//                 <>
//                 <Link className="btn" to="/login">Login</Link>
//             </>
//             )}
            

            
//         </div>
//     </div>
//   )
// }

// export default Header

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { Storage } from 'appwrite';
import { client } from '../appwriteConfig'; // Ensure client is correctly imported

const Header = () => {
    const navigate = useNavigate();
    const { user, logoutUser } = useAuth();
    const [profileImage, setProfileImage] = useState('/default-profile.png');
    const storage = new Storage(client);

    // Define the fetchProfileImage function
    const fetchProfileImage = async (fileId) => {
        try {
            const fileUrl = storage.getFilePreview('677644b5000aab5d0b4a', fileId); // Replace 'user_photos' with your bucket ID
            setProfileImage(fileUrl.href);
        } catch (err) {
            console.error("Error fetching profile image:", err.message);
        }
    };

    // Fetch the profile image on component mount
    useEffect(() => {
        const fileId = '677646cc002a4092be82'; // Replace with how you store the file ID in user data
        if (fileId) {
            fetchProfileImage(fileId);
        }
    }, [user]);

    return (
        <div className="header">
            <div>
                <Link id="header-logo" to="/">Dee'Auth</Link>
            </div>

            <div className="links--wrapper">
                {user ? (
                    <>
                        <Link to="/" className="header--link">Home</Link>
                        <Link to="/profile" className="header--link">
                            <div className="profile">
                                <img 
                                    src={profileImage} 
                                    alt="Profile" 
                                    style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
                                />
                                <span>Profile</span>
                            </div>
                        </Link>
                        <button onClick={logoutUser} className="btn">Logout</button>
                    </>
                ) : (
                    <>
                        <Link className="btn" to="/login">Login</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
