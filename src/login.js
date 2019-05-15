import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Registration from './registration';
import { Link } from 'react-router-dom';
import axios from "./axios";




export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;



        // this.setState({
        //     [e.target.name]: e.target.value
        // });
    }
    submit(e) {
        e.preventDefault();
        axios.post('/login', {
            email: this.email,
            password: this.password,
        }).then(({data}) => {
            if (data.success) {
                location.replace('/');
            } else {
                this.setState({
                    error: true
                });
            }
        });
    }
    render() {
        return (
            <div className="form2">
                <form>
                    {this.state.error && <div className="error">Something went wrong! Please, try again! </div>}
                    <input className="form" placeholder="e-mail" name="email" onChange={e => this.handleChange(e)} />
                    <input className="form" placeholder="password"  type="password" name="password" onChange={e => this.handleChange(e)} />
                    <button className="addFriendbutton" type="submit" onClick={this.submit} >Login</button>
                </form> </div>
        );
    }
}
