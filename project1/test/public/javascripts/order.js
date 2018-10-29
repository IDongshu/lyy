function getOrderList(){
    return new Promise((resolve,reject)=>{
        $.ajax({
            type:"get",
            url:"http://localhost:3000/goods/showorder",
            async:true,
            beforeSend:function(){
                var content = '<img src="../images/loading.gif" height="300px" style="margin-left:200px; "class="loading">';
                $(".Interlaced").after(content);
            },
            complete:function(){
                $(".loading").remove();
            },
            success:function(data){
                resolve(data);
            }
        })
    })
}
function renderTable(data){
    return new Promise((resolve,reject)=>{
        var content=data.order.map(function(item,idx){
            return `
                    <tr>
                        <td>
                            <input type="checkbox" class="check"/>
                            <a href="#">${item.number}</a>
                        </td>
                        <td class="center">
                            <span class="block">DeatGhost</span>
                            <span class="block">${item.time}</span>
                        </td>
                        <td width="450">
                            <span class="block">${item.recipients}</span>
                            <address>${item.address}</address>
                        </td>
                        <td class="center">
                            <span>
                                <i>￥</i>
                                <b>${item.amount}</b>
                            </span>
                        </td>
                        <td class="center">
                            <span>${item.state}</span>
                        </td>
                        <td class="center">
                            <a href="#" class="inline-block" title="查看订单"><src="../images/icon_view.gif"/></a>
                            <a class="inline-block singleDel" title="删除订单"><img src="../images/icon_trash.gif"/></a>
                        </td>
                    </tr>
            `
        }).join("");
        // console.log(content);
        $(".orderList").append(content);
        resolve();
    })
}
function coverTable(data){
    return new Promise((resolve,reject)=>{
        var content=data.order.map(function(item,idx){
            return `   
                    <tr>
                        <th>订单编号</th>
                        <th>下单时间</th>
                        <th>收件人</th>
                        <th>订单金额</th>
                        <th>订单状态</th>
                        <th>操作</th>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" class="check"/>
                            <a href="#">${item.number}</a>
                        </td>
                        <td class="center">
                            <span class="block">DeatGhost</span>
                            <span class="block">${item.time}</span>
                        </td>
                        <td width="450">
                            <span class="block">${item.recipients}</span>
                            <address>${item.address}</address>
                        </td>
                        <td class="center">
                            <span>
                                <i>￥</i>
                                <b>${item.amount}</b>
                            </span>
                        </td>
                        <td class="center">
                            <span>${item.state}</span>
                        </td>
                        <td class="center">
                            <a href="#" class="inline-block" title="查看订单"><src="../images/icon_view.gif"/></a>
                            <a class="inline-block singleDel" title="删除订单" ><img src="../images/icon_trash.gif"/></a>
                        </td>
                    </tr>
            `
        }).join("");
        $(".orderList").html(content);
        // resolve();
    })
}


// 按住查询
$(".tdBtn").click(function(){
    $.ajax({
        type:"post",
        url:"http://localhost:3000/goods/findorder",
        data:{
            number:$("#num").val()
        },
        async:true,
        success:function(data){
            if(data.order.length>0){
                coverTable(data);
            }else{
                alert("不存在该订单");
            }
        }
    });
});


// 操作
function operate(){
    let checkboxs = document.querySelectorAll(".check");//所有单选
    let tbody = document.querySelector(".orderList");
    let trs = document.querySelectorAll("tbody tr");//所有商品
    let del = document.querySelector("#del");//全选旁边的checkbox
    let btnDel = document.querySelector("#btnDel");

    function checkAllStatus(){
        for(var i=0;i<checkboxs.length;i++){

            if(!checkboxs[i].checked){
                break;
            }
        }
            
        del.checked = i === checkboxs.length;
    }

    del.onclick = function(){
        for(let i=0;i<checkboxs.length;i++){
                checkboxs[i].checked = this.checked;
                trs[i+1].classList[this.checked?'add':'remove']('trbgcolor');
        }
    }


    btnDel.onclick = function(){
        let checkAll =$(".check:checked").get();//获得当前被选中的

        for(let i=0;i<checkAll.length;i++){
            let curId = checkAll[i].nextElementSibling.innerHTML;

             $.ajax({
                type:"post",
                url:"http://localhost:3000/goods/removeorder",
                data:{
                    number:curId
                },
                async:true,
                success:function(data){
                    if(data){
                       location.href=location.href;  
                    }
                }
            });
            
        }
    }

    tbody.onclick = function(e){
        let target = e.target;
        console.log(target);
        if(target.classList.contains ("check")){
            var curTr = target.parentElement.parentElement;
            curTr.classList[target.checked?'add':'remove']('trbgcolor');

            checkAllStatus();
        }
        
        if(target.parentElement.classList.contains("singleDel")){
            var curTr = target.parentElement.parentElement.parentElement;
            var curId = curTr.children[0].children[1].innerHTML;
            $.ajax({
                type:"post",
                url:"http://localhost:3000/goods/removeorder",
                data:{
                    number:curId
                },
                async:true,
                success:function(data){
                    if(data){
                        location.href=location.href;  
                    }else{alert("删除失败");}
                }
            });
            
            // 重新渲染表格就好。
        }

        // if(e.target.parentElement.className =="singleEdit"){
        //     // 将数据带过去
        //     var curTr = target.parentElement.parentElement.parentElement;
        //     var curId = curTr.children[0].children[0].children[1].innerHTML;

        //     var goods ={
        //         myid:curId,
        //         imgurl:curTr.children[1].children[0].src,
        //         name:curTr.children[2].children[0].innerHTML,
        //         vprice:curTr.children[3].children[0].children[1].innerHTML,
        //         nprice:curTr.children[4].children[0].children[1].innerHTML,
        //         qty:curTr.children[5].children[0].children[0].innerHTML
        //     };

        //     var params = "";
        //     for(var key in goods){
        //             params += key + '=' +goods[key] + '&'
        //     }
        //     params= params.slice(0,-1);

        //     location.href = '../page/editProduct.html?' + encodeURI(params);            
        // }
    }



}

getOrderList().then(renderTable).then(operate);
