function getCustomerList(){
    return new Promise((resolve,reject)=>{
        $.ajax({
            type:"get",
            url:"http://localhost:3000/goods/showcustomer",
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
        var content=data.customer.map(function(item,idx){
            return `<tr>
                        <td>
                            <input type="checkbox" class="check"/>
                            <span class="middle">${item.myid}</span>
                        </td>
                        <td class="center">${item.nickname}</td>
                        <td class="center">${item.email}</td>
                        <td class="center">${item.phone}</td>
                        <td class="center"><img src="../images/yes.gif"/></td>
                        <td class="center">
                            <span>
                                <i>￥</i>
                                <b>${item.spending}</b>
                            </span>
                        </td>
                        <td class="center">
                            <span>
                                <i>￥</i>
                                <b>3000</b>
                            </span>
                        </td>
                        <td class="center">${item.date}</td>
                        <td class="center">
                            <a href="javascript:;" class="inline-block" title="编辑"><img src="../images/icon_edit.gif"/></a>
                            <a href="javascript:;" class="inline-block" title="资金管理"><img src="../images/icon_account.gif"/></a>
                             <a class="inline-block singleDel" title="删除"><img src="../images/icon_drop.gif"/></a>
                        </td>
                    </tr>
                `
        }).join("");
        // console.log(content);
        $(".customerList").append(content);
        resolve();
    })
}

function coverTable(data){
    return new Promise((resolve,reject)=>{
        var content=data.customer.map(function(item,idx){
            return `
                    <tr>
                        <th class="center">编号</th>
                        <th class="center">会员昵称</th>
                        <th class="center">邮件地址</th>
                        <th class="center">手机号码</th>
                        <th class="center">是否验证</th>
                        <th class="center">消费金额</th>
                        <th class="center">充值金额</th>
                        <th class="center">注册日期</th>
                        <th class="center">操作</th>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" class="check"/>
                            <span class="middle">${item.myid}</span>
                        </td>
                        <td class="center">${item.nickname}</td>
                        <td class="center">${item.email}</td>
                        <td class="center">${item.phone}</td>
                        <td class="center"><img src="../images/yes.gif"/></td>
                        <td class="center">
                            <span>
                                <i>￥</i>
                                <b>${item.spending}</b>
                            </span>
                        </td>
                        <td class="center">
                            <span>
                                <i>￥</i>
                                <b>3000</b>
                            </span>
                        </td>
                        <td class="center">${item.date}</td>
                        <td class="center">
                            <a href="edit_user.html" class="inline-block" title="编辑"><img src="../images/icon_edit.gif"/></a>
                            <a href="account.html" class="inline-block" title="资金管理"><img src="../images/icon_account.gif"/></a>
                             <a class="inline-block singleDel" title="删除"><img src="../images/icon_drop.gif"/></a>
                        </td>
                    </tr>
                `
        }).join("");
        // console.log(content);
        $(".customerList").html(content);
        resolve();
    })
}

// 按住查询
$(".tdBtn").click(function(){
    $.ajax({
        type:"post",
        url:"http://localhost:3000/goods/findcustomer",
        data:{
            phone:$("#phone").val()
        },
        async:true,
        success:function(data){
            if(data.customer.length>0){
                coverTable(data);
            }else{
                alert("请输入手机号");
            }
        }
    });
});
                           
function operate(){
    let checkboxs = document.querySelectorAll(".check");//所有单选
    let tbody = document.querySelector(".customerList");
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
            let curTr = checkAll[i].parentElement.parentElement;
            let curPhone = curTr.children[3].innerHTML;
            console.log(curPhone);
             $.ajax({
                type:"post",
                url:"http://localhost:3000/goods/removecustomer",
                data:{
                    phone:curPhone
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
            var curPhone = curTr.children[3].innerHTML;
            $.ajax({
                type:"post",
                url:"http://localhost:3000/goods/removecustomer",
                data:{
                    phone:curPhone
                },
                async:true,
                success:function(data){
                    if(data){
                        location.href=location.href;  
                    }else{alert("删除失败");}
                }
            });
        }
    }



}


















getCustomerList().then(renderTable).then(operate);                        