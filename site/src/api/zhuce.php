<?php
    $uname = isset($_GET["uname"])?  $_GET["uname"] : "";
    $pwd = isset($_GET["pwd"])?  $_GET["pwd"] : "";

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'yiguo';
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    echo $uname;
    echo $pwd;
    $conn->set_charset('utf-8');
    
    if($uname!= "" && $pwd!=""){
        
        $sql='insert into denglu value("'.$uname.'","'.$pwd.'")';

        if($conn->query($sql)){
            echo "true";
        }else{
            echo "false";
        }
    }else{
        echo "no insert";
    }

    $conn->close();


?>