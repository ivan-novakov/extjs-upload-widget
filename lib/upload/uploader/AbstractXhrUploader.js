/**
 * Abstract uploader with features common for all XHR based uploaders.
 */
Ext.define('Ext.ux.upload.uploader.AbstractXhrUploader', {
    extend : 'Ext.ux.upload.uploader.AbstractUploader',

    onUploadSuccess : function(response, options, item) {
        var info = {
            success : true,
            message : '',
            response : response
        };

        if (response.responseText) {
            var responseJson = Ext.decode(response.responseText);
            if (responseJson) {
                Ext.apply(info, {
                    success : responseJson.success,
                    message : responseJson.message
                });

				var eventName = info.success ? 'uploadsuccess' : 'uploadfailure';
                this.fireEvent(eventName, item, info);
                return;
            }
        }

        this.fireEvent('uploadsuccess', item, info);
    },

    onUploadFailure : function(response, options, item) {
        var info = {
            success : false,
            message : 'http error',
            response : response
        };

        this.fireEvent('uploadfailure', item, info);
    },

    onUploadProgress : function(event, item) {
        this.fireEvent('uploadprogress', item, event);
    }
});