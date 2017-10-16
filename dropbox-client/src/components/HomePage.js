import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import SideBar from "./SideBar";
import Content from "./Content";
import TopMenu from "./TopMenu";

class HomePage extends Component {
    state = {
        changeContent : 'homecontent'
    };

    componentWillMount(){
        this.setState({
           changeContent : 'homecontent'
        });
    }
    render(){
        var sideMenuBar;
        sideMenuBar = <div className="pos-fixed  text-align-left">
            <ul className="list-style-none padding-top-20">
            <li><img className="height" src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_m1-vfleInWIl.svg" alt=""/>
            </li>
            
            <li className="padding-top-20">
            <span className="cursor-pointer" onClick = {(event) => {
                                    this.setState({
                                        changeContent: 'homecontent'
                                    });
                                }}>Home</span>
            </li>
            
            <li className="padding-top-20">
                                    <span className="cursor-pointer" onClick = {(event) => {
                                    this.setState({
                                        changeContent: 'filecontent'
                                    });
                                }}>Files</span>
            </li>
            <li className="padding-top-20">
                                    <span className="cursor-pointer" onClick = {(event) => {
                                    this.setState({
                                        changeContent: 'userinfo'
                                    });
                                }}>User Information</span>
            </li>
            </ul>
            </div>;
        return(
            <div className="row">
            <div className="col-md-2 background-gray">
          {sideMenuBar}
            </div>
            <div className="col-md-10 height-100">
                <TopMenu changeContent={this.state.changeContent}/>
            <Content changeContent={this.state.changeContent}/>
            </div>
            </div>
        )
    }
}

export default withRouter(HomePage);