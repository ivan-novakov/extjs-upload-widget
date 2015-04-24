/**
 * A "browse" button for selecting multiple files for upload.
 * 
 */
Ext.define('Ext.ux.upload.BrowseButton', {
    extend : 'Ext.form.field.File',

    buttonOnly : true,

    iconCls : 'ux-mu-icon-action-browse',
    buttonText : 'Browse...',

    initComponent : function() {

        Ext.apply(this, {
            buttonConfig : {
                iconCls : this.iconCls,
                text : this.buttonText
            }
        });

        this.on('afterrender', function() {
            /*
             * Fixing the issue when adding an icon to the button - the text does not render properly. OBSOLETE - from
             * ExtJS v4.1 the internal implementation has changed, there is no button object anymore.
             */
        	/*
            if (this.iconCls) {
                // this.button.removeCls('x-btn-icon');
                // var width = this.button.getWidth();
                // this.setWidth(width);
            }
            */

            // Allow picking multiple files at once.
            this.setMultipleInputAttribute();

        }, this);

        this.on('change', function(field, value, options) {
            var files = this.fileInputEl.dom.files;
            if (files.length) {
                this.fireEvent('fileselected', this, files);
            }
        }, this);

        this.callParent(arguments);
    },

    reset : function() {
        this.callParent(arguments);
        this.setMultipleInputAttribute();
    },

    setMultipleInputAttribute : function(inputEl) {
        inputEl = inputEl || this.fileInputEl;
        inputEl.dom.setAttribute('multiple', '1');
    }

    // OBSOLETE - the method is not used by the superclass anymore
    /*
    createFileInput : function() {
        this.callParent(arguments);
        this.fileInputEl.dom.setAttribute('multiple', '1');
    }
    */

}
);
