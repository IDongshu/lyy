var agree = $(".agree").get(0);
$tip = $(".tip");
$("#inputName").blur(function(){
    $.ajax({
        type:"post",
        url:"http://localhost:3000/users/findUser",
        data:{
            username:$("#inputName").val(),
        },
        async:true,
        success:function(data){
            // console.log(data);
            if(data.length >0){
                $tip.html("用户名已存在");
                $tip.css("visibility","visible");
            }else{
                $tip.css("visibility","hidden");
            }     
        }
    })
});

$("#confrimPassword").blur(function(){
    $pwd=$("#inputPassword").val();
    $cofpwd=$("#confrimPassword").val();
    if($cofpwd != $pwd){
        $tip.html("两次密码不一致,请重新输入");
        $tip.css("visibility","visible");
    }else{
        $tip.css("visibility","hidden");
    }
});

$("#cellPhone").blur(function(){
    var _cell = $("#cellPhone").get(0).value;
    if(!/^1[3-9]\d{9}$/i.test(_cell)){
        $tip.html("请填写有效的电话号码");
        $tip.css("visibility","visible");
    }else{
        $tip.css("visibility","hidden");
    }
});

$(".btn-lg").click(function(){
    // console.log(agree.checked);

    $uname=$("#inputName").val();
    $pwd=$("#inputPassword").val();
    $cofpwd=$("#confrimPassword").val();
    $cell = $("#cellPhone").val();

    if($uname!==""&& $pwd!=="" && $cofpwd!=="" && $cell!==""){
        if(agree.checked){
            $(".tip").css("visibility","hidden");
            $.ajax({
                type:"post",
                url:"http://localhost:3000/users/addUser",
                data:{
                    username:$("#inputName").val(),
                    password:$("#inputPassword").val(),
                    cellphone:$("#cellPhone").val()
                },
                async:true,
                success:function(data){
                    if(data == "true"){
                        $('.form-control').val("");
                        agree.checked =!agree.checked;
                        setInterval(function(){
                            location.href="http://localhost:3000/page/login.html";
                        },1000);
                        
                        // console.log(data);
                    }
                }
            }) 
        }else if(!agree.checked){
            $tip.html("请先勾选服务条款");
            $tip.css("visibility","visible");
        }
    }else{
        $tip.html("请填写完成所有信息");
        $tip.css("visibility","visible");
    }  
})
