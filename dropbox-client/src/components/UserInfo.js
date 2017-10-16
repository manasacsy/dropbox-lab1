import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as API from '../api/API';

class UserInfo extends Component {
state={
    userid: 1,
    firstname: 'none',
    lastname: 'none',
    emailid: 'none',
    work: 'none',
    education: 'none',
    contactinfo: 'none',
    lifeevents: 'none',
    interests: 'none' 
    }
 componentWillMount(){
      var self = this;
      var a = this.state;
 
    API.getUserInfo(1).then((data) => {
        a.firstname = data[0].firstname;
        a.lastname = data[0].lastname;
        a.emailid = data[0].emailid;
        a.work = data[0].work;
        a.education = data[0].education;
        a.contactinfo = data[0].contactinfo;
        a.lifeevents = data[0].lifeevents; 
        a.interests = data[0].interests;
        console.log(a)
        this.setState(a);                                 
      });
 }
    render() {
        return (
            <div className="text-align-left pad-30">
            <div>
            <span className="user-info-head">USER OVERVIEW</span>
            <p className="user-info-content padding-top-20">
            <span className="user-info-style">First Name</span>
            <span className="user-info-value">{this.state.firstname}</span>
            </p>
            <p>
            <span className="user-info-style">Last Name</span>
            <span className="user-info-value">{this.state.lastname}</span>
            </p>
            </div>
             <div>
            <span className="user-info-head">WORK AND EDUCATION</span>
            <p className="user-info-content padding-top-20">
            <span className="user-info-style">Work</span>
            <span className="user-info-value">{this.state.work}</span>
            </p>
            <p>
            <span className="user-info-style">Education</span>
            <span className="user-info-value">{this.state.education}</span>
            </p>
            </div>
            <div>
            <span className="user-info-head">CONTACT INFORMATION</span>
            <p className="user-info-content padding-top-20">
            <span className="user-info-style">Email Id</span>
            <span className="user-info-value">{this.state.emailid}</span>
            </p>
            <p>
            <span className="user-info-style">Phone Number</span>
            <span className="user-info-value">{this.state.contactinfo}</span>
            </p>
            </div>
            <div>
            <span className="user-info-head">INTERESTS</span>
            <p className="padding-top-20">
            <span className="user-info-style">Hobbies</span>
            <span className="user-info-value">{this.state.interests}</span>
            </p>
            </div>
            </div>
        );
    }
}

export default UserInfo;