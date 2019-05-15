import React from 'react';
import {connect} from 'react-redux';
import { getSocket } from "./socket.js";
import { newChatMsg, chatMessages } from './actions';
import { Link } from "react-router-dom";
import axios from './axios';



export class Chat extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        // console.log("ComponentdidMount from chat here");

    }

    handleKeyDown(e) {
        if (e.which === 13) {
            console.log("ENTER DOWN");
            getSocket().emit("newChatMsg", e.target.value);
            e.target.value = "";
        }
    }

    handleKeyDownLike(messagesid) {
        console.log("LIKED", messagesid);
        axios.post("/addlike", { messagesid })
            .then(data => {
                console.log("LIKED data", data);

            })
            .catch(err => {
                console.log("ERROR LIKED: ", err);
            });



    }
    render (){
        const {chats} = this.props;
        console.log('this.props from Chat file', this.props);

        // if(!chats){
        //     return null;
        // }
        return (

            <div className="chat-textarea">
                <textarea placeholder="Leak here your information in some lines..." className="type-textarea" onKeyDown={this.handleKeyDown} />

                <h1><img className="lupa" src="/lupa.png" /> Latest leaks:</h1>
                <h3 className="Links-most"><Link to={`/most`}>Most</Link></h3>
                {this.props.state.messages && this.props.state.messages.map(messages => {
                    return (
                        <div className="messages" key={messages.id}>

                            <div className="chatmessages">
                                <h2 className ="chatmessages1">     {messages.messages} </h2>


                                <br />


                                <div className="name-user">     <Link to={`/user/${messages.userid}`}><img
                                    className="chat-new-message-img"
                                    src={messages.imgurl}
                                /></Link> {messages.firstname} {messages.lastname}

                                </div>
                                <button className="button" name="buttonText" onClick={()=>this.handleKeyDownLike(messages.id)}>
                                    <img className="tick" src="/tick.png" /> Endorse information
                                </button>
                                <h4 className="date-time">{messages.created_at}</h4>
                            </div>
                        </div>
                    );
                })}




            </div>
        );



    }
}

const mapStateToProps = state=> {
    return {state};
};
export default connect (mapStateToProps)(Chat);
