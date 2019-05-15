
import React from 'react';
import axios from './axios';
import FriendButton from './friendbutton';
import { Link } from "react-router-dom";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }



    componentDidMount(){
        console.log('componentDidMount OK');
        axios.get('/show-likes').then(({data})=>{
            this.setState({data:data});
            console.log("data from DidMount Other profile",data );

        }
        );

    }
    render (){
        console.log("this.state", this.state);
        return(

            <div className= "messages">
                <h1><img className="lupa" src="/lupa.png" />  Most endorsed leaks:</h1>
                <h3 className="Links-most"><Link to={`/`}>All leaks</Link></h3>
                {this.state.data && this.state.data.map(
                    each => {
                        return (
                            <div className="chatmessages2" key={each.id} >
                                <div className="chatmessages1">
                                    <h2 className ="chatmessages1">  {each.messages} </h2>

                                    <div className="name-user">    <img
                                        className="chat-new-message-img"
                                        src={each.imgurl}
                                    /> {each.firstname} {each.lastname}

                                    </div>


                                </div>
                            </div>

                        );
                    }
                )
                }


            </div>
        );

    }
}
