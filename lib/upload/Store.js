Ext.define('Ext.ux.upload.Store', {
    extend : 'Ext.data.Store',

    fields : [
        {
            name : 'filename',
            type : 'string'
        }, {
            name : 'size',
            type : 'integer'
        }, {
            name : 'type',
            type : 'string'
        }, {
            name : 'status',
            type : 'string'
        }, {
            name : 'message',
            type : 'string'
        }
    ],

    proxy : {
        type : 'memory',
        reader : {
            type : 'array',
            idProperty : 'filename'
        }
    }
});