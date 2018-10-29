
function getProductList(){
    return new Promise((resolve,reject)=>{
        $.ajax({
            type:"get",
            url:"http://localhost:3000/goods/showproduct",
            beforeSend:function(){
                var content = '<img src="../images/loading.gif" height="300px" style="margin-left:200px; "class="loading">';
                $(".Interlaced").after(content);
            },
            async:true,
            complete:function(){
                $(".loading").remove();
            },
            success:function(data){
                resolve(data);
            }
        })
    })
}

//追加
function renderTable(data){
    return new Promise((resolve,reject)=>{
        var content=data.product.map(function(item,idx){
            return `
                    <tr>
                        <td class="bianhao">
                            <span>
                                <input type="checkbox" class="middle children-checkbox">
                                <i>${item.myid}</i>
                            </span>
                        </td>
                        <td class="center pic-area"><img src=${item.imgurl} class="thumbnail"></td>
                        <td class="td-name">
                            <span class="ellipsis td-name block">${item.name}</span>
                        </td>
                        <td class="center sameWidth1">
                            <span>
                                <i>￥</i>
                                <em>${item.vprice}</em>
                            </span>
                        </td>
                        <td class="center sameWidth1">
                            <span>
                                <i>￥</i>
                                <em>${item.nprice}</em>
                            </span>
                        </td>
                        <td class="center sameWidth1">
                            <span>
                                <em>${item.qty}</em>
                                <i>件</i>
                            </span>
                        </td>
                        <td class="center sameWidth2"><img src="../images/yes.gif"></td>
                        <td class="center sameWidth2"><img src="../images/no.gif"></td>
                        <td class="center sameWidth2"><img src="../images/yes.gif"></td>
                        <td class="center caozuo">
                            <a class="singleCheck" title="查看" target="_blank"><img src="../images/icon_view.gif"></a>
                            <a class="singleEdit" title="编辑"><img src="../images/icon_edit.gif"></a>
                            <a class="singleDel" title="删除"><img src="../images/icon_drop.gif"></a>
                        </td>
                    </tr>
                `
        }).join("");
        
        $(".productList").append(content);
        resolve();
    })
}
// 覆盖
function coverTable(data){
    return new Promise((resolve,reject)=>{
        var content=data.product.map(function(item,idx){
            return `
                    <tr >
                        <th class="center bianhao">ID编号</th>
                        <th class="center pic-area">产品</th>
                        <th class="center td-name">名称</th>
                        <th class="center sameWidth1">会员价</th>
                        <th class="center sameWidth1">市场价</th>
                        <th class="center sameWidth1">库存</th>
                        <th class="center sameWidth2">精品</th>
                        <th class="center sameWidth2">新品</th>
                        <th class="center sameWidth2">热销</th>
                        <th class="center caozuo">操作</th>
                    </tr>
                    <tr>
                        <td class="bianhao">
                            <span>
                                <input type="checkbox" class="middle children-checkbox">
                                <i>${item.myid}</i>
                            </span>
                        </td>
                        <td class="center pic-area"><img src=${item.imgurl} class="thumbnail"></td>
                        <td class="td-name">
                            <span class="ellipsis td-name block">${item.name}</span>
                        </td>
                        <td class="center sameWidth1">
                            <span>
                                <i>￥</i>
                                <em>${item.vprice}</em>
                            </span>
                        </td>
                        <td class="center sameWidth1">
                            <span>
                                <i>￥</i>
                                <em>${item.nprice}</em>
                            </span>
                        </td>
                        <td class="center sameWidth1">
                            <span>
                                <em>${item.qty}</em>
                                <i>件</i>
                            </span>
                        </td>
                        <td class="center sameWidth2"><img src="../images/yes.gif"></td>
                        <td class="center sameWidth2"><img src="../images/no.gif"></td>
                        <td class="center sameWidth2"><img src="../images/yes.gif"></td>
                        <td class="center caozuo">
                            <a class="singleCheck" title="查看" target="_blank"><img src="../images/icon_view.gif"></a>
                            <a class="singleEdit" title="编辑"><img src="../images/icon_edit.gif"></a>
                            <a class="singleDel" title="删除"><img src="../images/icon_drop.gif"></a>
                        </td>
                    </tr>
            `
        }).join("");
        $(".productList").html(content);
        resolve();
    });
};



$(".tdBtn").click(function(){
    $.ajax({
        type:"post",
        url:"http://localhost:3000/goods/findproduct",
        data:{
            myid:$("#getId").val()
        },
        async:true,
        success:function(data){
            if(data.product.length>0){
                coverTable(data);
            }else{alert("不存在该商品");}
        }
    });
});



function operate(){
    let tbody = document.querySelector(".productList");
    let checkboxs = document.querySelectorAll("tbody .children-checkbox");//所有单选
    let trs = document.querySelectorAll("tbody tr");//所有商品
    let del = document.querySelector("#del");//全选旁边的checkbox
    let btnDel = document.querySelector("#btnDel");
    // console.log(tbody,checkboxs);
    // 判断全选的个数
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
    
    tbody.onclick = function(e){
        let target = e.target;
        if(target.classList.contains ("children-checkbox")){
            var curTr = target.parentElement.parentElement.parentElement;
            curTr.classList[target.checked?'add':'remove']('trbgcolor');

            checkAllStatus();
        }

        if(target.parentElement.className == "singleDel"){
            var curTr = target.parentElement.parentElement.parentElement;
            var curId = curTr.children[0].children[0].children[1].innerHTML;
            $.ajax({
                type:"post",
                url:"http://localhost:3000/goods/removeproduct",
                data:{
                    myid:curId
                },
                async:true,
                success:function(data){
                    console.log(data);
                }
            });
            location.href=location.href;
            // 重新渲染表格就好。
        }

        if(e.target.parentElement.className =="singleEdit"){
            // 将数据带过去
            var curTr = target.parentElement.parentElement.parentElement;
            var curId = curTr.children[0].children[0].children[1].innerHTML;

            var goods ={
                myid:curId,
                imgurl:curTr.children[1].children[0].src,
                name:curTr.children[2].children[0].innerHTML,
                vprice:curTr.children[3].children[0].children[1].innerHTML,
                nprice:curTr.children[4].children[0].children[1].innerHTML,
                qty:curTr.children[5].children[0].children[0].innerHTML
            };

            var params = "";
            for(var key in goods){
                    params += key + '=' +goods[key] + '&'
            }
            params= params.slice(0,-1);

            location.href = '../page/editProduct.html?' + encodeURI(params);            
        }
    }

    btnDel.onclick = function(){
        let checkAll =$(".children-checkbox:checked").get();//获得当前被选中的
        for(let i=0;i<checkAll.length;i++){
            let curId = checkAll[i].nextElementSibling.innerHTML;
            // console.log(curId);
             $.ajax({
                type:"post",
                url:"http://localhost:3000/goods/removeproduct",
                data:{
                    myid:curId
                },
                async:true,
                success:function(data){
                    console.log(data);
                }
            });
            location.href=location.href;
        }
    }



}


getProductList().then(renderTable).then(operate);