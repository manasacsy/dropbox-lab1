import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';
import * as API from '../api/API';
import Login from "./Login";
import Message from "./Message";
import HomePage from "./HomePage";
import Header from "./Header";
import SignUp from "./SignUp";
class LoginPage extends Component {

    state = {
        isLoggedIn: false,
        message: '',
        username: ''
    };

    handleSubmit = (userdata) => {
        API.doLogin(userdata)
            .then((res) => {
            console.log(res)
            
                if (res.data && res.data.userid !== undefined) { 
                    reactLocalStorage.set('userid', res.data.userid);
                    this.props.history.push("/home");
                } else {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };
    handleSignup = (userdata) => {
     API.doSignup(userdata)
                .then((res) => {
                   if (res.data.inserId !== 'undefined') { 
                         reactLocalStorage.set('userid', res.data.insertId);
                        this.props.history.push("/home");
                    } else{
                        this.setState({
                            isLoggedIn: false,
                            message: "Wrong username or password. Try again..!!"
                        });
                    }
                });
    };
    render() {
        return (
            <div className="container-fluid">
                <Route exact path="/" render={() => (
                    <div>
                        <Header/>
                        <Login isLoggedIn= {this.state.isLoggedIn} handleSubmit={this.handleSubmit}/>
                    </div>
                )}/>
                <Route exact path="/home" render={() => (
                    <HomePage username={this.state.username}/>
                )}/>
                <Route exact path="/signup" render={() => (
                    <SignUp handleSignup={this.handleSignup}/>
                )}/>
            </div>
        );
    }
}

export default withRouter(LoginPage);