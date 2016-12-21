var socket = io();
var named=false, nameValid=false;
var nickname;
//reading data from server
socket.on('welcome message', function(data){
	$('#messages').append($('<li>').text(data));
	console.log("welcome is working");
	while(named==false){
	nickname = window.prompt('Hey, ( ͡° ͜ʖ ͡°) \nyou\'re attempting to join a secret millitary meeting!\n(No space key allowed!!!.)', 
		'Type your name here! ヾ(´ε｀*)ゝ');
	if(nickname.indexOf(' ')== -1){ named=true; socket.emit('nick name', nickname);}
	else {window.alert("(；・ε・)ゝ” Name invalid. \n Make a new one! (●´ω｀●)ゞ ");}
}
})

socket.on('latest message', function(data){
	$('#messages').append($('<li>').text(data.userName + ": " + data.message));
})

socket.on('message confirmation', function(data){
	window.alert(data.text);
})



//sending data to server
$('form').submit(submitFired);

function submitFired(){
	var dataFromClient = {
		'msgText' : $('#m').val()
	}
	socket.emit('chat message', dataFromClient);
	$('#m').val();
	return false;
}