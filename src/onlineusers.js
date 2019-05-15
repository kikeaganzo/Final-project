import React from 'react';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";


export class OnlineUsers extends React.Component {
    constructor(props){
        super(props);
    }
    render (){
        const {onlineUsers} = this.props.state;
        console.log('this.props from Onlineusers file', this.props.state);

        if(!onlineUsers){
            return null;
        }
        return (
            <div className="onlineusers_container" ><h2> Users online</h2>
                {this.props.state.onlineUsers && this.props.state.onlineUsers.map(person=>{
                    return(
                        <div className="wannabes-container2" key={person.id}><p />
                            <h2><Link to={`/user/${person.id}`}>
                                <img className="pic-users-online" src= {person.imgurl}/></Link> <img className="online-gif" src="/solid-blue-pulse-light.gif" /> {person.firstname} {person.lastname} </h2>


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
export default connect (mapStateToProps)(OnlineUsers);
