<?php

//---
function _log ($value)
{
    error_log(print_r($value, true));
}


function _response ($success = true, $message = 'OK')
{
    $response = array(
        'success' => $success, 
        'message' => $message
    );
    
    echo json_encode($response);
    exit();
}
//---

_log($_SERVER);

$mimeType = $_SERVER['HTTP_X_FILE_TYPE'];
$size = $_SERVER['HTTP_X_FILE_SIZE'];
$fileName = $_SERVER['HTTP_X_FILE_NAME'];

$fp = fopen('php://input', 'r');
$realSize = 0;
$data = '';

if ($fp) {
    while (! feof($fp)) {
        $data = fread($fp, 1024);
        $realSize += strlen($data);
    }
}

_response();