import React, {Component} from 'react';

import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class TopMenu extends Component {
    constructor(props){
        super(props)
    }
    logout = () =>{
        /*this.props.history.push("/");*/
        window.location.href = "http://localhost:3000/";
}
    render() {
        var heading;
         if(this.props.changeContent == 'homecontent'){
            heading = 'Home';
        }  
         if(this.props.changeContent == 'filecontent'){
            heading = 'Dropbox';
        }  
        if(this.props.changeContent == 'userinfo'){
           heading = 'Personal account';
           }
        return (
            <div className="top-menu">
            <div className="pull-left pos-fixed">
            {heading}
            </div>
            <div className="pull-right">
            <span className="logout" onClick={this.logout}>Logout</span>
            </div>
             </div>
        );
    }
}

export default TopMenu;