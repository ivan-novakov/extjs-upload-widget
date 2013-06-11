/**
 * Abstract uploader with features common for all XHR based uploaders.
 */
Ext.define('Ext.ux.upload.uploader.AbstractXhrUploader', {
    extend : 'Ext.ux.upload.uploader.AbstractUploader',

    onUploadSuccess : function(response, options, item) {
        var info = {
            success : false,
            message : 'general error',
            response : response
        };

        if (response.responseText) {
            var responseJson = Ext.decode(response.responseText);
            if (responseJson && responseJson.success) {
                Ext.apply(info, {
                    success : responseJson.success,
                    message : responseJson.message
                });

                this.fireEvent('uploadsuccess', item, info);
                return;
            }

            Ext.apply(info, {
                message : responseJson.message
            });
        }

        this.fireEvent('uploadfailure', item, info);
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