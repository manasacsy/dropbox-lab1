import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link,withRouter} from 'react-router-dom';


class SignUp extends Component {
    
    static propTypes = {
        handleSignup: PropTypes.func.isRequired
    };

    state = {
            firstname: '',
            lastname: '',
            emailid: '',
            password: '',
            tc: '',
            firstnameEmpty : false,
            lastnameEmpty: false,
            emailEmpty:false,
            passwordEmpty:false,
            emailIncorrect:false
    };

    componentWillMount(){
        this.setState({
            firstname: '',
            lastname: '',
            emailid: '',
            password: '',
            tc: '',
            firstnameEmpty : false,
            lastnameEmpty: false,
            emailEmpty:false,
            passwordEmpty:false,
            emailIncorrect:false
        });
    }
register =() =>{
     var valid = true;
    var emailid = this.state.emailid;
    var password = this.state.password;
    var firstname = this.state.firstname;
    var lastname = this.state.lastname;
    var emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    var obj = this.state;
     if(firstname ===''){
       valid = false;
        obj.firstnameEmpty = true;
        this.setState(obj);
        }
    else{
        obj.firstnameEmpty = false;
        this.setState(obj);
    }
     if(lastname ==='' && valid ===true){
       valid = false;
        obj.lastnameEmpty = true;
        this.setState(obj);
        }
    else{
        obj.lastnameEmpty = false;
        this.setState(obj);
    }
    if(emailid ==='' && valid ===true){
       valid = false;
        obj.emailEmpty = true;
        this.setState(obj);
        }
    else{
        obj.emailEmpty = false;
        this.setState(obj);
    }
    
    if(emailRegex.test(emailid) ===false && valid ===true){
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
    if(document.getElementById("tc").checked  ===false && valid ===true){
        valid = false;
       obj.tc = true;
        this.setState(obj);
       }
    else{
        obj.tc = false;
        this.setState(obj);
    }
    if(valid ===true){
        /* var ciphertext = CryptoJS.AES.encrypt(this.state.password, 'secret key 123');
        var a = this.state;
        a.password = ciphertext;*/
        console.log(this.state)
       this.props.handleSignup(this.state);
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
             
                           <p className="padding-top-20 pull-left">Create an account</p>
           <p><span className="pull-right padding-top-20">or <Link to="/"> log in</Link></span></p>
                        </div>
             <div className="form-group padding-top-50">
            <span className="error-message">{this.state.firstnameEmpty ? 'Please enter your first name' : ''}</span>
                            <input
                                className="form-control"
                                type="text"
                                label="firstname"
                                placeholder="First name"
                                value={this.state.firstname}
                                onChange={(event) => {
                                    this.setState({
                                        firstname: event.target.value
                                    });
                                }}
                            />
</div>
 <div className="form-group">
      <span className="error-message">{this.state.lastnameEmpty ? 'Please enter your last name' : ''}</span>
                            <input
                                className="form-control"
                                type="text"
                                label="lastname"
                                placeholder="Last name"
                                value={this.state.lastname}
                                onChange={(event) => {
                                    this.setState({
                                        lastname: event.target.value
                                    });
                                }}
                            />
</div>
                        <div className="form-group">
                            <span className="error-message">{this.state.emailEmpty ? 'Please enter your email' :''}</span>
<span className="error-message">{this.state.emailIncorrect ?'Please enter valid email id':''}</span>
            <span className="error-message">{this.state.loginFail ?'Invalid email or password':''}</span>
                            <input
                                className="form-control"
                                type="text"
                                label="emailid"
                                placeholder="Email"
                                value={this.state.emailid}
                                onChange={(event) => {
                                    this.setState({
                                        emailid: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                             <span className="error-message">{this.state.passwordEmpty ? 'Please enter your password' : ''}</span>
                            <input
                                className="form-control"
                                type="password"
                                label="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={(event) => {
                                    this.setState({
                                        password: event.target.value
                                    });
                                }}
                            />
                        </div>
<span className="error-message">{this.state.tc ? 'Please agree to the terms of service' : ''}</span>
                        <div className="form-group">
                             
                            <input type="checkbox" id="tc" value={this.state.tc} name="tc"/> I agree to Dropbox terms.
                            <button
                                className="btn btn-primary pull-right"
                                type="button"
                                onClick={this.register}>
                                Create an account
                            </button>
                        </div>

                    </form>
<div className="padding-top-50"><button data-is-popup="true" className="abc"><div>Sign in with Google</div></button></div> 
<div className="padding-top-50">
<div className="login-promo-upgrade-dropbox">Get Dropbox on your desktop — <a href="install?src=login">download now</a></div></div>
                </div>
            </div>
        );
    }
}

export default SignUp;