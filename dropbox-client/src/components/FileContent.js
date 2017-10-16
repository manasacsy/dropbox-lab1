import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import {Button} from "react-bootstrap";
import {Modal} from "react-bootstrap";

class FileContent extends Component {
    constructor(props){
        super(props);
    }
    
        state = {
        showModal : false,
        shareWith:'',
        id:'',
        type:''
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

openModalShare = (id, type) => {
    var a = this.state;
    a.showModal = true;
    a.id = id;
    a.type = type;
    this.setState(a);
}
shareRes = () =>{
    var a = this.state;
    a.showModal = false;
    this.setState(a);
    console.log(this.state)
    this.props.shareRes(a.shareWith, a.id,a.type);
}
    
star = (index) => {
    console.log(index)
   this.props.star(index);
}
unstar = (index) => {
    console.log(index)
   this.props.unstar(index);
}
starFolder = (index) => {
    console.log(index)
   this.props.starFolder(index);
}
unstarFolder = (index) => {
console.log(index)
   this.props.unstarFolder(index);
}

deleteRes = (userfileid, type,fileid,filename) =>{
   this.props.deleteRes(userfileid, type,fileid,filename);
}
    render() {
        var rows = [];
        var rows1 = [];
        var data = this.props.imagesData;
        var folders = this.props.folders;
        console.log(data)
         console.log(folders)
        if(folders.length !== 0){
        folders.map(function(temp, index) {
            
            var starimg;
            var ownerstatus;
                          if(temp.star ==='true'){
                              starimg = <a onClick=
                                  { () => this.unstarFolder(index) }>
                          <img className="pull-right size-20 cursor-pointer" src={'/star.png'}/>
                          </a>; 
                            } 
                else{                  
                    starimg = <a onClick={ () => this.starFolder(index) }><img className="pull-right size-20 cursor-pointer" 
                          src={'/unstar.png'}/>
                          </a>;
                }
            
             if(temp.owner ==='true'){
                              ownerstatus = <span className="padding-left-20">Self</span>; 
                            } 
                else{ 
                    ownerstatus = <span className="padding-left-20">Shared</span>; 
                            } 
            rows1.push(<tr className="table-border" key ={index}><td className="padding-top-20 padding-bot-20"> 
                         <img className="size-20 cursor-pointer" 
                          src={'/folder.png'}/>
                          <a 
                       onClick={ () => this.props.getFolderData(index) }
                       className="padding-left-20 cursor-pointer">
                          {temp.foldername}</a>
                    </td>
                    <td>
                    {ownerstatus}
                    </td>
                    <td>
                       {starimg}
                    <a onClick=
                                  { () => this.openModalShare(temp.folderid, 'folder') }>
                          <img className="cursor-pointer pull-right size-20" src={'/share.png'}/>
                          </a>
                     <a onClick=
                                  { () => this.deleteRes(temp.userfileid,'folder',null,temp.foldername) }>
                          <img className="cursor-pointer pull-right size-20" src={'/delete.png'}/>
                          </a>
                     </td></tr>);
        }.bind(this));
}
if(data.length !== 0){
            data.map(function(imgtemp, index) {
                var smallImg;
                var ownerstatus;
                if(imgtemp.owner ==='true'){
                              ownerstatus = <span className="padding-left-20">Self</span>; 
                            } 
                else{ 
                    ownerstatus = <span className="padding-left-20">Shared</span>; 
                            } 
                var dataType =imgtemp.filename.split(".")[imgtemp.filename.split(".").length - 1];
                if(dataType ===  'jpg' || dataType ==='jpeg' || dataType ==='png'){
                    smallImg = <img className="img-dropbox" src={'http://localhost:3005/uploads/'+imgtemp.filename}/>;
                }
                else if(dataType ==='pdf'){
                    smallImg = <img className="img-dropbox" src={'/pdf.jpg'}/>;
                }
                else{
                      smallImg = <img className="img-dropbox" src={'/file.jpg'}/>;
                }
                var starimg;
                          if(imgtemp.star ==='true'){
                              starimg = <a onClick=
                                  { () => this.unstar(index) }>
                          <img className="cursor-pointer pull-right size-20" src={'/star.png'}/>
                          </a>; 
                            } 
                else{                  
                    starimg = <a onClick={ () => this.star(index) }><img className="cursor-pointer pull-right size-20" 
                          src={'/unstar.png'}/>
                          </a>;
                }
                rows.push(<tr className="table-border" key ={index}><td className="padding-top-20 padding-bot-20"> {smallImg}
                         
                          <a className="padding-left-20" href={'http://localhost:3005/uploads/'+imgtemp.filename} download>
                          {imgtemp.filename}</a>
                          </td>
                          
                          <td>
                          {ownerstatus}
                          </td>
                          <td>
                        {starimg}
                          <a onClick=
                                  {() => this.openModalShare(imgtemp.fileid,'file',)}>
                          <img className="cursor-pointer pull-right size-20" src={'/share.png'}/>
                          </a>
                     <a onClick=
                                  { () => this.deleteRes(imgtemp.userfileid,'file',imgtemp.fileid,imgtemp.filename) }>
                          <img className="cursor-pointer pull-right size-20" src={'/delete.png'}/>
                          </a>
                     </td></tr>);
                }.bind(this));
}
       if(rows1.length === 0 && rows.length === 0){
          rows1 = <tr><td><span className="padding-left-20">No files or folders to display</span></td></tr>; 
       }
        
            return (        
            <div className="pad-30">
             <table className="text-align-left width-100">
              <thead>
                <th className="table-head">Name</th>
                <th className="table-head">Owner</th>
                <th className="table-head pull-right">Options</th>
                </thead>
            <tbody>
                {rows1}
                {rows}
            </tbody>
          </table>
                
                
<div className="react-modal-custom">
            <Modal className ="react-modal-custom" show={this.state.showModal} onHide={this.close}>
        <Modal.Header>
            <Modal.Title className="modal-head-style">Enter name or emailid</Modal.Title>
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

export default FileContent;