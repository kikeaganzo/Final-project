import React from 'react';
import {connect} from 'react-redux';
import { getSocket } from "./socket.js";
import { newChatMsg, chatMessages } from './actions'


export class Messages extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        // console.log("ComponentdidMount from chat here");

    }


    handleKeyDown(e) {
        if (e.which === 13) {
            console.log("ENTER DOWN");
            getSocket().emit("newMessagePrivate", e.target.value);
            e.target.value = "";
        }
    }
    render (){
        const {chats} = this.props;
        console.log('this.props from Chat file', this.props);

        // if(!chats){
        //     return null;
        // }
        return (

            <div className="chat-textarea">
                <textarea  className="type-textarea" onKeyDown={this.handleKeyDown} />
                {this.props.state.messages && this.props.state.messages.map(messages => {
                    return (
                        <div className="messages" key={messages.id}>

                            <div className="chatmessages">
                                <li>     {messages.messages}</li>
                            </div>

                            <h2>     <img
                                className="chat-new-message-img"
                                src={messages.imgurl}
                            /> {messages.firstname} {messages.lastname} </h2>

                            <h4>{messages.created_at}</h4>
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
export default connect (mapStateToProps)(Messages);
