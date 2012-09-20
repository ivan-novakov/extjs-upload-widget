<?php
/**
 * Example processing of raw PUT/POST uploaded files - with hint, how to save the uploaded file.
* File metadata should be sent through appropriate HTTP headers. Raw data are read from the standard input.
* The response should be a JSON encoded string with these items:
*   - success (boolean) - if the upload has been successful
*   - message (string) - optional message, useful in case of error
*/

define('UPLOAD_DIR', '/tmp/upload/');

/*
 * You should check these values for XSS or SQL injection.
*/
$mimeType = $_SERVER['HTTP_X_FILE_TYPE'];
$size = $_SERVER['HTTP_X_FILE_SIZE'];
$fileName = $_SERVER['HTTP_X_FILE_NAME'];

/*
 * Open the file you want to save the uploaded data to.
 * In real environment make sure, that:
 * - the directory exists
 * - the directory is writeable
 * - a file with the same name does not exist
 */
$target = fopen(UPLOAD_DIR . $fileName, 'w');
if (! $target) {
    _response(false, 'Error writing to file');
}

/*
 * Open the input stream.
 */
$fp = fopen('php://input', 'r');
$realSize = 0;
$data = '';

/*
 * Read data from the input stream and write them into the file.
 */
if ($fp) {
    while (! feof($fp)) {
        $data = fread($fp, 1024);
        $realSize += strlen($data);
        
        fwrite($target, $data);
    }
} else {
    _response(false, 'Error saving file');
}

fclose($target);
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