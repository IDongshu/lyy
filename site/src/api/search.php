<?php
    $uname = isset($_GET["uname"])? $_GET["uname"] : "";

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'yiguo';
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    mysqli_query($conn,"set names UTF8");
    $conn->set_charset('utf-8');
    
    // 查询是否存在用户名
    $sql="select * from denglu where uname =$uname";
    $result=$conn->query($sql);
    $res=$result->fetch_all(MYSQLI_ASSOC);

    if($uname != ""){
        if($res == []){
            echo "false";
        }else{
            echo "true";
        }
    }
    // foreach($res as $item){ 
    //     if($item ['uname'] == $uname ){ 
    //         echo "true";
    //         break;
    //     }    
    // } 
    $result->close();
    $conn->close();


?>