var mysql = require('./mysql');
var glob = require('glob');

function getData(req,res){
    getFiles(req.params.userid,res,'0');
}
function upload(req,res){
    
    
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    dt.format('m/d/Y H:M:S');

    var activityQuery = "INSERT INTO `dropboxdb`.`user_activity` (`userid`, `event`, `eventtime`) VALUES("+req.params.userid
    +",'Uploaded a file "+ req.file.originalname
    +"','"
    +new Date(dt.now())
    +"')";
    console.log(activityQuery)
                  mysql.fetchData(function(err,results){
               },activityQuery);
    
    
    
    var addFile  =  "insert into files (`filename`,`folderid`) "
    + "values ('" 
    + req.file.originalname
    +"','"
    +req.params.currentFolder
    + "')";
    mysql.fetchData(function(err,results){
		if(err){
			res.status(401).json({data: err});
		}
		else 
		{
            if(results.affectedRows == 1){
                 var addFileToUserData  =  "insert into user_files (`userid`, `fileid`) "
    + "values (" 
    + req.params.userid+",'"
    + results.insertId
    + "')";
                 mysql.fetchData(function(err,results){
                     if(err) {
			res.status(401).json({data: err});
		}  
                      getFiles(req.params.userid,res,req.params.currentFolder);
                     //res.status(204).json({data: results});
                    
                     }, addFileToUserData);
                
            }
		}  
	}, addFile);
    
    
    
    /*var dateTime = require('node-datetime');
    var dt = dateTime.create();
    dt.format('m/d/Y H:M:S');
    console.log(new Date(dt.now()));*/
    
    
    
}

function getFiles(userid,res,currentFolder){
    var getData="SELECT * FROM `files` INNER JOIN `user_files` ON `files`.`fileid` =  `user_files`.`fileid` where `user_files`.`userid` = " + userid + " and `files`.`folderid` = " + currentFolder;
    mysql.fetchData(function(err,results){
        if(err){
			res.status(401).json({data: err});
		}
		else 
            
		{
            var filesR = results;
            if(currentFolder == 0){
                
                var getsharedData="SELECT * FROM `files` INNER JOIN `user_files` ON `files`.`fileid` =  `user_files`.`fileid` where `user_files`.`userid` = " + userid + " and `user_files`.`owner` = 'false'  and `files`.`folderid` != 0";
                mysql.fetchData(function(err,results){
        if(err){
			res.status(401).json({data: err});
		}
		else 
		{
            filesR = filesR.concat(results);
        }
                }, getsharedData);
    var getFoldersData="SELECT * FROM `folders` INNER JOIN `user_files` ON `folders`.`folderid` =  `user_files`.`folderid` where `user_files`.`userid` = " + userid;
    mysql.fetchData(function(err,results){
        if(err){
			res.status(401).json({data: err});
		}
		else 
		{
           var obj={
               "files" : filesR,
               "folders" : results
           }
           res.status(200).json(obj); 
        }
    },getFoldersData);
               }
            else{
                var query2 ="SELECT * FROM folders  INNER JOIN user_files ON `folders`.`folderid` =`user_files`.`folderid` where `user_files`.`userid` = "+userid+" and folders.infolder = "+currentFolder;
               mysql.fetchData(function(err,results){
                    if(err) {
			res.status(401).json({data: err});
		}   
                   var obj={
               "files" : filesR,
               "folders" : results
           }
           res.status(200).json(obj);
               },query2);

            }
        }
    },getData);
}
function starFile(req,res){
    var userfileid = req.params.userfileid;
    var startFileQuery="UPDATE `dropboxdb`.`user_files` SET `star` = 'true' WHERE `userfileid` ="+ userfileid;

    mysql.fetchData(function(err,results){
        if(err){
			res.status(401).json({data: err});
		}
		else 
		{
           res.status(200).json(results); 
        }
    },startFileQuery);
}
function unstarFile(req,res){
    var userfileid = req.params.userfileid;
    var unstartFileQuery="UPDATE `dropboxdb`.`user_files` SET `star` = 'false' WHERE `userfileid` ="+ userfileid;

    mysql.fetchData(function(err,results){
        if(err){
			res.status(401).json({data: err});
		}
		else 
		{
           res.status(200).json(results); 
        }
    },unstartFileQuery);
}

