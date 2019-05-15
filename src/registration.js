import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';
import Login from './login';


export default class Registration extends React.Component {
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
        axios.post('/registration', {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
        }).then(({data}) => {
            if (data.success) {
                location.replace('/');
                console.log("Submit success");
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

                {this.state.error && <div className="error">Something went wrong! Please, try again! </div>}
                <input className="form" placeholder="First Name" name="firstname" type="text" onChange={e => this.handleChange(e)} />
                <input className="form" placeholder="Last Name" name="lastname" type="text" onChange={e => this.handleChange(e)} />
                <input className="form" placeholder="e-mail" name="email" type="email" onChange={e => this.handleChange(e)} />
                <input className="form" placeholder="Password" name="password" type="password" onChange={e => this.handleChange(e)} />
                <button className="addFriendbutton" type="submit" onClick={this.submit} >Register</button>
                <Link className="contenedor1" to="/login">Click here to Login</Link>

            </div>
        );
    }
}
