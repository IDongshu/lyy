$username = $("#UserName");
$pwd =$("#Pwd");
$verifycode = $("#VerifyCode");//验证
$yanzhengbtn=$("#yanzhengbtn");//验证码
$btnLogin = $("#btnLogin");
$usernameRemeber = $("#UserNameRemeber");
$msg =$("#msg-wrap").find("div");//提示信息

// 设置Cookie
var Cookie = {
    setCookie : function(name,value,date,path){
        var str = name+"="+value;
        if(date){
            str += "; expires="+date;
        }
        if(path){
            str += "; path="+path;
        }
        document.cookie = str;
    },
    getCookie : function(name){
        var cookies = document.cookie;//字符串
        if(cookies.length == 0){
            return "";
        }
        if(cookies.length > 0){
            cookiesArr = cookies.split("; ");
            for(var i=0;i<cookiesArr.length;i++){
                var arr = cookiesArr[i].split("=");
                if(arr[0] == name){
                    return arr[1];
                }
            }
        }
    },
    removeCookie : function(name,value,path){
        var d = new Date();
        d.setDate(d.getDate()-1);
        this.setCookie(name,value,d.toUTCString(),path);
    },
    clearCookie: function(){}
}

//获得四位数的验证码
function getMa(){
    var str="0123456789abcdef";
    var subStr="";
    for(var i=0;i<4;i++){
        var random = parseInt(Math.random()*16);
        subStr +=str[random];
        }
    yanzhengbtn.value= subStr;
}       
//点击生成验证码
yanzhengbtn.onclick = function(){
    getMa();
}
//加载时也生成一次验证码
getMa();


// $username.val("");
// $pwd.val("");
// $verifycode.val("");

// 
$btnLogin.on('click',function(e){
    e.preventDefault();
    
    $_username =$username.val();
    $_pwd =$pwd.val();
    $_verifycode= $verifycode.val();
    $_yanzhengbtn= $yanzhengbtn.val();



    // 清除之前的提示
    $msg.removeClass('msg-error');
    $msg.html("");
    

    if($_username !=="" && $_pwd !== "" && $_verifycode !== ""){

        if($_verifycode == $_yanzhengbtn){
            
            var uname =$_username;
            var pwd =$_pwd;
            var  xhr = new XMLHttpRequest();
            var status =[200,304];
            xhr.onload = function(){
                if(status.indexOf(xhr.status)!=-1){
                    // var data =JSON.parse(xhr.responseText);
                    if(xhr.responseText){
                        location.href ="../index.html";
                        var d = new Date();
                        Cookie.setCookie("uname",$_username,null,"/");
                        Cookie.setCookie("pwd",$_pwd,null,"/");
                    }else{
                        alert("用户名或密码错误");
                        getMa();
                    }
                        
                }
            }
            xhr.open("get","../api/denglu.php?uname="+uname+"&pwd="+pwd,true);
            console.log(uname,pwd);
            xhr.send(null); 
        }else{
            $("#msg-wrap").addClass('msg-wrap');
            $msg.addClass('msg-error');
            $msg.html("验证码错误");
        }

    }else{
        $("#msg-wrap").addClass('msg-wrap');
        $msg.addClass('msg-error');
        $msg.html("请填写所有信息");
    }

    
})





