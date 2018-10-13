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
    
    // 更新商品数量
    if($qty != "" && $id != ""){
        $result = $conn->query("update cart set qty= $qty where uname=$uname and id=$id");
        if($result){
            echo $qty;
        }else {
            echo "false";
        }
    }
    $conn->close()
    
?>