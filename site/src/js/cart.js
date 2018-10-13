//头部显示
$city=$(".site-nav .city");
$mobile=$(".site-nav .mobile");
$myyiguo=$(".site-nav .myyiguo");

function showSon(name,value){
    name.on("mouseover",function(){
        name.addClass(value);
    });
    name.on("mouseout",function(){
        name.removeClass(value);
    });
}
showSon($city,'current');
showSon($mobile,'current');
showSon($myyiguo,'current');

// 如果存在cookie,就让用户显示
var cookies= document.cookie;
if(cookies.length> 0){

    $('#_login').css('display','none');
    $('#_register').css('display','none');
    $('#_logout').css('display','block');
    $('#_loginname').css('display','block');

    cookies = cookies.split('; ');
    var uname1;
    var pwd1;

    cookies.forEach(function(item){
        var arr = item.split('=');

        if(arr[0] === 'uname'){
            $('#_loginname').children('a').html(arr[1]); 
            uname1=arr[1]; 
        }else if(arr[0] === "pwd"){
            pwd1=arr[1];
        }
    });
    // console.log( $('#_logout .logout'));
    // console.log(uname1,pwd1);
    // 退出就清除cookie;
    $('#_logout .logout').on('click',function(){
        // 清除cookie
        var d = new Date();
        d.setDate(d.getDate()-1);
        document.cookie = "uname = " + uname1 + "; expires=" + d.toUTCString()+"; path=/";
        document.cookie = "pwd = " + pwd1 + "; expires=" + d.toUTCString()+"; path=/";

        location.href="../html/denglu.html";
    });

    // 去cart拿当前用户的所有商品信息
    p=new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest();
        var status =[200,304];
        xhr.onload = function(){
            if(status.indexOf(xhr.status)!=-1){
                var result =JSON.parse(xhr.responseText);
                resolve(result);
            }
        }
        xhr.open("get","../api/header.php?&uname="+uname1,true);
        xhr.send(null);
    });
    p.then(
        function(result){
            function bigRanmance(result){
                // console.log(result,typeof result);
                var str = "";
                str+=result.map(function(item){
                    return   '<table class="cart-table" data-id="'+item.id+'">'
                                +'<tbody>'
                                    +'<tr>'
                                        +'<td class="cart-t-check">'
                                            +'<input type="checkbox" class="checkInput">'
                                        +'</td>'
                                        +'<td class="cart-t-img">'
                                            +'<a href="#">'
                                                +'<img src="'+item.imgurl+'">'
                                            +'</a>'
                                        +'</td>'
                                        +'<td class="cart-t-info">'
                                            +'<a href="#">'+item.pname+'</a>'
                                        +'</td>'
                                        +'<td class="cart-t-ub" style="width:75px;">'
                                        +'</td>'
                                        +'<td class="cart-t-price">￥'+item.price+'</td>'
                                            +'<td class="cart-t-num">'
                                                +'<div class="quantity-form">'
                                                    +'<a href="javascript:void(0);" class="decrement">'
                                                    +'</a>'
                                                    +'<input id="7d56648a-e268-48b7-a211-b16ea886d4af|1" type="text" class="itxt" oldnum="1" value="'+item.qty+'" >'
                                                    +'<a href="javascript:void(0);" class="increment">'
                                                    +'</a>'
                                                +'</div>'
                                            +'</td>'
                                        +'<td class="cart-t-total">￥'
                                            +'<span>'+(Number(item.price)*Number(item.qty)).toFixed(2)+'</span>'
                                        +'</td>'
                                        +'<td class="cart-t-spec">300g/袋'
                                        +'</td>'
                                        +'<td class="cart-t-opera">'
                                            +'<a href="javascript:void(0);" onclick="G.app.cart.module.addToFavor("7d56648a-e268-48b7-a211-b16ea886d4af")">移入收藏'
                                            +'</a>'
                                            +'<br>'
                                            +'<a href="#" class="sigBtn">删除'
                                            +'</a>'
                                        +'</td>'
                                    +'</tr>'
                                +'</tbody>'
                            +'</table>'
                }).join(""); 
                $('#theInsulationCan').html(str);
            }
            bigRanmance(result);

            function zongRanmance(){
                checkTotle =0; //清除之前的;
                var checkAll =$(".checkInput:checked").get();//所有被选中的
                for(let i=0;i<checkAll.length;i++){
                   let currentTab = checkAll[i].parentElement.parentElement.parentElement.parentElement;
                   sigleTotle = currentTab.children[0].children[0].children[6].children[0].innerHTML;
                   checkTotle +=Number(sigleTotle);
                }
                zongjia.innerHTML=checkTotle.toFixed(2);
            }

            
            let cartList = document.querySelector(".cart-list");//整个购物车所有
            let chkAll1 = document.querySelector(".chkAll1");//全选
            let chkAll2 = document.querySelector(".chkAll2");//全选2
            let checkboxs = document.querySelectorAll(".cart-list .cart-t-check input");//所有单选
            let tableAll=document.querySelectorAll('.cart-list .cart-table');//所有的单个商品
            let zongjia = $(".fs14 em span").get(0);
        
            let sigleTotle=0;
            let checkTotle=0;


            // 判断全选的个数
             function checkAllStatus(){
                for(var i=0;i<checkboxs.length;i++){
                    // 只要有一个没选中，直接跳出循环
                    if(!checkboxs[i].checked){
                        break;
                    }
                }
                // 只要i的值等于复选框的个数
                // 说明所有复选框都是选中状态
                chkAll1.checked = i === checkboxs.length;
                chkAll2.checked = i === checkboxs.length;
            }
            
            // 全选
            chkAll1.onclick=function(){
                for(let i=0;i<checkboxs.length;i++){
                    chkAll2.checked = this.checked;
                    checkboxs[i].checked = this.checked;
                    tableAll[i].classList[this.checked?'add':'remove']('selected');

                }
                zongRanmance(); 
            }

            chkAll2.onclick=function(){
                for(let i=0;i<checkboxs.length;i++){
                    chkAll1.checked = this.checked;
                    checkboxs[i].checked = this.checked;
                    tableAll[i].classList[this.checked?'add':'remove']('selected');
                }
                zongRanmance();
            }

            // 每一个的勾选选中
            cartList.onclick = function(e){
                let target= e.target;
                let tagName = target.className;

                if(tagName ==="checkInput"){
                    let currentTab = target.parentElement.parentElement.parentElement.parentElement;
                    currentTab.classList[target.checked?'add':'remove']('selected');

                    checkAllStatus();
                    zongRanmance();

                }else if(tagName === "decrement"  || tagName ==="increment"){
                    let currentTab =target.parentElement.parentElement.parentElement.parentElement.parentElement;
                    currentTab.children[0].children[0].children[0].children[0].checked=true;
                    currentTab.classList.add('selected');
                    let curId = currentTab.dataset.id;
                    let curPrice = currentTab.children[0].children[0].children[4].innerHTML.substring(1);
                    let curNum;

                    checkAllStatus();
                    if(tagName === "decrement"){
                        curNum = target.nextElementSibling.value;
                        if(curNum >=2){
                            curNum --
                            target.nextElementSibling.value=curNum;  
                        }
                    }else if(tagName === "increment"){
                        curNum = target.previousElementSibling.value;
                        curNum++;
                        target.previousElementSibling.value=curNum;
                    }

                    $.ajax({
                        url: '../api/setCart.php',
                        type: 'GET',
                        data: {
                            uname: uname1,
                            qty:curNum,
                            id:curId
                        },
                        success: function(data){
                            // 渲染单个商品的总价钱
                            let all =  Number(curPrice)*Number(data);
                            let itemAll=currentTab.children[0].children[0].children[6].children[0];
                            itemAll.innerHTML= all.toFixed(2);

                            // 渲染结算的总价钱
                            zongRanmance();
                        } 
                    })
                   
                }else if(tagName === "sigBtn"){
                    let currentTab = target.parentElement.parentElement.parentElement.parentElement;
                    let curId = currentTab.dataset.id;
                    console.log(curId);

                    $.ajax({
                        url: '../api/delCart.php',
                        type: 'GET',
                        data: {
                            uname: uname1,
                            id:curId
                        },
                        success: function(data){
                            //移除删除的商品
                            currentTab.parentElement.removeChild(currentTab);
                            // 渲染结算的总价钱
                            zongRanmance();
                        } 
                    })
                }
            }
            // 清除当前的选项
            var mydel = document.querySelector(".mydel");
            mydel.onclick = function(){
                var checkAll =$(".checkInput:checked").get();//获得当前被选中的
                for(let i=0;i<checkAll.length;i++){
                   let currentTab = checkAll[i].parentElement.parentElement.parentElement.parentElement;
                   let curId = currentTab.dataset.id;
                   $.ajax({
                        url: '../api/delCart.php',
                        type: 'GET',
                        data: {
                            uname: uname1,
                            id:curId
                        },
                        success: function(data){
                            //移除删除的商品
                            currentTab.parentElement.removeChild(currentTab);
                            // 渲染结算的总价钱
                            zongRanmance();
                        } 
                    })
                }
            }
            // 清空购物车
            var myclear = document.querySelector(".myclear");
            myclear.onclick = function(){
                $.ajax({
                    url: '../api/delCart.php',
                    type: 'GET',
                    data: {
                        uname: uname1,
                    },
                    success: function(data){
                        // cartList.innerHTML ="";
                        location.href=location.href;
                        chkAll1.checked = chkAll2.checked = false;
                        // 渲染结算的总价钱
                         zongRanmance();
                    } 
                })
            }

        }
    )
  

}


