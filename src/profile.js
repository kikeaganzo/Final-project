import React from "react";
import OnlineUsers from "./onlineusers";
import BioEditor from "./bioeditor";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        console.log("{this.state.firstname PROFILE}", this.props, this.props.imgurl);
        return (
            <div className="profile">
                <h1>   <img className="lupa" src="/detective.png" /> Welcome,  {this.props.firstname}  {this.props.lastname} </h1>
                <div  className="profile-pic-container">
                    <OnlineUsers />
                </div>
                <BioEditor bio={this.props.bio} setBio={this.props.setBio} />


            </div>
        );
    }
}
