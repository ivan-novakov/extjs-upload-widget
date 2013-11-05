# File upload widget for Ext JS v4.x

## Features

  - flexible and easily integratable
  - uses the native File API (HTML5)
  - allows selecting and uploading of multiple files at once
  - supports both raw PUT/POST upload and multipart upload
  - you can easily write and integrate your own upload mechanism, while preserving all (or most) of the UI functionality
  - displays upload progress
  - supports asynchronous (simultaneous) upload

## Online demo

  - [Demo included in this repository](http://debug.cz/demo/upload/)

## Requirements

  - [Sencha Ext JS 4.x](http://www.sencha.com/products/extjs/)
  - browser supporting the [File API](http://www.w3.org/TR/FileAPI/) - see more info about [browser compatibility](http://caniuse.com/fileapi)
  - server side to process the uploaded files

## Installation

Clone the repository somewhere on your system and add the path with the prefix to `Ext.Loader`:

    Ext.Loader.setPath({
        'Ext.ux.upload' : '/my/path/to/extjs-upload-widget/lib/upload'
    });
    
## Basic usage
    
In the most simple case, you can just open the dialog and pass the `uploadUrl` paramter:  

    var dialog = Ext.create('Ext.ux.upload.Dialog', {
        dialogTitle: 'My Upload Widget',
        uploadUrl: 'upload.php'
    });
    
    dialog.show();
    
`Ext.ux.upload.Dialog` is just a simple wrapper window. The core functionality is implemented in the `Ext.uz.upload.Panel` object, so you can implement your own dialog and pass the panel:

    var myDialog = Ext.create('MyDialog', {
        items: [
            Ext.create('Ext.ux.upload.Panel', {
                uploadUrl: 'upload.php'
            });
        ]
    });

## Uploaders

The intention behind the uploaders implementation is to have the upload process decoupled from the UI as much as possible. This allows us to create alternative uploader implementations to serve our use case and at the same time, we don't need to touch the UI.

Currently, these uploaders are implemented:

  - __ExtJsUploader__ (default) - uploads the file by sending the raw file data in the body of a _XmlHttpRequest_. File metadata are sent through request HTTP headers. Actually, the standard `Ext.data.Connection` object is used with a small tweak to allow progress reporting.
  - __FormDataUploader__ - uploads the file through a _XmlHttpRequest_ as if it was submitted with a form.

Each uploader requires different processing at the backend side. Check the `public/upload.php` file for the __ExtJsUploader__ and the `public/upload_multipart.php` for the __FormDataUploader__.

## Advanced usage

The default uploader is the __ExtJsUploader__. If you want to use an alternative uploader, you need to pass the uploader class name to the upload panel:

    var panel = Ext.create('Ext.ux.upload.Panel', {
        uploader: 'Ext.ux.upload.uploader.FormDataUploader',
        uploaderOptions: {
            url: 'upload_multipart.php',
            timeout: 120*1000
        }
    });
    
Or you can pass the uploader instance:

    var panel = Ext.create('Ext.ux.upload.Panel', {
        uploader: Ext.create('Ext.ux.upload.uploader.FormDataUploader', {
            url: 'upload_multipart.php',
            timeout: 120*1000
        });
    });

## Running the example


### Requirements:

  - web server with PHP support
  - Ext JS v4.x instance

Clone the repository and make the `public` directory accessible through your web server. Open the `public/_config.php` file and set the _upload_dir_ option to point to a directory the web server can write to. If you just want to test the upload process and you don't really want to save the uploaded files, you can set the _fake_ option to true and no files will be written to the disk.

The example `index.html` expects to find the Ext JS instance in the `public/extjs` directory. You can create a link to the instance or copy it there.



## Documentation

  - [API Docs](http://debug.cz/demo/upload/docs/generated/)
  
## Other links

  - [More info in the blogpost](http://blog.debug.cz/2012/05/file-upload-widget-for-extjs-4x.html)
  - [Sencha forums post](http://www.sencha.com/forum/showthread.php?205365-File-upload-widget-using-File-API-and-Ext.data.Connection)
  
## TODO

  - add more uploader implementations
  - add drag'n'drop support
  - improve documentation
  
## License

  - [BSD 3 Clause](http://debug.cz/license/bsd-3-clause)

## Author

  - [Ivan Novakov](http://novakov.cz/)

