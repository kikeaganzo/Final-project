import React from 'react';
import { Link } from 'react-router';

const ProfilePicOtherUser = ( props ) => {
    const { src, alt, id } = props;
    return (
        <div >
            <Link to={`/user/${id}`}>
                <img src={src} alt={alt}/>
            </Link>
        </div>
    );
};

export default ProfilePicOtherUser;
