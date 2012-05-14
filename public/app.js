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

        var dialog = Ext.create('Ext.window.Window', {
            title : 'Files',
            width : 400,
            height : 300,
            closable : false,
            modal : true,
            dockedItems : [
                {
                    xtype : 'toolbar',
                    dock : 'top',
                    items : [
                        {
                            xtype : 'button',
                            text : 'Upload files',
                            handler : function() {
                                var uploadDialog = Ext.create('Ext.ux.upload.Dialog', {
                                    dialogTitle: 'My Upload Dialog',
                                    uploadUrl : 'upload.php',
                                    listeners: {
                                        'uploadcomplete' : {
                                            scope: this,
                                            fn: function(dialog, manager, items, errorCount) {
                                                console.log('uploaded:');
                                                console.log(items);
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

        dialog.show();
    }
});