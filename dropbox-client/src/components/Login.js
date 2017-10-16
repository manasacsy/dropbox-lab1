import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link,withRouter} from 'react-router-dom';

class Login extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    };

    state = {
        emailid: '',
        password: ''
    };

    componentWillMount(){
        this.setState({
            emailid: '',
            password: '',
            emailEmpty:false,
            passwordEmpty:false,
            emailIncorrect:false,
            loginFail : false
        });
    }

checkCredentials =() =>  {
    var valid = true;
    var emailid = this.state.emailid;
    var password = this.state.password;
    var emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    var obj = this.state;
    if(emailid ===''){
       valid = false;
        obj.emailEmpty = true;
        this.setState(obj);
        }
    else{
        obj.emailEmpty = false;
        this.setState(obj);
    }
    
    if(emailRegex.test(emailid) ===false && valid ===true){
       console.log(emailRegex.test(emailid) + "email")
       valid = false;
        obj.emailIncorrect = true;
        this.setState(obj);
       }   
    else{
        obj.emailIncorrect = false;
        this.setState(obj);
    }
    if(password ==='' && valid ===true){
       valid = false;
        obj.passwordEmpty = true;
        this.setState(obj);
        } 
    else{
        obj.passwordEmpty = false;
        this.setState(obj);
    }
    if(valid){
        this.props.handleSubmit(this.state);
        if(this.props.isLoggedIn ===false){
        obj.loginFail = true;
        this.setState(obj);
           }
       }
}

    render() {
        return (
            <div className="row justify-content-md-center">
            <div className="col-md-6">
            <img src="https://cfl.dropboxstatic.com/static/images/empty_states/rebrand_m1/sign-in-illo@2x-vflh_wJFN.png"  className="login-imagine-size"/>
            </div>
                <div className="col-md-4">
                    <form>
                        <div className="form-group">
                           <p className="padding-top-20 pull-left">Sign in</p>
           <p><span className="pull-right padding-top-20">or <Link to="/signup"> create an account</Link></span></p>
            <div><button data-is-popup="true" className="abc"><div>Sign in with Google</div></button></div> 
                        </div><span>or</span>
                        <div className="form-group padding-top-20">
            <span className="error-message">{this.state.emailEmpty ? 'Please enter your email' :''}</span>
<span className="error-message">{this.state.emailIncorrect ?'Please enter valid email id':''}</span>
            <span className="error-message">{this.state.loginFail ?'Invalid email or password':''}</span>
                            <input
                                className="form-control"
                                type="email"
                                label="Username"
                                placeholder="Email"
                                required
                                value={this.state.emailid}
                                onChange={(event) => {
                                    this.setState({
                                        emailid: event.target.value
                                    });
                                }}
                            />

                        </div>

                        <div className="form-group padding-top-20">
                            <span className="error-message">{this.state.passwordEmpty ? 'Please enter your password' : ''}</span>
                            <input
                                className="form-control"
                                type="password"
                                label="password"
                                required
                                placeholder="Password"
                                value={this.state.password}
                                onChange={(event) => {
                                    this.setState({
                                        password: event.target.value
                                    });
                                }}
                            />

                        </div>
                        <div className="form-group">
                            
                            <button
                                className="btn btn-primary pull-right"
                                type="button"
                                onClick={this.checkCredentials}>
                                Sign in
                            </button>
                        </div>

                    </form>
<div className="padding-top-50">
<div className="login-promo-upgrade-dropbox">Get Dropbox on your desktop — <a href="install?src=login">download now</a></div></div>
                </div>
            </div>
        );
    }
}

export default Login;