            //根据地址栏的信息获取上一个页面点击的商品信息
            var xImg = document.querySelector(".j_product_img");
            var summary = document.querySelector(".summary-name");
            var guige=document.querySelector(".selected a span");
            var price = document.querySelector(".pro-price div span strong");
            // console.log(xImg,summary,price);

            //裁切问号
            var params = decodeURI(location.search).slice(1);
            //组合成对象信息
            var paramsArr = params.split("&");
            var paramsObj = {};
            paramsArr.forEach(function(item){
                var arr = item.split("=");
                console.log(arr);
                paramsObj[arr[0]] = arr[1];
            });
            //找到对应的商品，赋值
            var id=paramsObj.id;
            var imgurl=paramsObj.imgurl;
            xImg.src=imgurl;
            var pname =paramsObj.name; 
            summary.children[0].innerHTML = pname;
            var qty = paramsObj.qty;
            summary.children[1].innerHTML = paramsObj.introduce;
            var pprice =  paramsObj.price.substring(1);
            guige.innerHTML = pprice;
            price.innerHTML = pprice;
            
            // console.log(id,imgurl,pname,qty,pprice);


            // 数量
            var inputNum = document.querySelector(".spinner input");
            // console.log(inputNum);
            inputNum.value=qty;

            // 点击购物车
            var gnBtn = document.querySelector(".btn-gn");
            var decrease= document.querySelector(".decrease");
            var increase = document.querySelector(".increase");
            var gnQty=inputNum.value;
            
            decrease.onclick = function(){
                  if(gnQty <= 1){
                        decrease.style.disabled="disabled";
                  }else {
                        decrease.removeAttribute("disabled");
                        gnQty--;
                  }
                  inputNum.value=gnQty;
            }
            increase.onclick = function(){
                  gnQty++;
                  inputNum.value=gnQty;
            }

            // 通过cookie找到当前用户名
            var cookies = document.cookie;
            var uname ;
            cookies = cookies.split('; ');
            if(cookies.length>0){
                  cookies.forEach(function(cookie){
                        var arr = cookie.split('=');
                        if(arr[0] === 'uname'){
                              uname=arr[1];
                        }
                  });
            }

            // 点击购物车  利用php写入用户数据库,再渲染至右上角的购物车
            gnBtn.onclick = function(){
                p=new Promise(function(resolve,reject){
                        var  xhr1 = new XMLHttpRequest();
                        var status =[200,304];
                        xhr1.onload = function(){
                            if(status.indexOf(xhr1.status)!=-1){
                                // var data =JSON.parse(xhr.responseText);
                                // resolve(data);
                                if(xhr1.responseText){
                                    resolve();
                                }else {
                                    alert("加入购物车失败");
                                }
                            }
                        }
                        xhr1.open("get","../api/xiangqingye.php?qty="+gnQty+"&uname="+uname+"&id="+id+"&imgurl="+imgurl+"&pname="+pname+"&price="+pprice,true);
                        xhr1.send(null);
                         console.log(id,imgurl,pname,qty,pprice);
                });
                p.then(
                    function(){
                        p=new Promise(function(resolve,reject){
                            var xhr = new XMLHttpRequest();
                            var status =[200,304];
                            xhr.onload = function(){
                                if(status.indexOf(xhr.status)!=-1){
                                    var data =JSON.parse(xhr.responseText);
                                    resolve(data);
                                }
                            }
                            xhr.open("get","../api/header.php?&uname="+uname,true);
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
                                // 价格渲染
                                function priceRanmance(data){
                                    var num=0;
                                    var totlePrice =0;
                                    var subPrice=0;
                                    for(let i=0;i<data.length;i++){
                                        num += Number(data[i].qty);
                                        var qty=Number(data[i].qty);
                                        var price=Number(data[i].price);
                                        console.log(qty,price,typeof qty,subPrice,totlePrice);
                                        subPrice +=(qty*price);
                                        totlePrice = subPrice.toFixed(2);
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
                )
            }