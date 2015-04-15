/**
 * The grid displaying the list of uploaded files (queue).
 * 
 * @class Ext.ux.upload.ItemGridPanel
 * @extends Ext.grid.Panel
 */
Ext.define('Ext.ux.upload.ItemGridPanel', {
    extend : 'Ext.grid.Panel',

    requires : [
        'Ext.selection.CheckboxModel', 'Ext.ux.upload.Store'
    ],

    layout : 'fit',
    border : 0,

    viewConfig : {
        scrollOffset : 40
    },

    config : {
        queue : null,

        textFilename : 'Filename',
        textSize : 'Size',
        textType : 'Type',
        textStatus : 'Status',
        textProgress : '%'
    },

    initComponent : function() {

        if (this.queue) {
            this.queue.on('queuechange', this.onQueueChange, this);
            this.queue.on('itemchangestatus', this.onQueueItemChangeStatus, this);
            this.queue.on('itemprogressupdate', this.onQueueItemProgressUpdate, this);
        }

        Ext.apply(this, {
            store : Ext.create('Ext.ux.upload.Store'),
            selModel : Ext.create('Ext.selection.CheckboxModel', {
                checkOnly : true
            }),
            columns : [
                {
                    xtype : 'rownumberer',
                    width : 50
                }, {
                    dataIndex : 'filename',
                    header : this.textFilename,
                    flex : 1
                }, {
                    dataIndex : 'size',
                    header : this.textSize,
                    width : 100,
                    renderer : function(value) {
                        return Ext.util.Format.fileSize(value);
                    }
                }, {
                    dataIndex : 'type',
                    header : this.textType,
                    width : 150
                }, {
                    dataIndex : 'status',
                    header : this.textStatus,
                    width : 50,
                    align : 'right',
                    renderer : this.statusRenderer
                }, {
                    dataIndex : 'progress',
                    header : this.textProgress,
                    width : 50,
                    align : 'right',
                    renderer : function(value) {
                        if (!value) {
                            value = 0;
                        }
                        return value + '%';
                    }
                }, {
                    dataIndex : 'message',
                    width : 1,
                    hidden : true
                }
            ]
        });

        this.callParent(arguments);
    },

    onQueueChange : function(queue) {
        this.loadQueueItems(queue.getItems());
    },

    onQueueItemChangeStatus : function(queue, item, status) {
        this.updateStatus(item);
    },

    onQueueItemProgressUpdate : function(queue, item) {
        this.updateStatus(item);
    },

    /**
     * Loads the internal store with the supplied queue items.
     * 
     * @param {Array} items
     */
    loadQueueItems : function(items) {
        var data = [];
        var i;

        for (i = 0; i < items.length; i++) {
            data.push([
                items[i].getFilename(),
                items[i].getSize(),
                items[i].getType(),
                items[i].getStatus(),
                items[i].getProgressPercent()
            ]);
        }

        this.loadStoreData(data);
    },

    loadStoreData : function(data, append) {
        this.store.loadData(data, append);
    },

    getSelectedRecords : function() {
        return this.getSelectionModel().getSelection();
    },

    updateStatus : function(item) {
        var record = this.getRecordByFilename(item.getFilename());
        if (!record) {
            return;
        }

        var itemStatus = item.getStatus();
        // debug.log('[' + item.getStatus() + '] [' + record.get('status') + ']');
        if (itemStatus != record.get('status')) {
            this.scrollIntoView(record);

            record.set('status', item.getStatus());
            if (item.isUploadError()) {
                record.set('tooltip', item.getUploadErrorMessage());
            }
        }

        record.set('progress', item.getProgressPercent());
        record.commit();
    },

    getRecordByFilename : function(filename) {
        var index = this.store.findExact('filename', filename);
        if (-1 == index) {
            return null;
        }

        return this.store.getAt(index);
    },

    getIndexByRecord : function(record) {
        return this.store.findExact('filename', record.get('filename'));
    },

    statusRenderer : function(value, metaData, record, rowIndex, colIndex, store) {
        var iconCls = 'ux-mu-icon-upload-' + value;
        var tooltip = record.get('tooltip');
        if (tooltip) {
            value = tooltip;
        } else {
            'upload_status_' + value;
        }
        value = '<span class="ux-mu-status-value ' + iconCls + '" data-qtip="' + value + '" />';
        return value;
    },

    scrollIntoView : function(record) {

        var index = this.getIndexByRecord(record);
        if (-1 == index) {
            return;
        }

        this.getView().focusRow(index);
        return;
        var rowEl = Ext.get(this.getView().getRow(index));
        // var rowEl = this.getView().getRow(index);
        if (!rowEl) {
            return;
        }

        var gridEl = this.getEl();

        // debug.log(rowEl.dom);
        // debug.log(gridEl.getBottom());

        if (rowEl.getBottom() > gridEl.getBottom()) {
            rowEl.dom.scrollIntoView(gridEl);
        }
    }
});