/**
 * 
 */
/**
 * 
 */
var comboStore=Ext.create('Ext.data.JsonStore',{
	autoLoad:true,   
	proxy: {
	      type: 'ajax',
	      url: contextPath+'/BoundaryMethodAction!showCombobox.action',	      
	      actionMethods : {
				read : 'POST' // Store��������ķ�������Ajax����������  
			},
	        reader: {
	            type: 'json',        
	            root: 'root'
	        }
	    },
		autoLoad:true,
	    autoDestroy: true,	 
	    model:'combomodel'
});
var formStore = Ext.create('Ext.data.JsonStore', {
	autoLoad:false,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        actionMethods : {
			read : 'POST' // Store��������ķ�������Ajax����������  
		},
        reader: {
            type: 'json',        
            root: 'root'
        }
    },
    model:'gridmodel'
});
formStore.on('beforeload',function(){
		Ext.apply(formStore.proxy.extraParams,{
			minLength:minLength,
			maxlength:maxLength,
			isNum:isNum,
			isChar:isChar,
			isMark : isMark
			
		});
});