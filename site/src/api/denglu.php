<?php
    $uname = isset($_GET["uname"])?  $_GET["uname"] : "";
    $pwd = isset($_GET["pwd"])?  $_GET["pwd"] : "";

    
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'yiguo';
    $conn = new mysqli($servername, $username, $password, $dbname);
    

    $conn->set_charset('utf-8');
    $sql='select * from denglu ';
    $result=$conn->query($sql);
    $res=$result->fetch_all(MYSQLI_ASSOC);
    
    // echo $uname;
    // echo $pwd;
    foreach($res as $item){  
        if($item ['uname'] == $uname && $item ['pwd']== $pwd){
            echo "true";
            break;
        }
    }
        
    $result->close();
    $conn->close();


?>