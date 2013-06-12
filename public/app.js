Ext.Loader.setPath({
    'Ext.ux' : 'external'
});

Ext.application({

    requires : [
        'Ext.ux.upload.Dialog'
    ],

    name : 'Example',

    appFolder : 'app',

    launch : function() {
        debug = console;

        Ext.create('Ext.container.Viewport', {
            layout : 'fit'
        });

        var appPanel = Ext.create('Ext.window.Window', {
            title : 'Files',
            width : 600,
            height : 400,
            closable : false,
            modal : true,
            bodyPadding : 5,
            dockedItems : [
                {
                    xtype : 'toolbar',
                    dock : 'top',
                    items : [
                        {
                            xtype : 'button',
                            text : 'Upload files',
                            handler : function() {

                                var uploadPanel = Ext.create('Ext.ux.upload.Panel', {
                                	//uploader: 'Ext.ux.upload.uploader.DummyUploader',
                                	
                                    uploadUrl : 'upload.php',
                                    uploader : 'Ext.ux.upload.uploader.ExtJsUploader',
                                    
                                	//uploadUrl : 'upload_multipart.php',
                                    //uploader: 'Ext.ux.upload.uploader.FormDataUploader'
                                });

                                var uploadDialog = Ext.create('Ext.ux.upload.Dialog', {
                                    dialogTitle : 'My Upload Dialog',
                                    panel : uploadPanel,

                                    listeners : {
                                        'uploadcomplete' : {
                                            scope : uploadDialog,
                                            fn : function(upDialog, manager, items, errorCount) {

                                                var output = 'Uploaded files: <br>';
                                                Ext.Array.each(items, function(item) {
                                                    output += item.getFilename() + ' (' + item.getType() + ', '
                                                        + Ext.util.Format.fileSize(item.getSize()) + ')' + '<br>';
                                                });

                                                appPanel.update(output);

                                                if (!errorCount) {
                                                    this.close();
                                                }

                                            }
                                        }
                                    }
                                });

                                uploadDialog.show();
                            }
                        }
                    ]
                }
            ]
        });

        appPanel.show();
    }
});