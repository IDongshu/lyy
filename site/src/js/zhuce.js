$verficode_tab1=$("#verficode_tab1");
$phone_Mobile=$("#Phone_Mobile");
$phone_SendCode=$('#Phone_SendCode');
$phone_VerifyCode=$("#Phone_VerifyCode");
$phone_Password=$("#Phone_Password");
$phone_ConfimPassword=$("#Phone_ConfimPassword");
$PhoneReg=$("#PhoneReg");
$yanzhengbtn=$("#yanzhengbtn");

//获得四位数的验证码
function getMa(){
    var str="0123456789abcdef";
    var subStr="";
    for(var i=0;i<4;i++){
        var random = parseInt(Math.random()*16);
        subStr +=str[random];
        }
    return subStr;
}       
//点击生成验证码
yanzhengbtn.onclick = function(){
    this.value=getMa();
}
//加载时也生成一次验证码
$yanzhengbtn.val(getMa());

//手机验证和确认密码
$phone_VerifyCode.on("blur",function(){
    if($phone_VerifyCode.val()==""){
        var currentSpan=$phone_VerifyCode.get(0).parentElement.children[3];
        currentSpan.classList.add('pass-error');
        currentSpan.innerHTML="验证码不能为空";
    }
});
$phone_VerifyCode.on("input",function(){
    $phone_VerifyCode.get(0).parentElement.children[3].innerHTML="";
})
$phone_ConfimPassword.on("blur",function(){
    if($phone_ConfimPassword.val() ==""){
        var currentSpan=$phone_ConfimPassword.get(0).parentElement.children[2];
        currentSpan.classList.add('pass-error');
        currentSpan.innerHTML="确认密码不能为空";
    }
});
$phone_ConfimPassword.on("input",function(){
    $phone_ConfimPassword.get(0).parentElement.children[2].innerHTML="";
});
// 生成手机验证码
$phone_SendCode.on("click",function(e){
    e.preventDefault();
    $phone_SendCode.html(getMa());
})

//查看数据库是否存在相同用户名

$phone_Mobile.on('blur',function(){
        var uname = $phone_Mobile.val();
        // console.log(uname);
        var  xhr1 = new XMLHttpRequest();
        var status =[200,304];
        xhr1.onload = function(){
            if(status.indexOf(xhr1.status)!=-1){
                // var data =JSON.parse(xhr.responseText);
                var current = $phone_Mobile.get(0).parentElement.children[2];
                console.log(xhr1.responseText);
                if(xhr1.responseText == "true"){
                    current.innerHTML="用户名已存在";
                    // return false;
                }else if(xhr1.responseText == "false"){
                    current.innerHTML="用户名可以使用";
                    // 文本清空
                }
                current.classList.add('pass-error');          
            }
        }
        xhr1.open("get","../api/search.php?uname="+uname,true);
        xhr1.send(null); 

})


// 提交
$PhoneReg.on("click",function(e){
    e.preventDefault();

    $_verficode=$verficode_tab1.val();
    $_mobile=$phone_Mobile.val();
    $_sendCode=$phone_SendCode.val();
    $_pverifyCode=$phone_VerifyCode.val();
    $_password=$phone_Password.val();
    $_confimPassword=$phone_ConfimPassword.val();
    $_yzBtn=$yanzhengbtn.val();

    if($_verficode != $_yzBtn){
        alert("图形验证码错误");
        return false;
    }
    if(!/^1[3-9]\d{9}$/i.test($_mobile)){
        alert("请输入有效电话号码");
        return false;
    }

    if($_pverifyCode != $phone_SendCode.html()){
        alert("手机机验证码错误");
        return false;
    }
    if(!/[\w]{6,20}$/i.test($_password)){
        alert("请输入6-20位字母数字符号");
        return false;
    }
    if($_confimPassword != $_password){
        alert('两次输入密码不一致');
        return false;
    }
    var  xhr2 = new XMLHttpRequest();
    var status =[200,304];
    xhr2.onload = function(){
        if(status.indexOf(xhr2.status)!=-1){
            console.log(xhr2.responseText);
            if(xhr2.responseText){

                alert("注册成功");
                location.href="../html/denglu.html";
            }else{
                alert("注册失败");
            }
        }
    }
    xhr2.open("get","../api/zhuce.php?uname="+$_mobile+"&pwd="+$_password,true);
    xhr2.send(null); 

    // location.href ="../index.html";
})
