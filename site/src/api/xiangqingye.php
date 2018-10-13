<?php
    $qty = isset($_GET["qty"])?  $_GET["qty"] : "";
    $uname=isset($_GET["uname"])? $_GET["uname"] : "";
    $id=isset($_GET["id"])? $_GET["id"] : "";
    $imgurl = isset($_GET["imgurl"])? $_GET["imgurl"] : "";
    $pname = isset($_GET["pname"])? $_GET["pname"] : "";
    $price = isset($_GET["price"])? $_GET["price"] : "";
    
    $severname = "localhost";
    $username = "root";
    $password = "";
    $dbname = "yiguo";
    $conn = new mysqli($severname,$username,$password,$dbname);
    $conn->set_charset('utf8');
    mysqli_query($conn,"set names UTF8");

    // 查看是否已经有或者没有(详情页需要)
    if($uname !="" && $imgurl != "" && $pname !="" && $price!= "" && $qty !="" && $id !=""){
        $result = $conn->query("select * from cart where uname = $uname and id=$id ");
        $res = $result->fetch_all(MYSQLI_ASSOC);
        $result->close();

        if($res){
            $qty = $res[0]["qty"];
            $qty++;
            $conn->query("update cart set qty=$qty where uname=$uname and id=$id");
            echo $qty;
        }else{
            $conn->query("insert into cart (uname,imgurl,pname,price,qty,id) values ('$uname','$imgurl','$pname','$price','$qty','$id')");
            echo "true";
        }
    }
    $conn->close();
?>