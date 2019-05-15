import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import Registration from './registration';
import Login from './login';
import { Link } from 'react-router-dom';

export default class Welcome extends React.Component  {  constructor(props) {
    super(props);
    this.state = {};
}
render() {
    return (
        <div className="welcome">
            <img className="logo-main" src="LEAK-LOGO.png" />


            <div className="contenedor555">
                <h1 className="textoscroll">There is no democracy without journalism...<span>&#160;</span></h1>
            </div>

            <div className="text-welcome">
            Leak it out is a free online platform to leak compromised information anonymously to journalists.
            </div>

            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>


        </div>
    );
}
}
