$singin = $(".singin");
$singout=$(".singout");

// 如果存在cookie,
var cookies= document.cookie;
if(cookies.length> 0){

    cookies = cookies.split('; ');
    var uname1;
    var pwd1;


    cookies.forEach(function(item){
        var arr = item.split('=');

        if(arr[0] === 'uname'){
            $singin.html(arr[1]+",欢迎登陆"); 
            uname1=arr[1]; 
        }else if(arr[0] === "pwd"){
            pwd1=arr[1];
        }
    });

    // $singout.on('click',function(){

    //     // 清除cookie
    //     var d = new Date();
    //     d.setDate(d.getDate()-1);
    //     document.cookie = "uname = " + uname1 + "; expires=" + d.toUTCString()+"; path=/";
    //     document.cookie = "pwd = " + pwd1 + "; expires=" + d.toUTCString()+"; path=/";

    //     location.href="../page/login.html";
        
    // })

}