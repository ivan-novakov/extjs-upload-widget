/**
 * Upload status bar.
 * 
 * @class Ext.ux.upload.StatusBar
 * @extends Ext.toolbar.Toolbar
 */
Ext.define('Ext.ux.upload.StatusBar', {
    extend : 'Ext.toolbar.Toolbar',

    config : {
        selectionMessageText : 'Selected {0} file(s), {1}',
        uploadMessageText : 'Upload progress {0}% ({1} of {2} file(s))',
        textComponentId : 'mu-status-text'
    },

    initComponent : function() {

        Ext.apply(this, {
            items : [
                {
                    xtype : 'tbtext',
                    itemId : this.textComponentId,
                    text : '&nbsp;'
                }
            ]
        });

        this.callParent(arguments);
    },

    setText : function(text) {
        this.getComponent(this.textComponentId).setText(text);
    },

    setSelectionMessage : function(fileCount, byteCount) {
        this.setText(Ext.String.format(this.selectionMessageText, fileCount, Ext.util.Format.fileSize(byteCount)));
    },

    setUploadMessage : function(progressPercent, uploadedFiles, totalFiles) {
        this.setText(Ext.String.format(this.uploadMessageText, progressPercent, uploadedFiles, totalFiles));
    }

});