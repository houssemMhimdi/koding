var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 9100;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));


//Number of users variable
var numUsers = 0;
//get date variable
var date = new Date();

var usernames = {};
//connecting to a socket 

//Icons Map
var map = {

};
function ReplaceEmotios(text) {
    var text = text;
    Object.keys(map).forEach(function (ico) {
        // escape special characters for regex
        var icoE = ico.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");

        // now replace actual symbols
        text = text.replace(new RegExp(icoE, 'g'), map[ico]);
    });

    return text;
}


io.sockets.on('connection', function(socket){

function ProfileImage(){
        ProfilesImages = ['profile.png','profile1.png','profile2.png'];
        var randImage = ProfilesImages[Math.floor(Math.random() * ProfilesImages.length)];
        return randImage;
        }
        ProfileImage = ProfileImage();


	socket.on('admitUser', function(username){
		socket.username = username;
		usernames[username] = username;
        console.log('username'+username); 
        console.log('profile'+ProfileImage); 
	});
    
    
    console.log('a user connected ');
    
    socket.on('disconnect', function(){
    console.log('user disconnected');
    });
    // tracking messages with console
    socket.on('message', function(data){
       
    console.log('message:'+data );
       
    });
    //Send recive messages from clients 
    socket.on('message', function(data){ 
        var currentdate = new Date(); 
        // Sorted date variable
        var text = data; 
        var res =  ReplaceEmotios(text) ;
        var datetime =  currentdate.getDate() + "/"+(currentdate.getMonth()+1)+","+currentdate.getHours()+":"+currentdate.getMinutes(); 
        io.emit('message', {username: socket.username,profileImage:ProfileImage,message: res,date: datetime,});
    }); 
    
    

});


