Ext.define('Ext.ux.upload.header.Base64FilenameEncoder', {
    extend: 'Ext.ux.upload.header.AbstractFilenameEncoder',
    
    config: {},
    
    encode: function(filename) {
    	window.btoa(unescape(encodeURIComponent(filename)));
    }
});