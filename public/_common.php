<?php

function _log($value)
{
    error_log(print_r($value, true));
}


function _response($success = true, $message = 'OK')
{
    $response = array(
        'success' => $success,
        'message' => $message
    );
    
    echo json_encode($response);
    exit();
}

function _error($message)
{
    return _response(false, $message);
}