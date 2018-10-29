function socket(){
    var app =require("express")();
    var server = require("http").createServer(app);
    var io = require("socket.io")(server);
    io.on("connection",function(socket){
        var socketid = socket.id;
        console.log(socketid);

        //监听消息，群发客户端 
        socket.on("sendMessageToServer",function(data){
           io.sockets.emit("sendMessageToAllClient",data);
        });
        
    })

    server.listen(3001);
}

module.exports={
    socket
}

