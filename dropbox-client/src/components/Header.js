import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
    render() {
        return (
            <div className="row header-border justify-content-md-center">
                <div className="col-md-2">
                   <a href="https://www.dropbox.com/">
                       <div className="row">
                       <span className="col-md-6"><img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_m1-vfleInWIl.svg" alt=""/></span> <span className="col-md-6 padding-top-20"><img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_text_2015_m1-vflV-vZRB.svg" alt=""/></span></div></a>
                </div>
            </div>
        );
    }
}

export default Header;