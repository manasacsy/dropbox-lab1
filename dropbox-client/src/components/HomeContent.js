import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as API from '../api/API';

class HomeContent extends Component {   
     constructor(props){
        super(props);
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
   render() {
        var rows = [];  
       var rows1 =[];
        var rows3 = [];  
       var rows4 =[];
         var data = this.props.imagesData;
       console.log(this.props)
        var folders = this.props.folders;
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
            if(temp.star === 'true'){
               rows1.push(<tr className="table-border" key ={index}><td className="padding-top-20 padding-bot-20"> 
                         <img className="size-20 cursor-pointer" 
                          src={'/folder.png'}/>
                          <a 
                       className="padding-left-20 cursor-pointer">
                          {temp.foldername}</a>
                    </td>
                    <td>
                    {ownerstatus}
                    </td>
                    <td>
                       {starimg}
                     </td></tr>);
               }
                     if(temp.owner === 'false'){
              rows3.push(<tr className="table-border" key ={index}><td className="padding-top-20 padding-bot-20"> 
                         <img className="size-20 cursor-pointer" 
                          src={'/folder.png'}/>
                          <a 
                       className="padding-left-20 cursor-pointer">
                          {temp.foldername}</a>
                    </td>
                    <td>
                    {ownerstatus}
                    </td>
                    <td>
                       {starimg}
                     </td></tr>);
        }
        }.bind(this));
}
            if(data.length!==0){
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
               if(imgtemp.star === 'true'){
                   rows.push(<tr className="table-border" key ={index}><td className="padding-top-20 padding-bot-20"> {smallImg}
                         
                          <a className="padding-left-20" href={'http://localhost:3005/uploads/'+imgtemp.filename} download>
                          {imgtemp.filename}</a>
                          </td>
                          
                          <td>
                          {ownerstatus}
                          </td>
                          <td>
                        {starimg}
                     </td></tr>);
                  }
                if(imgtemp.owner == 'false'){
                   rows4.push(<tr className="table-border" key ={index}><td className="padding-top-20 padding-bot-20"> {smallImg}
                         
                          <a className="padding-left-20" href={'http://localhost:3005/uploads/'+imgtemp.filename} download>
                          {imgtemp.filename}</a>
                          </td>
                          
                          <td>
                          {ownerstatus}
                          </td>
                          <td>
                        {starimg}
                     </td></tr>);
                   }
                }.bind(this));
               }
       if(rows1.length === 0 && rows.length === 0){
          rows1 = <tr><td><span className="padding-left-20">No files or folders to display</span></td></tr>; 
       }
            return (  
            <div className="pad-30">
             <table className="text-align-left width-100">
                <thead>
                <th className="table-head">Starred</th>
                </thead>
            <tbody>
                 {rows1}
                {rows}               
            </tbody>
          </table>
                <div className="padding-top-20"></div>
                <table className="text-align-left width-100">
                <thead>
                <th className="table-head">Shared with me</th>
                </thead>
            <tbody>
                 {rows3}
                {rows4}               
            </tbody>
          </table>
            </div>
        );
    }
}

export default HomeContent;