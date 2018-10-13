//头部展现
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


// 购物车显示
$shoppingList = $(".shopping-list");
$('.shopping-cart').on('mouseover',function(){
    $shoppingList.css('display','block');
    $('.nogoods').css('display','none');
    $('.goods').css('display','block');
})
$('.shopping-cart').on("mouseout",function(){
    $shoppingList.css('display','none');
})

// 如果存在cookie,就让显示当前用户买的东西
var cookies= document.cookie;
if(cookies.length> 0){
    
    $('#_login').css('display','none');
    $('#_register').css('display','none');
    $('#_logout').css('display','block');
    $('#_loginname').css('display','block');
    

    cookies = cookies.split('; ');
    var uname1;
    var pwd1;
    // console.log(cookies);
    cookies.forEach(function(item){
        var arr = item.split('=');

        if(arr[0] === 'uname'){
            $('#_loginname').children('a').html(arr[1]); 
            uname1=arr[1]; 

        }else if(arr[0] === "pwd"){
            pwd1=arr[1];
        }
    });

    // 退出就清除cookie;
    console.log($('#_logout .logout'));
    $('#_logout .logout').on('click',function(){

        // 清除cookie
        var d = new Date();
        d.setDate(d.getDate()-1);
        document.cookie = "uname = " + uname1 + "; expires=" + d.toUTCString()+"; path=/";
        document.cookie = "pwd = " + pwd1 + "; expires=" + d.toUTCString()+"; path=/";

        location.href="../html/denglu.html";
        
    });
    
    // 购物车渲染
    p=new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest();
        var status =[200,304];
        xhr.onload = function(){
            if(status.indexOf(xhr.status)!=-1){
                var data =JSON.parse(xhr.responseText);
                resolve(data);
                console.log(data);
            }
        }
        xhr.open("get","../api/header.php?&uname="+uname1,true);
        xhr.send(null);
    });
    p.then(
        function(data){
            // 渲染至右上方的购物车
            function cartRanmance(data){
                var str = "";
                str+=data.map(function(item){
                  return '<li data-id="'+item.id+'">'
                            +'<div class="l">'
                                +'<a href="#" target="_blank"><img src="'+item.imgurl+'" width="42" height="42"></a>'
                            +'</div>'
                            +'<div class="c">'
                                +'<a href="#">'+item.pname+'</a>'
                            +'</div>'
                            +'<div class="r">'
                                +'<b>¥'+item.price+'</b>*'+item.qty+''
                                // +'<a href="javascript:;" onclick="G.app.cart.Facade.deleteShopCartData(this,'bb3bc83d-3a76-44f3-bf31-1124ab873e1f|1')">删除</a>'
                            +'</div>'
                        +'</li>'
                }).join(""); 
                $('.goods ul').get(0).innerHTML =str;
            }
            cartRanmance(data);
            // 计算购物车价格
            function priceRanmance(data){
                var num=0;
                var subPrice =0;
                var totlePrice =0;
                for(let i=0;i<data.length;i++){
                    num += Number(data[i].qty);
                    var qty=Number(data[i].qty);
                    var price=Number(data[i].price);
                    subPrice +=qty*price;
                    totlePrice =subPrice.toFixed(2);
                }
                
                $('.totleNum b').first().html(num);
                $('.totleNum b').last().html(num);
                $('.totlePrice').first().html(totlePrice);
                $('.totlePrice').last().html(totlePrice);
            }
            priceRanmance(data);

        }
    )
    

    
}