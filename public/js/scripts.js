var getMsgData = io();
    
function makeid(length){
    var idString = "";
    var caracters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        idString += caracters.charAt(Math.floor(Math.random() * caracters.length));

    return idString;
}

username = makeid(5);  
  
getMsgData.on('connect', function(){
	getMsgData.emit('admitUser',  username);
});    
    
$('form').submit(function(){
    if($('#chatInput').val()){    
        getMsgData.emit('message', $('#chatInput').val());
    }    
    $('#chatInput').val('');
    return false;
});

getMsgData.on('message', function(data){
    var msg = data.message;
    var player = data.username;

                    
    if(player == username){
    coreClass = 'reciver';
    }    
    else{
    coreClass = 'sender';
    }


    broadcastTemplate =  
        '<div id="one-message" class="message '+coreClass+'">'+
        '<div class="opening-message " style="width: 100%; display: inline-block;">'+
        '<div class="profile-image"><img src="img/'+data.profileImage+'"></div>'+
        '<div class="message-container">'+
            '<span><strong>'+player+'</strong></span>'+    
            '<p>'+msg+'</p>'+
            '<div class="date">'+data.date+'</div>'+    
            '</div>'+
        
        '</div></div>'
    ;    

    keeptemplate =     
            '<div style="width: 100%; display: inline-block;">'+
            '<div class="profile-image"></div>'+
            '<div class="message-container">'+
            '<p>'+msg+'</p>'+
            '<div class="date">'+data.date+'</div>'+    
            '</div></div>'
            
    ;    
        
    //Arrange messages template    
    if($('#one-message').length==0){
        $('#messages').append(broadcastTemplate);
        $('#messagesId').append('<div id="onemessageid" class="'+player+'"></div>');    
    }
    else{
        if(player==lastMessageId){
            $("#one-message:last-child").append(keeptemplate);
            $('#messagesId').append('<div id="onemessageid" class="'+player+'"></div>');        
        }
        else{
            $('#messages').append(broadcastTemplate);
            $('#messagesId').append('<div id="onemessageid" class="'+player+'"></div>');    
        }  
    }

    lastMessageId = $("#onemessageid:last-child").attr('class');    

    $("#messages").animate({ scrollTop: $(document).height()+10000 }, "slow");
});

$('#messages').children().last();

$('body').delegate('.message-container','click',function(){
	$(this).find('.date').toggleClass('active');
});



