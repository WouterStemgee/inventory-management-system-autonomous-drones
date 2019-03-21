var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('client connected');

	socket.on('disconnect', function(){
		console.log('client disconnected');
	});
		
	socket.on('update', function(msg){
		console.log(msg);
		io.emit('update', msg);
	});
});

http.listen(port, function(){
	console.log('listening on *:' + port);
});
