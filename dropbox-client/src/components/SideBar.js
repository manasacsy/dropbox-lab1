import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

class SideBar extends Component {
    componentWillMount(){
        /*this.setState({
            username : this.props.username
        });*/
        //document.title = `Welcome, ${this.state.username} !!`;
    }

    componentDidMount(){
        //document.title = `Welcome, ${this.state.username} !!`;
    }

    render(){
        return(
            <div>
            <ul className="list-style-none">
            <li><img className="height" src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_m1-vfleInWIl.svg" alt=""/>
            </li>
            <span>Home</span>
            <li>
            </li>
            <span>Files</span>
            <li>
            </li>
            <li>
            <span>Paper</span>
            </li>
            </ul>
            </div>
        )
    }
}

export default withRouter(SideBar);