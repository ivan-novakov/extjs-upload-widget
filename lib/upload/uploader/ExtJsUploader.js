/**
 * Uploader implementation - with the Connection object in ExtJS 4
 * 
 */
Ext.define('Ext.ux.upload.uploader.ExtJsUploader', {
    extend : 'Ext.ux.upload.uploader.AbstractUploader',

    requires : [
        'Ext.ux.upload.data.Connection'
    ],

    config : {
        /**
         * @cfg {String} [method='PUT']
         * 
         * The HTTP method to be used.
         */
        method : 'PUT',

        /**
         * @cfg {Ext.data.Connection}
         * 
         * If set, this connection object will be used when uploading files.
         */
        connection : null
    },

    /**
     * @property
     * 
     * The connection object.
     */
    conn : null,

    /**
     * @private
     * 
     * Initializes and returns the connection object.
     * 
     * @return {Ext.ux.upload.data.Connection}
     */
    initConnection : function() {
        var conn,
            url = this.url;

        if (this.connection instanceof Ext.data.Connection) {
            conn = this.connection;
        }

        if (this.params) {
            url = Ext.urlAppend(url, Ext.urlEncode(this.params));
        }

        conn = Ext.create('Ext.ux.upload.data.Connection', {
            disableCaching : true,
            method : this.method,
            url : url,
            timeout : this.timeout,
            defaultHeaders : {
                'Content-Type' : this.contentType,
                'X-Requested-With' : 'XMLHttpRequest'
            }
        });

        return conn;
    },

    /**
     * @protected
     */
    initHeaders : function(item) {
        var headers = this.callParent(arguments);

        headers['Content-Type'] = item.getType();

        return headers;
    },

    /**
     * Implements {@link Ext.ux.upload.uploader.AbstractUploader#uploadItem}
     * 
     * @param {Ext.ux.upload.Item} item
     */
    uploadItem : function(item) {
        var file = item.getFileApiObject();
        if (!file) {
            return;
        }

        item.setUploading();

        this.conn = this.initConnection();

        /*
         * Passing the File object directly as the "rawFata" option.
         * Specs:
         *   https://dvcs.w3.org/hg/xhr/raw-file/tip/Overview.html#the-send()-method
         *   http://dev.w3.org/2006/webapi/FileAPI/#blob
         */
        this.conn.request({
            scope : this,
            headers : this.initHeaders(item),
            rawData : file,

            success : Ext.Function.bind(this.onUploadSuccess, this, [
                    item
                ], true),
            failure : Ext.Function.bind(this.onUploadFailure, this, [
                    item
                ], true),
            progress : Ext.Function.bind(this.onUploadProgress, this, [
                    item
                ], true)
        });

    },

    /**
     * Implements {@link Ext.ux.upload.uploader.AbstractUploader#abortUpload}
     */
    abortUpload : function() {
        if (this.conn) {
            this.conn.abort();
        }
    },

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