
        var ul = document.querySelector(".goods_list ul");

        p=new Promise(function(resolve,reject){
            var  xhr = new XMLHttpRequest();
            var status =[200,304];
            xhr.onload = function(){
                if(status.indexOf(xhr.status)!=-1){
                    var data =JSON.parse(xhr.responseText);
                   
                    // console.log(mydata);
                    resolve(data);
                      
                }
            }
            xhr.open("get","../api/liebiaoye.php",true);
            xhr.send(null);
        });
        // 删除打开新窗口target="_blank"
        p.then(
            function(data){
                // 渲染页面
                function middleRomance(data){
                    var str = "";
                    str+=data.map(function(item){  
                     return '<li data-id="'+item.id+'"class="product_item j_product" _type="0" _productid="1531127">'
                            +'<div class="p_img clearfix">'
                                +'<a href="#" >'
                                    +'<img src="'+item.imgurl+'" width="290" height="290"+ class="j_product_img">'
                                +'</a>'
                            +'</div>'      
                            +'<div class="p_info clearfix">'
                                +'<div class="p_name"><a href="#" >'+item.pname+'</a></div>'
                                +'<div class="p_price">'
                                    +'<span class="price">'
                                        +'<strong>¥'+item.price+'</strong>'
                                    +'</span>'       
                                +'</div>'
                            +'</div>'
                            +'<div class="p-buy">'
                                +'<span>'+item.introduce+'</span>'
                                +'<a class="btn-buy" href="javascript:;">加入购物车</a>'
                            +'</div>'
                        +'</li>'
                     }).join(""); 
                    ul.innerHTML=str;
                    // console.log("xuran");
                }
                middleRomance(data);

                //hover item
                function itemHover(){
                    var productItem=document.querySelectorAll("ul .product_item");
                    // console.log(productItem);

                    for(let i=0;i<productItem.length;i++){
                        $currentItem=$(productItem[i]);
                        // console.log($currentItem);
                        showSon($currentItem,'current');
                    }
                }
                itemHover();

                // 默认排序
                // var moren = document.querySelector(".moren");
                // console.log(moren);
                // moren.onclick=function(){
                //     middleRomance(mydata);
                //     console.log(mydata);
                // }
                // 
                // 点击图片，跳转到详情页并把点击的商品信息组合成对象传过去。
                function skip(){
                        var pImgAll=document.querySelectorAll(".p_img a img");
                        // a标签也能跳，待做
                        var aAll=document.querySelectorAll(".p_name a");
                        // console.log(pImgAll,aAll);
                        for(let i=0;i<pImgAll.length;i++){
                            pImgAll[i].onclick = function(e){
                                // console.log(e.target);
                                if(e.target.tagName.toLowerCase()=="img"){

                                    var currentLi= e.target.parentElement.parentElement.parentElement;
                                                
                                    var goods = {
                                        id:currentLi.dataset.id,
                                        imgurl: e.target.src,
                                        name:currentLi.children[1].children[0].children[0].innerHTML,
                                        price:currentLi.children[1].children[1].children[0].children[0].innerHTML,
                                        introduce:currentLi.children[2].children[0].innerHTML,
                                        qty:1
                                    }
                                    // console.log(goods);
                                    var params = "";
                                    for(var key in goods){
                                        params += key + '=' +goods[key] + '&'
                                    }
                                    params= params.slice(0,-1);
                                    console.log(goods.price);
                                    location.href = 'xiangqingye.html?' + encodeURI(params);
                                }   
                            }
                            
                        }  
                }
                skip();

                // 升序降序
                var itemPrice = document.querySelector(".price");
                var show ="true";
                itemPrice.onclick = function(){
                    if(show){
                        data = data.sort(function(a,b){
                            return a.price-b.price;
                        }); 
                    }else{
                        data = data.sort(function(a,b){
                            return b.price-a.price;
                        });
                    }
                    middleRomance(data);
                    skip();
                    show =!show;            
                }

                // 点击加入购物车
                ul.onclick = function(e){
                    if(e.target.className === "btn-buy"){
                        var curLi = e.target.parentElement.parentElement;
                        var curId = curLi.dataset.id;
                        var imgurl = curLi.children[0].children[0].children[0].src;
                        var pname = curLi.children[1].children[0].children[0].innerHTML;
                        var price = curLi.children[1].children[1].children[0].children[0].innerHTML.substring(1);
                        var uname;
                        var cookies= document.cookie;
                        if(cookies.length> 0){
                            cookies = cookies.split('; ');
                            cookies.forEach(function(item){
                                var arr = item.split('=');
                                if(arr[0] === 'uname'){
                                    uname=arr[1]; 
                                }
                            });
                        }else {
                            return;
                        }
                        
                        $.ajax({
                            url: '../api/xiangqingye.php',
                            type: 'GET',
                            data: {
                                uname: uname1,
                                imgurl:imgurl,
                                pname:pname,
                                price:price,
                                qty:"1",
                                id:curId
                            },
                            success: function(data){
                                 // 购物车渲染
                                p=new Promise(function(resolve,reject){
                                    var xhr = new XMLHttpRequest();
                                    var status =[200,304];
                                    xhr.onload = function(){
                                        if(status.indexOf(xhr.status)!=-1){
                                            var data =JSON.parse(xhr.responseText);
                                            resolve(data);
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
                        })
                    }
                }

                $('.big img').on('click',function(){
                    alert('请点击下面的商品列表，转到详情页');
                });
                $('.medium img').first().on('click',function(){
                    alert('请点击下面的商品列表，转到详情页');
                });
                $('.medium img').last().on('click',function(){
                    alert('请点击下面的商品列表，转到详情页');
                });
                $('.small img').first().on('click',function(){
                    alert('请点击下面的商品列表，转到详情页');
                });
                $('.small img').last().on('click',function(){
                    alert('请点击下面的商品列表，转到详情页');
                });
            }
        )





// 点击btn-buy 渲染至右上方的小购物车和打购物车 (有时间就做)
                        