function createFolder(req,res){
    var folderName = req.params.name;
    var inFolder = req.params.inFolder;
    var resultspre;
    
      var dateTime = require('node-datetime');
    var dt = dateTime.create();
    dt.format('m/d/Y H:M:S');

    var activityQuery = "INSERT INTO `dropboxdb`.`user_activity` (`userid`, `event`, `eventtime`) VALUES("+req.params.userid
    +",'Created a folder "+ folderName
    +"','"
    +new Date(dt.now())
    +"')";
    console.log(activityQuery)
                  mysql.fetchData(function(err,results){
               },activityQuery);
            
    
    
    var createFolder="insert into folders (`foldername`, `infolder`) "
    + "values ('" 
    + folderName
    +"',"
    +inFolder
    + ")";
    mysql.fetchData(function(err,results){
        if(err){
			res.status(401).json({data: err});
		}
		else 
		{
            resultspre = results;
          if(results.affectedRows == 1){
                 var addFolderToUserData  =  "insert into user_files (`userid`, `folderid`) "
    + "values (" 
    + req.params.userid+",'"
    + results.insertId
    + "')";
                 mysql.fetchData(function(err,results){
                     if(err) {
			res.status(401).json({data: err});
		}  
                      //getFiles(1,res);
                     res.status(200).json({data: resultspre});
                    
                     }, addFolderToUserData);
                
            }
            
        }
    },createFolder);
}
function getFolderData(req,res){
    var resilt1;
    var folderid=req.params.folderid;
    var query1 ="SELECT * FROM files  where dropboxdb.files.folderid = " +folderid;
          mysql.fetchData(function(err,results){
                     if(err) {
			res.status(401).json({data: err});
		}  
                     resilt1 = results;
              
              var query2 ="SELECT * FROM user_files  INNER JOIN folders ON `folders`.`folderid` =`user_files`.`folderid` where `user_files`.`userid` = "+req.params.userid+" and folders.infolder = "+folderid;
              console.log(query2)
               mysql.fetchData(function(err,results){
                    if(err) {
			res.status(401).json({data: err});
		}   
                   var obj={
               "files" : resilt1,
               "folders" : results
           }
           res.status(200).json(obj);
               },query2);

                     }, query1);
}
function shareAction(req,res){    
    var resSharedTo = req.params.userid;
    var resid = req.params.resid;
    var restype = req.params.restype;
    var userid;
    
    var getUser="select * from users where emailid='"+resSharedTo+"' or firstname='" + resSharedTo +"' or lastname = '" + resSharedTo +"'";
     console.log(getUser);
     mysql.fetchData(function(err,results){
                    if(err) {
			res.status(401).json({data: err});
		}   
         console.log(results);
               userid = results[0].userid;
          var shareQuery;
    if(restype === 'file'){
        shareQuery = "INSERT INTO `dropboxdb`.`user_files` (`userid`, `fileid`, `star`, `owner`) VALUES ("+userid+ "," + resid + ",'false','false')";
       }
    else{
         shareQuery = "INSERT INTO `dropboxdb`.`user_files` (`userid`, `star`, `folderid`, `owner`) VALUES ("+userid+ ",'false',"+resid+",'false')";
    }
    console.log(shareQuery);
     mysql.fetchData(function(err,results){
                    if(err) {
			res.status(401).json({data: err});
		}   
                   var obj={
               "data" : results
           }
           res.status(200).json(obj);
               },shareQuery);
           //res.status(200).json(obj);
               },getUser);
    
    
   
}
function deleteAction(req,res){
    
   var userfileid = req.params.userfileid;
   var userid = req.params.userid;
   var type = req.params.type;
    var fileidtemp = req.params.fileid;
    var deleteQuery;
    var validDelete;
    if(userfileid !== null){
       console.log("hvhj" + userfileid)
    var validDeleteQyery;
    validDeleteQyery = "SELECT * FROM `user_files` where user_files.userfileid =" + userfileid;
    
    mysql.fetchData(function(err,results){
                    if(err) {
			res.status(401).json({data: err});
		}   
                   /*var obj={
               "data" : results
           }
           res.status(200).json(obj);*/
        validDelete = results[0].owner;
        var fileid = results[0].fileid;
        var folderid = results[0].folderid;
        if(validDelete === 'true' && type === 'file'){
            
            
             var dateTime = require('node-datetime');
    var dt = dateTime.create();
    dt.format('m/d/Y H:M:S');

    var activityQuery = "INSERT INTO `dropboxdb`.`user_activity` (`userid`, `event`, `eventtime`) VALUES("+req.params.userid
    +",'Deleted the file "+ req.params.filename
    +"','"
    +new Date(dt.now())
    +"')";
    console.log(activityQuery)
                  mysql.fetchData(function(err,results){
               },activityQuery);
            
            
            
            deleteQuery = "DELETE FROM `dropboxdb`.`user_files` WHERE user_files.fileid = "+fileid;  
             mysql.fetchData(function(err,results){
                    if(err) {
			res.status(401).json({data: err});
		}   
                  
                   var deletefilesQuery = "DELETE FROM `dropboxdb`.`files` WHERE files.fileid = "+fileid;
                  mysql.fetchData(function(err,results){
                    if(err) {
			res.status(401).json({data: err});
		}   
                   var obj={
               "data" : results
           }
           res.status(200).json(obj);
               },deletefilesQuery);
               },deleteQuery);
        }
        else if(validDelete === 'true' && type === 'folder'){
            
            
            
            
              var dateTime = require('node-datetime');
    var dt = dateTime.create();
    dt.format('m/d/Y H:M:S');

    var activityQuery = "INSERT INTO `dropboxdb`.`user_activity` (`userid`, `event`, `eventtime`) VALUES("+req.params.userid
    +",'Deleted the folder "+ req.params.filename
    +"','"
    +new Date(dt.now())
    +"')";
    console.log(activityQuery)
                  mysql.fetchData(function(err,results){
               },activityQuery);
            
            
            
            deleteQuery = "DELETE FROM `dropboxdb`.`user_files` WHERE user_files.folderid = "+folderid; 
                mysql.fetchData(function(err,results){
                    if(err) {
			res.status(401).json({data: err});
		}   
                   var deletefolderQuery = "DELETE FROM `dropboxdb`.`folders` WHERE folders.folderid = "+folderid;
                  mysql.fetchData(function(err,results){
                    if(err) {
			res.status(401).json({data: err});
		}   
                   var obj={
               "data" : results
           }
           res.status(200).json(obj);
               },deletefolderQuery);
               },deleteQuery);
            }
        else{
            var obj={
                messge:"mot authorized to delete"
            }
            res.status(200).json(obj);
        }
        
               },validDeleteQyery);
       }
    else{
         var deletefilesQuery = "DELETE FROM `dropboxdb`.`files` WHERE files.fileid = "+fileidtemp;
                  mysql.fetchData(function(err,results){
                    if(err) {
			res.status(401).json({data: err});
		}   
                   var obj={
               "data" : results
           }
           res.status(200).json(obj);
               },deletefilesQuery);
    }

}
function  getuseractivity(req,res){
    var activityQuery = "SELECT * FROM user_activity where userid = " + req.params.userid;
      mysql.fetchData(function(err,results){
                    if(err) {
			res.status(401).json({data: err});
		}   
                   var obj={
               "data" : results
           }
           res.status(200).json(obj);
               },activityQuery);
    
}
exports.getData = getData;
exports.getuseractivity = getuseractivity;
exports.upload = upload;
exports. getFiles =  getFiles;
exports.starFile = starFile;
exports.unstarFile =unstarFile;
exports.createFolder =createFolder;
exports.getFolderData =getFolderData;
exports.shareAction = shareAction;
exports.deleteAction = deleteAction;
