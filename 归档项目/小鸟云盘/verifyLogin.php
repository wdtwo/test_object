<?php

$data = [];

if($_POST){
    $data["statusCode"] = "400";
    $data["message"] = "用戶名或密碼不正確";
}else{
     $data["statusCode"] = "404";
    $data["message"] = "請求的接口不存在";
}

echo json_encode($data);die;