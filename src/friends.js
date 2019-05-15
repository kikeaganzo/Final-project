import React from 'react';
import { connect } from 'react-redux';
import { getFriendsWannabes, deleteFriend, acceptFriend } from './actions';
import { Link } from "react-router-dom";

class Friends extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log("ComponentdidMount from friends here");
        this.props.dispatch(getFriendsWannabes());
    }

    render() {
        console.log("Wanabees",  this.props.wannabes);
        console.log("Friends",  this.props.friends);
        //
        const { friends, wannabes } = this.props;

        if (!friends && !wannabes) {
            return null;
        } else
        {
            return (
                <div className="friends-container"><h1>Requests</h1>
                    <div className="wannabes-container">{this.props.wannabes && this.props.wannabes.map(person => {
                        return ( <div className="wana-con" key={person.id}>
                            <h2 className="wana-con2">{person.firstname} {person.lastname}</h2>

                            <Link to={`/user/${person.id}`}>
                                <img className="pic-friends-and-wannabes" src={person.imgurl} /></Link>
                            <button onClick={() =>this.props.dispatch(acceptFriend(person.id))}> ACCEPT FRIEND </button>
                        </div>
                        );
                    }

                    ) }
                    </div>

                    <div className="already-friends-container"><h1>Friends</h1>{this.props.friends && this.props.friends.map(person => {
                        return ( <div className="already-friends-container2" key={person.id}>
                            <h2 className="wana-con2">{person.firstname} {person.lastname}</h2>
                            <Link to={`/user/${person.id}`}>
                                <img className="pic-friends-and-wannabes" src={person.imgurl} /></Link>

                            <button onClick={() =>this.props.dispatch(deleteFriend(person.id))}> DELETE FRIEND </button>
                        </div>
                        );
                    }

                    ) }
                    </div>
                </div>
            );
        }
    }
}
const mapStateToProps = state => {
    console.log("State in Friends", state.getFriendsWannabes);
    return {
        wannabes:
        state.getFriendsWannabes &&
        state.getFriendsWannabes.filter(wannabees => wannabees.accepted == false),
        friends:
        state.getFriendsWannabes &&
        state.getFriendsWannabes.filter(friends => friends.accepted == true)
    };
};

export default connect(mapStateToProps)(Friends);
