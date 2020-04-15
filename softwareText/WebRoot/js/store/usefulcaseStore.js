/**
 * 
 */
var formStore = Ext.create('Ext.data.JsonStore', {
	autoLoad:true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url:contextPath+"/UsefulCaseAction!showUsefulcaseList.action",
        actionMethods : {
			read : 'POST' // Store��������ķ�������Ajax����������  
		},
        reader: {
            type: 'json',        
            root: 'root'
        }
    },
    model:'casemodel'
});
var combostore= Ext.create('Ext.data.JsonStore',{
	autoLoad:true,   
    proxy: {
        type: 'ajax',
        url:contextPath+"/UsefulCaseAction!showSearchResult.action",
        actionMethods : {
			read : 'POST' // Store��������ķ�������Ajax����������  
		},
        reader: {
            type: 'json',        
            root: 'root'
        }
    },
    model:'combomodel'
})

