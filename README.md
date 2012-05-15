File upload widget for ExtJS v4.1
=================================

Features
---------

  - uses the native File API (HTML5)
  - allows selecting multiple files at once
  - uses raw PUT/POST request with the Ext.data.Connection object (no flash, or hidden iframes)
  - displays upload progress
  - supports asynchronous (simultaneous) upload


Usage
-----

Clone the repository somewhere on your system and add the path with the prefix to Ext.Loader:

    Ext.Loader.setPath({
        'Ext.ux.upload' : '/my/path/to/extjs-upload-widget/lib/upload'
    });
    
Then you can use the dialog:    

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
  
Other links
-----------

  - [More info in the blogpost](http://blog.debug.cz/2012/05/file-upload-widget-for-extjs-4x.html)
  - [Sencha forums post](http://www.sencha.com/forum/showthread.php?205365-File-upload-widget-using-File-API-and-Ext.data.Connection)
  
TODO
----

  - remove some hard-coded parts
  - implement the main widget rather as a panel instead of a dialog for more flexibility
  - add more uploader implementations
  - add drag'n'drop support
  - improve documentation
  
License
-------

  - [FreeBSD License](http://debug.cz/license/freebsd)