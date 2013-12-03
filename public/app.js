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

            uploadComplete : function(items) {
                var output = 'Uploaded files: <br>';
                Ext.Array.each(items, function(item) {
                    output += item.getFilename() + ' (' + item.getType() + ', '
                        + Ext.util.Format.fileSize(item.getSize()) + ')' + '<br>';
                });

                this.update(output);
            }
        });

        appPanel.syncCheckbox = Ext.create('Ext.form.field.Checkbox', {
            inputValue : true,
            checked : true
        });

        appPanel.addDocked({
            xtype : 'toolbar',
            dock : 'top',
            items : [
                {
                    xtype : 'button',
                    text : 'Raw PUT/POST Upload',
                    scope : appPanel,
                    handler : function() {

                        var uploadPanel = Ext.create('Ext.ux.upload.Panel', {
                            uploaderOptions : {
                                url : 'upload.php',
                                maxFileSize: 3000000
                            },
                            filenameEncoder : 'Ext.ux.upload.header.Base64FilenameEncoder',
                            synchronous : appPanel.syncCheckbox.getValue()
                        });

                        var uploadDialog = Ext.create('Ext.ux.upload.Dialog', {
                            dialogTitle : 'My Upload Dialog',
                            panel : uploadPanel
                        });

                        this.mon(uploadDialog, 'uploadcomplete', function(uploadPanel, manager, items, errorCount) {
                            this.uploadComplete(items);
                            if (!errorCount) {
                                uploadDialog.close();
                            }
                        }, this);

                        uploadDialog.show();
                    }
                }, '-', {
                    xtype : 'button',
                    text : 'Multipart Upload',
                    scope : appPanel,
                    handler : function() {

                        var uploadPanel = Ext.create('Ext.ux.upload.Panel', {
                            uploader : 'Ext.ux.upload.uploader.FormDataUploader',
                            uploaderOptions : {
                                url : 'upload_multipart.php',
                                maxFileSize: 3000000
                            },
                            synchronous : appPanel.syncCheckbox.getValue()
                        });

                        var uploadDialog = Ext.create('Ext.ux.upload.Dialog', {
                            dialogTitle : 'My Upload Dialog',
                            panel : uploadPanel
                        });

                        this.mon(uploadDialog, 'uploadcomplete', function(uploadPanel, manager, items, errorCount) {
                            this.uploadComplete(items);
                            if (!errorCount) {
                                uploadDialog.close();
                            }
                        }, this);

                        uploadDialog.show();
                    }
                }, '-', {
                    xtype : 'button',
                    text : 'Dummy upload',
                    scope : appPanel,
                    handler : function() {

                        var uploadPanel = Ext.create('Ext.ux.upload.Panel', {
                            uploader : 'Ext.ux.upload.uploader.DummyUploader',
                            uploaderOptions: {
                            	maxFileSize: 3000000
                            },
                            synchronous : appPanel.syncCheckbox.getValue()
                        });

                        var uploadDialog = Ext.create('Ext.ux.upload.Dialog', {
                            dialogTitle : 'My Upload Dialog',
                            panel : uploadPanel
                        });

                        this.mon(uploadDialog, 'uploadcomplete', function(uploadPanel, manager, items, errorCount) {
                            this.uploadComplete(items);
                            if (!errorCount) {
                                uploadDialog.close();
                            }
                        }, this);

                        uploadDialog.show();
                    }
                }, '->', appPanel.syncCheckbox, 'Synchronous upload'
            ]
        })

        appPanel.show();
    }

});