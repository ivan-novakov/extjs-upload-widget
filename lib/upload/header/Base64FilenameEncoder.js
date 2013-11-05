/**
 * Base64 filename encoder - uses the built-in function window.btoa().
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.btoa
 */
Ext.define('Ext.ux.upload.header.Base64FilenameEncoder', {
    extend : 'Ext.ux.upload.header.AbstractFilenameEncoder',

    config : {},

    type : 'base64',

    encode : function(filename) {
        return window.btoa(unescape(encodeURIComponent(filename)));
    }
});
