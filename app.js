
var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = 8999;
var io = require('socket.io')(server);
var userList=[];
// function mainReqHandler(req, res){
// 	//res.send("Hello World");
// 	res.sendFile(__dirname + '/public/index.html');
// }

//app.get('/', mainReqHandler);

app.use('/', express.static(__dirname + '/public'));

function serverUpCallback(){
	console.log("listening on port: " + port);
}

function incomingSocketHandler(socket){
	console.log('a user has connected');
	console.log(socket);
	console.log(socket.handshake.headers['user-agent']);
	console.log(socket.conn.server.clientsCount);

	socket.on('disconnect', function(){
		console.log("User has disconnected");
	});

	socket.on('nick name',function(dataFromClient){
	console.log(dataFromClient);
	socket.userName = dataFromClient;
	var dataFromServer = {
			'userName' : "*** (◎｀・ω・´)ゞ ATTENTION",
			'message': socket.userName+" has joined this secret conversation. ☆(･ω･*)ゞ ***"
		}
		io.emit("latest message", dataFromServer);
		//put the user in list
var userinfo = {
			'userName' : socket.userName,
			'id': socket.id
		}
		userList.push(userinfo);
		console.log(userList);
	});
	// socket.userName = "User " + socket.conn.server.clientsCount;

	socket.emit("welcome message", "Welcome user!");
	socket.on('chat message', function(dataFromClient){
		console.log(dataFromClient);
		var dataFromServer = {
			'userName' : socket.userName,
			'message' : dataFromClient.msgText
		}
		console.log(dataFromServer);
		io.emit('latest message', dataFromServer);
		socket.emit('message confirmation', {'text' : "Your message was sent"});
	});

}

io.on('connection', incomingSocketHandler);

server.listen(port, serverUpCallback);