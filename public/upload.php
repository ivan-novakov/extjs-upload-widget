<?php
/**
 * Example processing of raw PUT/POST uploaded files.
 * File metadata may be sent through appropriate HTTP headers:
 *   - file name - the 'X-File-Name' proprietary header
 *   - file size - the standard 'Content-Length' header or the 'X-File-Size' proprietary header
 *   - file type - the standard 'Content-Type' header or the 'X-File-Type' proprietary header
 * 
 * Raw data are read from the standard input.
 * The response should be a JSON encoded string with these items:
 *   - success (boolean) - if the upload has been successful
 *   - message (string) - optional message, useful in case of error
 */
require __DIR__ . '/_common.php';
$config = require __DIR__ . '/_config.php';

/*
 * You should check these values for XSS or SQL injection.
 */
if (!isset($_SERVER['HTTP_X_FILE_NAME'])) {
    _error('Unknown file name');
}
$fileName = $_SERVER['HTTP_X_FILE_NAME'];
if (isset($_SERVER['HTTP_X_FILENAME_ENCODER']) && 'base64' == $_SERVER['HTTP_X_FILENAME_ENCODER']) {
    $fileName = base64_decode($fileName);
}
$fileName = htmlspecialchars($fileName);

$mimeType = htmlspecialchars($_SERVER['HTTP_X_FILE_TYPE']);
$size = intval($_SERVER['HTTP_X_FILE_SIZE']);


$inputStream = fopen('php://input', 'r');
$outputFilename = $config['upload_dir'] . '/' . $fileName;
$realSize = 0;
$data = '';

if ($inputStream) {
    if (! $config['fake']) {
        $outputStream = fopen($outputFilename, 'w');
        if (! $outputStream) {
            _error('Error creating local file');
        }
    }
    
    while (! feof($inputStream)) {
        $bytesWritten = 0;
        $data = fread($inputStream, 1024);
        
        if (! $config['fake']) {
            $bytesWritten = fwrite($outputStream, $data);
        } else {
            $bytesWritten = strlen($data);
        }
        
        if (false === $bytesWritten) {
            _error('Error writing data to file');
        }
        $realSize += $bytesWritten;
    }
    
    if (! $config['fake']) {
        fclose($outputStream);
    }
} else {
    _error('Error reading input');
}

if ($realSize != $size) {
    _error('The actual size differs from the declared size in the headers');
}

_log(sprintf("[raw] Uploaded %s, %s, %d byte(s)", $fileName, $mimeType, $realSize));
_response();
