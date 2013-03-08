$('document').ready(function() {

	socket.on('message', function (data) {
		console.log(data);
	});
	
	socket.on('connect', function() {
	   console.log('socket is connected');
	});

});