import React from "react";
import axios from "./axios";

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
        this.setState = this.setState.bind(this);

    }

    //when the page loads. The button displays different message depending on the connection between users.
    componentDidMount() {
        console.log("componentDidMount otherUserId ", this.props.otherUserId);
        const getinitialStatus = axios.get('/get-initial-status/' + this.props.otherUserId).then(resp => {
            console.log("resp", resp);
            if (resp.data.rowCount == 0) {
                this.setState({ buttonText: "Add Friend" });

                console.log("getinitialStatus", getinitialStatus);
            } else if (resp.data.rows[0].accepted == false) {
                resp;
                this.setState({ buttonText: "Accept Friend request" });
            } else if (resp.data.rows[0].accepted == true) {
                resp;
                this.setState({ buttonText: "Delete friend" });
            } else if (resp.data.rows[0].accepted == false) {
                this.setState({ buttonText: "Cancel Friend request" });
            }

        });



    }

    handleClick() {
        const buttonText = this.state.buttonText;

        //clicking the button triggers an axios request that does an INSERT
        if (buttonText == "Add Friend") {
            console.log("BUtton Friend clicked");
            axios.post("/add-new-friend", {
                id: this.props.otherUserId});
            console.log("this.props.UserId handleClick ", this.props.UserId);

            this.setState({
                buttonText: "Cancel Friend request"
            });

        }

        else if (buttonText == "Cancel Friend request") {
            console.log("DELETE FRIEND clicked");
            axios.post("/delete-friend", {id: this.props.otherUserId});

            console.log("this.props.UserId handleClick ", this.props.UserId);

            this.setState({
                buttonText: "Add Friend"
            });

        }

        else if (this.state.buttonText == "Accept Friend request") {
            console.log("this.props.otherUserId", this.props.otherUserId);
            axios
                .post("/accept-friend", { Id: this.props.otherUserId })
                .then(data => {
                    if (data) {
                        this.setState({ buttonText: "Delete friend" });
                    }
                });
        }

        else if (buttonText == "Delete friend") {
            console.log("DELETE FRIEND clicked");
            axios.post("/delete-friend", {id: this.props.otherUserId});

            console.log("this.props.UserId handleClick ", this.props.otherUserId);

            this.setState({
                buttonText: "Add Friend"
            });

        }

    }

    render() {
        return (
            <div className="buttonText1">

                <button name="buttonText" onClick={this.handleClick}>
                    {this.state.buttonText}
                </button> <br />
            </div>
        );
    }
}
