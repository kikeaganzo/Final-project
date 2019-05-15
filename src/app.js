import React from 'react';
import ProfilePic from './profilepic';
import Uploader from './uploader';
import axios from 'axios';
import Profile from "./profile";
import { BrowserRouter, Route } from 'react-router-dom';
import OtherProfile from './otherprofile';
import Friends from './friends';
import OnlineUsers from './onlineusers';
import Chat from './chat';
import Messages from './messages';
import Most from './most';
import Link from 'react';





export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
        this.setBio = this.setBio.bind(this);
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: true
        });
    }
    setImage(image) {
        this.setState({ image, uploaderIsVisible: false });


        this.setState({
            imgurl: image});
        console.log(' this.State: ',     this.state);
    }
    setBio(bio) {
        console.log("bio", bio);
        this.setState({
            bio: bio.bio
        });
    }
    componentDidMount() {
        axios.get('/user').then(({data}) => {
            console.log("data in getuser", data);
            this.setState(data);
        });
    }
    render() {
        console.log("Data:", this.state);
        console.log("Data 13:", this.state.firstname, this.state.lastname, this.state);
        // if (!this.state.userId) {
        //     return null;
        // }

        return (
            <div>

                <a href="/"> <img className="logo" src="/LEAK-LOGO.png" alt="My Social Network" /></a>


                <ProfilePic
                    imgurl={this.state.imgurl}
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    onClick={this.showUploader}
                />
                {this.state.uploaderIsVisible && <Uploader setImage={this.setImage} />}
                <a className="links-navbar" href="/onlineusers">Online users</a> |
                <a className="links-navbar" href="/friends"> My Friends</a> |
                <a className="links-navbar" href="/most"> Most liked</a> |
                <a className="links-navbar" href="/logout"> Log out</a>



                <BrowserRouter>

                    <div>

                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    id={this.state.id}
                                    firstname={this.state.firstname}
                                    lastname={this.state.lastname}
                                    onClick={this.showUploader}
                                    imgurl={this.state.imgurl}
                                    bio={this.state.bio}
                                    setBio={this.setBio}
                                />
                            )}
                        />



                        <Route path="/user/:id" component={OtherProfile} />
                        <Route path="/friends" component={Friends} />
                        <Route path="/onlineusers" component={OnlineUsers} />
                        <Route path="/chat" component={Chat} />
                        <Route path="/messages" component={Messages} />
                        <Route path="/most" component={Most} />



                    </div>
                </BrowserRouter>



            </div>


        );
    }
}
