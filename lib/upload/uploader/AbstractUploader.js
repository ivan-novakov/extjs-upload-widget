/**
 * Abstract uploader object.
 * 
 * The uploader object implements the the upload itself - transports data to the server. This is an "abstract" object
 * used as a base object for all uploader objects.
 * 
 */
Ext.define('Ext.ux.upload.uploader.AbstractUploader', {
    mixins : {
        observable : 'Ext.util.Observable'
    },

    /**
     * @cfg {Number} [maxFileSize=50000000]
     * 
     * (NOT IMPLEMENTED) The maximum file size allowed to be uploaded.
     */
    maxFileSize : 50000000,

    /**
     * @cfg {String} url (required)
     * 
     * The server URL to upload to.
     */
    url : '',

    /**
     * @cfg {Number} [timeout=60000]
     * 
     * The connection timeout in miliseconds.
     */
    timeout : 60 * 1000,

    /**
     * @cfg {String} [contentType='application/binary']
     * 
     * The content type announced in the HTTP headers. It is autodetected if possible, but if autodetection
     * cannot be done, this value is set as content type header.
     */
    contentType : 'application/binary',

    /**
     * @cfg {String} [filenameHeader='X-File-Name']
     * 
     * The name of the HTTP header containing the filename.
     */
    filenameHeader : 'X-File-Name',

    /**
     * @cfg {String} [sizeHeader='X-File-Size']
     * 
     * The name of the HTTP header containing the size of the file.
     */
    sizeHeader : 'X-File-Size',

    /**
     * @cfg {String} [typeHeader='X-File-Type']
     * 
     * The name of the HTTP header containing the MIME type of the file.
     */
    typeHeader : 'X-File-Type',

    /**
     * @cfg {Object}
     * 
     * Additional parameters to be sent with the upload request.
     */
    params : {},

    /**
     * @cfg {Object}
     * 
     * Extra headers to be sent with the upload request.
     */
    extraHeaders : {},

    /**
     * @cfg {Object/String}
     * 
     * Encoder object/class used to encode the filename header. Usually used, when the filename
     * contains non-ASCII characters.
     */
    filenameEncoder : null,

    filenameEncoderHeader : 'X-Filename-Encoder',

    /**
     * Constructor.
     * @param {Object} [config]
     */
    constructor : function(config) {
        this.mixins.observable.constructor.call(this);
        
        this.initConfig(config);
    },

    /**
     * @protected
     */
    initHeaders : function(item) {
        var headers = this.extraHeaders || {},
            filename = item.getFilename();

		/*
		 * If there is a filename encoder defined - use it to encode the filename
		 * in the header and set the type of the encoder as an additional header.
		 */
        var filenameEncoder = this.initFilenameEncoder();
        if (filenameEncoder) {
            filename = filenameEncoder.encode(filename);
            headers[this.filenameEncoderHeader] = filenameEncoder.getType();
        }
        headers[this.filenameHeader] = filename;
        headers[this.sizeHeader] = item.getSize();
        headers[this.typeHeader] = item.getType();

        return headers;
    },

    /**
     * @abstract
     * 
     * Upload a single item (file). 
     * **Implement in subclass**
     * 
     * @param {Ext.ux.upload.Item} item
     */
    uploadItem : function(item) {},

    /**
     * @abstract
     * 
     * Aborts the current upload. 
     * **Implement in subclass**
     */
    abortUpload : function() {},

    /**
     * @protected
     */
    initFilenameEncoder : function() {
        if (Ext.isString(this.filenameEncoder)) {
            this.filenameEncoder = Ext.create(this.filenameEncoder);
        }

        if (Ext.isObject(this.filenameEncoder)) {
            return this.filenameEncoder;
        }

        return null;
    }

});
