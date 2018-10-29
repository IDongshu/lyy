function getOrder(){
    return new Promise(function(resolve,reject){
         $.ajax({
            type:"get",
            url:"http://localhost:3000/goods/showorder",
            async:true,
            success:function(data){
                resolve(data);
            }
        })
    })
}

function renderOrder(data){
    var paid=0;
    var unpaid=0;
    var param = data.order;
    $(".allOrder").html(param.length);
    param.map(function(item){
        if(item.state === "已付款"){
            paid++;
        }else if(item.state === "未付款"){
            unpaid++;
        }
    });
    $(".paidOrder").html(paid);
    $(".unpaidOrder").html(unpaid);
}

getOrder().then(renderOrder);

function getProduct(){
    return new Promise(function(resolve,reject){
        $.ajax({
            type:"get",
            url:"http://localhost:3000/goods/showproduct",
            async:true,
            success:function(data){
                resolve(data);
            }
        })
    })
}
function renderProduct(data){
    var kind=0;
    var all=0;
    var param = data.product;
    param.map(function(item){
        kind++;
        var qty = Number(item.qty);
        all += qty;
    });
    $(".kindGoods").html(kind);
    $(".allGoods").html(all);
}

getProduct().then(renderProduct);

function getCustomer(){
    return new Promise(function(resolve,reject){
        $.ajax({
            type:"get",
            url:"http://localhost:3000/goods/showcustomer",
            async:true,
            success:function(data){
                resolve(data);
            }
        })
    })
}
function renderCustomer(data){
    var member =0;
    var average=0;
    var param = data.customer;
    param.map(function(item){
        member++;
        var single = Number(item.spending);
        average +=single;
    })
    average = average/member;
    $(".member").html(member);
    $(".average").html(average);
}

getCustomer().then(renderCustomer);