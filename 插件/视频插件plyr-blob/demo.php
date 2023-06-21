<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: text/plain');

    $file = 'ts/boss.m3u8';
    $str = file_get_contents($file);
    die($str);
    //http://localhost:8822/blob/demo.php
    //http://localhost:8822/blob/ts/demo.m3u8
    


?>