<?php
    $uname = isset($_GET["uname"])? $_GET["uname"] : "";
    $qty = isset($_GET["qty"])? $_GET["qty"] : "";
    $id = isset($_GET["id"])? $_GET["id"] : "";

    $severname = "localhost";
    $username = "root";
    $password = "";
    $dbname = "yiguo";
    $conn = new mysqli($severname,$username,$password,$dbname);
    mysqli_query($conn,"set names UTF8");
    $conn->set_charset('utf8');
    

     // 删除当前用户所有的商品
    if($uname != "" && $qty == "" && $id==""){
        
        $result = $conn->query("delete from cart where uname = $uname");

        if($result){
            echo "true";
        }else {
            echo "false";
        }
    }
    // 删除当前用户指定产品
    if($uname != "" && $qty == "" && $id !=""){
        
        $result = $conn->query("delete from cart where uname = $uname and id = $id");

        if($result){
            echo "true1";
        }else {
            echo "false";
        }
    }
?>