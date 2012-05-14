File upload widget for ExtJS v4.1
=================================

Features
---------

  - uses the native File API
  - uploads multiple files at one pick
  - supports asynchronous (simultaneous) upload

Usage
-----

    var dialog = Ext.create('Ext.ux.upload.Dialog', {
        dialogTitle: 'My Upload Widget',
        uploadUrl: 'upload.php'
    });
    
    dialog.show();

Demo
----

  - [Demo included in this repository](http://debug.cz/demo/upload/)


Documentation
-------------

  - [API Docs](http://debug.cz/demo/upload/docs/)
  
TODO
----

  - remove some hard-coded parts
  - add more uploader implementations
  - add drag'n'drop support
  - improve documentation
  
License
-------

  - [FreeBSD License](http://debug.cz/license/freebsd)