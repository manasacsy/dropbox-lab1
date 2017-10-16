var mysql = require('./mysql');


function userInformation(req,res){  
    var userInforQuery  =  "select * from users where userid=" + req.params.userid;
    mysql.fetchData(function(err,results){
        console.log(results)
		if(err){
			res.status(401).json(err);
		}
		else 
		{
         res.status(200).json(results);   
		}  
	}, userInforQuery);
}

exports.userInformation = userInformation;