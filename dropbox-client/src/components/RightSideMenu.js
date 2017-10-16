import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from "react-bootstrap";
import {Modal} from "react-bootstrap";

class RightSideMenu extends Component {
    state = {
        showModal : false,
        shareWith:''
    }
    getInitialState = () => {
    return { showModal: false ,
           shareWith : ''};
};

close = () => {
    var a = this.state;
    a.showModal = false;
    this.setState(a);
};

openModalShare = () => {
   // console.log(path.path);
    var a = this.state;
    a.showModal = true;
    this.setState(a);
}
abc = () =>{
    var a = this.state;
    a.showModal = false;
    this.setState(a);
    this.props.handleNewFolder(this.state);
}
    render() {
        var val = true;
        return ( 
            <div className="pos-fixed">
            <div className="file">
  <label htmlFor="file-input">Upload files</label>
  <input type="file"                                 className="pull-right"
 id="file-input"  name="mypic"
                    onChange={this.props.handleFileUpload}/>
            </div>
            <div className="padding-top-20">
            <a className="new-folder-style" onClick={() => this.openModalShare()}>New Folder
            </a>
            </div>


<div className="react-modal-custom">
            <Modal className ="react-modal-custom" show={this.state.showModal} onHide={this.close}>
        <Modal.Header>
            <Modal.Title className="modal-head-style">Enter folder name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input type = 'text' onChange={event=>{this.setState({shareWith:event.target.value});}}/>
           <span className="padding-left-20"><Button type='button' onClick={this.abc}>Done</Button></span> 
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
    </Modal>
</div>
</div>
        );
    }
}

export default RightSideMenu;