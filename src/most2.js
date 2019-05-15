
import React from 'react';
import axios from './axios';


export default class Most extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};


    }



    componentDidMount(){
        console.log('componentDidMount OK');
        axios.get('/show-likes/').then(({data})=>{
            this.setState({data});
            console.log("MOST!!!!!!!!!!!!!!!!!!!!", data );
            console.log("this.state!!!!!!!!!!!!!!!!!!!", this.props.match.params.id );
        }
        );

    }
    render (){
        console.log("this.state.data", this.state.data);
        if(!this.state.data){
            return null;
        }
        return(

            <div className= "other-users-container">

                <h2>Most endorsed leaks: </h2>
                <h1> {this.props.messages} {this.state.lastname} </h1>
{this.state.data && this.state.data.map(each=>{ return (
                    <div key={each.id}>
);

    }
