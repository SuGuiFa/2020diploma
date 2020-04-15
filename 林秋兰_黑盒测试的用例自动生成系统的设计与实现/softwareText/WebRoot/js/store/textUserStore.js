/**
 * 
 */
var treestore=Ext.create('Ext.data.TreeStore',{

	model:"treemodel",
	proxy:{
		type:"ajax",
		url:contextPath+'/ShowViewAction!getTreeList.action',
		reader:{
			type:"json",
			root:'tree'
		},
		actionMethods : {
			read : 'POST'
		}
	},
	autoLoad:true,
	rootVisible : false,
	root: { 
		 id : '1',
		text:"root",
		expanded: true
	} 
});





/*var panelstore=Ext.create("Ext.data.Store",{
	model:"gridmodel",
	proxy:{
		type:"ajax",
		//url:"http://localhost:8080/Ecan_JX/textAction!getdeptMsg.action?dept_id=G10150",
		
		reader:{
			type:"json",
			root:'data',
			totalProperty:'totalCount'
		},
		actionMethods : {
			read : 'POST'
		}
	},
	
	pageSize:20,//ҳ����20��
	//�Ƿ������ݶ�����true�Ļ��ͻ����޷�����
	remoteSort:false,
	remoteFilter:true,
	autoload:true
});*/
