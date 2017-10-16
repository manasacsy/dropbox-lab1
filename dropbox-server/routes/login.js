var mysql = require('./mysql');
var glob = require('glob');
var fileActions = require('./fileActions');
var bcrypt = require('bcrypt');

function loginAction(req,res)
{
	// check user already exists
	var getUser="select * from users where emailid='"+req.body.emailid +"'";
	mysql.fetchData(function(err,results){
		if(err){
			res.status(401).json({data: err});
		}
		else 
		{
            if(results.length > 0)
{   
    if(bcrypt.compareSync(req.body.password, results[0].password)){
       var obj={
               "userid" : results[0].userid
           }
     res.status(201).json({data: obj});  
    }
    else{
         res.status(401).send(results);
    }    
}            else{
                res.status(401).send(results);
            }
		}  
	}, getUser);
}
/*
*{
	"firstName" : "manasa",
	"lastName" : "yedire",
	"password" : 123,
	"emailid" : "yediremanasa@gmail.com"
}
*/
function signUpAction(req,res)
{  
    
     var salt = bcrypt.genSaltSync(10);
// Hash the password with the salt
    var hash = bcrypt.hashSync(req.body.password.toString(), salt);
    
	var addUser  =  "insert into users (`firstname`,`lastname`,`password`,`emailid`) "
    + "values ('" 
    + req.body.firstname
    +"','"
    + req.body.lastname
    +"','"
    + hash  
    +"','"
    + req.body.emailid
    + "')";
	
	mysql.fetchData(function(err,results){
		if(err){
			res.status(401).json({data: err});
		}
		else 
		{
            res.status(200).json({data: results});
		}  
	},addUser);
}

exports.loginAction=loginAction;
exports.signUpAction = signUpAction;