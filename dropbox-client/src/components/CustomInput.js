import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CustomInput extends Component {

    static propTypes = {
        message: PropTypes.string.isRequired
    };

    render() {
        return (
            <div className="row">
            <div className="col-md-12">
            </div>
            </div>
        );
    }
}

export default CustomInput;