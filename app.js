

var express = require('express'),
    connect   = require('connect'),
    passport  = require('passport'),
    http = require('http'),
    xtend = require('xtend'),
	util = require('util'),
	flash = require('connect-flash'),
	socketIo = require('socket.io'),
    passportSocketIo = require('passport.socketio');


var systemSettings = require('./systemSettings');
	sessionSecret  = systemSettings.sessionSecret; 
    sessionKey     = systemSettings.sessionKey; 
	mongoString    = systemSettings.mongoString; 
	

var sessionStore   = new connect.session.MemoryStore();
var sessionOptions = {
      store:  sessionStore,
      key:    sessionKey,
      secret: sessionSecret
};

var server;

console.log('Connecting to mongoDB'); 

var setupMongo = require('./setupMongo');
var dbConnection = new setupMongo.dbConnection(mongoString);
dbConnection.init();





console.log('Setting up passport over websocket'); 
require('./setupPassport');


options = {}; 

var app = express();
app.configure(function(){
	//app.set('views', __dirname + '/views');
	//app.set('view engine', 'ejs');
	//app.engine('ejs', require('ejs-locals'));


	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use("/", express.static(__dirname + "/client"));
	app.use(express.session(sessionOptions));
	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
});


app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/', failureFlash: true }));



console.log('Initializing Blog content type'); 
ctBlog = require('./resources/ctBlog');
ctBlog.ctBlog(app, dbConnection.getMongoose()); 



server = http.createServer(app);

var sio = socketIo.listen(server);
sio.configure(function(){
	this.set('authorization', passportSocketIo.authorize(xtend(sessionOptions, options)));
	this.set('log level', 1);
});

sio.sockets.on("connection", function(socket){
	//console.log("user connected: ", socket.handshake.user.name);	
	socket.on('message', function (data) {
		//console.log(data);
		socket.emit('message', { reply: data });
	}); 

}); 


console.log('Starting server');  
server.listen(9000);
