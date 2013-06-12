<?php
/*
 * Simple example backend script to serve the FormDataUploader (multipart upload). 
 */
require __DIR__ . '/_common.php';
$config = require __DIR__ . '/_config.php';

$fileName = '';
$mimeType = '';
$fileSize = 0;

/*
 * If there is no file data, something wrong has happened. One possible reason is - the uploaded
 * file size exceeds the maximum allowed POST or upload size.
 */
if (empty($_FILES)) {
    _error('No file received');
}

foreach ($_FILES as $fileName => $fileData) {
    if ($fileData['error'] !== 0) {
        _error(sprintf("Upload error '%d'", $fileData['error']));
    }
    
    $fileName = htmlspecialchars($fileData['name']);
    $mimeType = $fileData['type'];
    $fileSize = $fileData['size'];
    
    $targetFile = $config['upload_dir'] . '/' . $fileName;
    
    if (! $config['fake']) {
        if (! move_uploaded_file($fileData['tmp_name'], $targetFile)) {
            _error('Error saving uploaded file');
        }
    }
}

_log(sprintf("[multipart] Uploaded %s, %s, %d byte(s)", $fileName, $mimeType, $fileSize));
_response();
