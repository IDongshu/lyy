    function getLiuYan(){
        return new Promise((resolve,reject)=>{
            $.ajax({
                type:"get",
                url:"http://localhost:3000/goods/showliuyan",
                async:true,
                success:function(data){
                    resolve(data);
                }
            })
        })
    }
    function renderTable(data){
        return new Promise((resolve,reject)=>{
            // var content=data.liuyan.map(function(item,idx){
            //     return `
            //             <dt class="R-userTitle">${item.name}:</dt>
            //             <dd class="R-userCont">${item.value}</dd>
            //          `
            // }).join("");
            
            
            var content="";
            var len=(data.liuyan.length)-1;
            console.log(len);
            for(var i=len;i>=0;i--){
                var item = data.liuyan[i];
                content += '<dt class="R-userTitle">'+item.name+':</dt>'
                            +'<dd class="R-userCont">'+item.value+'</dd>'
            }
                    
            $(".liuyan").html(content);
            // resolve();
        })
    }

    
    

    function addLiuYan(){
        return new Promise((resolve,reject)=>{
            $.ajax({
                type:"post",
                url:"http://localhost:3000/goods/addliuyan",
                data:{
                    name:uname1,
                    value:$("#message").val()
                },
                async:true,
                success:function(data){
                    if(data){
                        resolve(); 
                    } 
                } 
            })
        })
    }

    getLiuYan().then(renderTable);

    var cookies= document.cookie;
    var uname1="";


    if(cookies.length> 0){

        cookies = cookies.split('; ');
        cookies.forEach(function(item){
            var arr = item.split('=');

            if(arr[0] === 'uname'){ 
                uname1=arr[1]; 
            }
        });
    
    
        var socket = io('http://localhost:3001');
        socket.on('connect', function() {});
        socket.on('event', function(data) {});
        socket.on('disconnect', function() {});



        $("#send").click(function(){
            socket.emit("sendMessageToServer",[uname1,$("#message").val()]);

            addLiuYan().then(getLiuYan);

            $("#message").val("");

        });

        socket.on("sendMessageToAllClient",function(data){
            $(".liuyan").prepend(
                    `<dt class="R-userTitle">${data[0]}:</dt>
                    <dd class="R-userCont">${data[1]}</dd>
                    `
            )
        });

    }else{
        $("#send").click(function(){
            alert("请先登录");
            location.href="../page/login.html";
        });
    }