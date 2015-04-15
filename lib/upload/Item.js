/**
 * A single item designated for upload.
 * 
 * It is a simple object wrapping the native file API object.
 */
Ext.define('Ext.ux.upload.Item', {
    mixins : {
        observable : 'Ext.util.Observable'
    },

    STATUS_READY : 'ready',
    STATUS_UPLOADING : 'uploading',
    STATUS_UPLOADED : 'uploaded',
    STATUS_UPLOAD_ERROR : 'uploaderror',

    progress : null,
    status : null,

    /**
     * @cfg {Object} fileApiObject (required)
     * 
     * A native file API object
     */
    fileApiObject : null,

    /**
     * @cfg {String}
     * 
     * The upload error message associated with this file object
     */
    uploadErrorMessage : '',

    constructor : function(config) {
        this.mixins.observable.constructor.call(this);

        this.initConfig(config);

        Ext.apply(this, {
            status : this.STATUS_READY,
            progress : 0
        });
    },

    reset : function() {
        this.uploadErrorMessage = '';
        this.setStatus(this.STATUS_READY);
        this.setProgress(0);
    },

    getFileApiObject : function() {
        return this.fileApiObject;
    },

    getId : function() {
        return this.getFilename();
    },

    getName : function() {
        return this.getProperty('name');
    },

    getFilename : function() {
        return this.getName();
    },

    getSize : function() {
        return this.getProperty('size');
    },

    getType : function() {
        return this.getProperty('type');
    },

    getProperty : function(propertyName) {
        if (this.fileApiObject) {
            return this.fileApiObject[propertyName];
        }

        return null;
    },

    getProgress : function() {
        return this.progress;
    },

    getProgressPercent : function() {
        var progress = this.getProgress();
        if (!progress) {
            return 0;
        }

        var percent = Ext.util.Format.number((progress / this.getSize()) * 100, '0');
        if (percent > 100) {
            percent = 100;
        }

        return percent;
    },

    setProgress : function(progress) {
        this.progress = progress;
        this.fireEvent('progressupdate', this);
    },

    getStatus : function() {
        return this.status;
    },

    setStatus : function(status) {
        this.status = status;
        this.fireEvent('changestatus', this, status);
    },

    hasStatus : function(status) {
        var itemStatus = this.getStatus();

        if (Ext.isArray(status) && Ext.Array.contains(status, itemStatus)) {
            return true;
        }

        if (itemStatus === status) {
            return true;
        }

        return false;
    },

    isReady : function() {
        return (this.status == this.STATUS_READY);
    },

    isUploaded : function() {
        return (this.status == this.STATUS_UPLOADED);
    },

    setUploaded : function() {
        this.setProgress(this.getSize());
        this.setStatus(this.STATUS_UPLOADED);
    },

    isUploadError : function() {
        return (this.status == this.STATUS_UPLOAD_ERROR);
    },

    getUploadErrorMessage : function() {
        return this.uploadErrorMessage;
    },

    setUploadError : function(message) {
        this.uploadErrorMessage = message;
        this.setStatus(this.STATUS_UPLOAD_ERROR);
    },

    setUploading : function() {
        this.setStatus(this.STATUS_UPLOADING);
    }
});
