<?php
/**
 * Example processing of raw PUT/POST uploaded files.
 * File metadata should be sent through appropriate HTTP headers. Raw data are read from the standard input.
 * The response should be a JSON encoded string with these items:
 *   - success (boolean) - if the upload has been successful
 *   - message (string) - optional message, useful in case of error
 */

/*
 * You should check these values for XSS or SQL injection.
 */
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
} else {
    _response(false, 'Error saving file');
}

_response();

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