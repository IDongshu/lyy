$name=$("#name");
$vprice=$("#vprice");
$nprice=$("#nprice");
$qty=$("#qty"); 
$id=$("#id");
$imgurl=$("#imgurl");

if(location.search.length>1){
    
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

    $name.val(paramsObj.name);
    $vprice.val(paramsObj.vprice);
    $nprice.val(paramsObj.nprice);
    $qty.val(paramsObj.qty);
    $id.val(paramsObj.myid);
    $imgurl.attr("src",paramsObj.imgurl);


    $(".tdBtn").click(function(){
        if($id.val()!="" && $imgurl.attr("src")!="" && $name.val()!="" && $vprice.val()>0 && $nprice.val()>0 && $qty.val()>=0){
                $.ajax({
                type:"post",
                url:"http://localhost:3000/goods/updateproduct",
                data:{
                    myid:$id.val(),
                    imgurl:$imgurl.attr("src"),
                    name:$name.val(),
                    vprice:$vprice.val(),
                    nprice:$nprice.val(),
                    qty:$qty.val()
                },
                async:true,
                success:function(data){
                    console.log(data);
                }
            });
            alert("更新成功");
        }else {
            alert("请输入有效值");
        }
    }) 

}else{
    $id.removeAttr("disabled");
    // 产品id的查重
    $id.blur(function(){
        $.ajax({
            type:"post",
            url:"http://localhost:3000/goods/findproduct",
            data:{
                myid:$id.val()
            },
            async:true,
            success:function(data){
                if(data.product.length>0){
                    $(".tip").css("display","block");
                }
            }
        })
    });
    $id.focus(function(){
        $(".tip").css("display","none");
    });


    // 点击提交
    $(".tdBtn").click(function(){
        console.log($id.val());
        if($id.val()!="" && $imgurl.attr("src")!="" && $name.val()!="" && $vprice.val()>0 && $nprice.val()>0 && $qty.val()>=0){
            $.ajax({
                    type:"post",
                    url:"http://localhost:3000/goods/addproduct",
                    data:{
                        myid:$id.val(),
                        imgurl:$imgurl.attr("src"),
                        name:$name.val(),
                        vprice:$vprice.val(),
                        nprice:$nprice.val(),
                        qty:$qty.val()
                    },
                    async:true,
                    success:function(data){
                        console.log(data);
                    }
            });
            alert("已插入数据库");
            $(".textBox").val("");
            $imgurl.attr("src",);
        }else{
            alert("添加失败,请填写完信息");
        }
    }) 
}
// 图片的上传
var fileNode = document.getElementById("suoluetu");
    fileNode.onchange = function () {
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function () {
          
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var data="../uploads/"+xmlhttp.responseText;
                $imgurl.attr("src",data);
            }
        }

        var data = new FormData();
        data.append("avatar", fileNode.files[0]);

        xmlhttp.open("post", "http://localhost:3000/goods/uploads", true);
        xmlhttp.send(data);
        fileNode.value = null;
    }

