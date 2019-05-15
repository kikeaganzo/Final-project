import React from 'react';

export default function ProfilePic({ firstname, lastname, onClick, imgurl}) {
    const image = imgurl || "/icon-default.jpg";
    return (
        <img className="userpic"
            src={image}
            alt={`${firstname} ${lastname}`}
            onClick={onClick}
        />
    );
}
