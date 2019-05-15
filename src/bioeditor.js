import React from 'react';
import axios from './axios';
import Chat from './chat';


export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.addBio = this.addBio.bind(this);
        this.showBioEditor=this.showBioEditor.bind(this);
    }

    handleChange(event) {
        console.log("event.target.name", this.bio);
        this[event.target.name] = event.target.value;

    }

    showBioEditor(){
        this.setState({ BioEditorIsVisible: true});

    }

    addBio(bio) {
        console.log("This is bio", bio);
        axios
            .post("/addbio", { bio })
            .then(data => {
                console.log("submitBio data", data.data.rows[0]);
                this.props.setBio(data.data.rows[0]);
                this.setState({ BioEditorIsVisible: false});
            })
            .catch(err => {
                console.log("ERROR addBio: ", err);
            });


    }
    render() {
        console.log("Bio Editor here");
        return(
            <div className="bio-container">
                <div className="bio-text" >{ this.props.bio }</div>

                {!this.props.bio &&  <button className="add-bio-button"  onClick={this.showBioEditor}>  Add Bio </button> }
                {this.props.bio &&  <button   className="edit-bio-button" onClick={this.showBioEditor}> Edit Bio </button> }

                {this.state.BioEditorIsVisible && (
                    <div>
                        <textarea name="bio" onChange={this.handleChange} id="bio" />
                        <button name="bio" onClick={() => { this.addBio(this.bio);
                        }} >Change Bio</button> </div>
                )}

                <div className="chat-inapp">

                    <Chat />
                </div>

            </div>






        );
    }


}
