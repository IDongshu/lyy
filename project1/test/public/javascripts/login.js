$btn =$(".btn-lg");
$tip = $(".tip");

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



$btn.click(function(){
    // e.preventDefault();
    //发送请求，查看数据库是否存在用户
    $uname=$("#inputName").val();
    $pwd = $("#inputPassword").val();

    if($uname !="" && $pwd!=""){
       $.ajax({
            type:"post",
            url:"http://localhost:3000/users/findUser",
            data:{
                username:$uname,
            },
            async:true,
            success:function(data){
                // console.log(data);
                if(data.length >0){
                    if($pwd != data[0].password){
                        $tip.html("用户密码错误");
                        $tip.css("visibility","visible");
                    }else{
                        // 存cookie
                        Cookie.setCookie("uname",$uname,null,"/");
                        Cookie.setCookie("pwd",$pwd,null,"/");
                        // 设置定时跳转至dashbord.html
                        setInterval(function(){
                            // 跳转至首页
                            location.href="http://localhost:3000/page/dashboard.html";
                        },1000);
                    }

                }else if(data.length == 0){
                    $tip.html("用户不存在");
                    $tip.css("visibility","visible");
                }
            }
        }) 
    }else{
        $tip.html("请填写完成所有信息");
        $tip.css("visibility","visible");
    }
})
$(".form-control").focus(function(){
    $tip.css("visibility","hidden");
});