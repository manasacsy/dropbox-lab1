var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var login = require('./routes/login');
var fileActions = require('./routes/fileActions');
var userActions = require('./routes/userActions');
    
var multer  =   require('multer');
var app = express();
var cors = require('cors');

var router = express.Router();
var session = require('client-sessions');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        console.log("request in multer" + req);
        cb(null, file.originalname)
    }
});

// all environments
//configure the sessions with our application
app.use(session({   
	cookieName: 'session',    
	secret: 'cmpe273_test_string',    
	duration: 30 * 60 * 1000,    //setting the time for active session
	activeDuration: 5 * 60 * 1000,  })); // setting time for the session to be active when the window is open // 5 minutes set currently
var upload = multer({storage:storage});

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
// all environments
app.set('port', process.env.PORT || 3005);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.bodyParser());
app.use(express.cookieParser());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/loginAction', login.loginAction);
app.post('/signUp', login.signUpAction);
app.post('/files/upload/:currentFolder/:userid',  upload.single('mypic'),  fileActions.upload);
app.get('/files/:userid', fileActions.getData);
app.post('/starFile/:userfileid',fileActions.starFile);
app.get('/getFolderData/:folderid/:userid',fileActions.getFolderData);
app.get('/getuseractivity/:userid',fileActions.getuseractivity);
app.post('/unstarFile/:userfileid',fileActions.unstarFile);
app.post('/createFolder/:name/:inFolder/:userid',fileActions.createFolder);
app.post('/share/:userid/:resid/:restype',fileActions.shareAction);
app.post('/delete/:userfileid/:userid/:type/:fileid/:filename',fileActions.deleteAction);

app.get('/userInformation/:userid',userActions.userInformation);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
