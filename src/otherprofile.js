
import React from 'react';
import axios from './axios';
import FriendButton from './friendbutton';

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }



    componentDidMount(){
        console.log('componentDidMount OK');
        axios.get('/users/' + this.props.match.params.id).then(({data})=>{
            console.log("data from DidMount Other profile",data[0] );
            if( data.sessionId == this.props.match.params.id){
                this.props.history.push('/');
            } else{
                this.setState(data);

            }
        }
        );

    }
    render (){
        return(

            <div className= "other-users-container">

                <h2>Share information with </h2>
                <h1> {this.state.firstname} {this.state.lastname} </h1>
                <FriendButton
                    otherUserId = {this.props.match.params.id}/>
                <br/>
                <img className= "profile-pic-container" src= {this.state.imgurl}/>
                <br/>
                <h3>{this.state.bio} </h3>

                <button className="button" name="buttonText" onClick={()=>this.handleKeyDownLike(messages.id)}>
                    <img className="tick" src="/e.mail2.png" /> E-mail
                </button>

            </div>
        );

    }
}
