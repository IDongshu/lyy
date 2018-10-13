<?php
    $uname = isset($_GET["uname"])? $_GET["uname"] : "";
    
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'yiguo';
    $conn = new mysqli($servername, $username, $password, $dbname);
    // header ( "Content-Type: textml; charset=UTF-8" );

    mysqli_query($conn,"set names UTF8");
    $conn->set_charset('utf-8');

    // 查询当前用户所有信息
    $sql="select * from cart where uname =$uname ";

    $result=$conn->query($sql);

    $res=$result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($res,JSON_UNESCAPED_UNICODE);
        
    $result->close();
    $conn->close();


?>