

var centerGirdPanel = Ext.create('Ext.grid.Panel', {
		region : "center",
		layout : "fit",
			id : 'centergrid',		
		 store : formStore,
		 forceFit: true, //�б�������Ӧ 
	   columns : [// ���ñ����
	              Ext.create("Ext.grid.RowNumberer",{}),
	              {
						header : "��������",
						width : 120,
						dataIndex : 'method',
						sortable : true,
						editor:{ allowBlank:true  }
					},{
						header : "��������ʱ��",
						width : 200,
						dataIndex : 'dates',
						sortable : true,
						editor:{ allowBlank:true  }
					},{
						header : "����ʹ������",
						width : 300,
						dataIndex : 'conditions',
						sortable : true,
						editor:{ allowBlank:true  }
					},{
						header:"flag",						
						dataIndex:"flag",
						 hidden: true,
						 hideable: false
					},{
						header:"id",
						
						dataIndex:"id",
						 hidden: true,
						 hideable: false
					}],	 	
	   listeners: {
		   'itemdblclick':function(thisGrid, record,item, index){
			   //ѡ������Ϣ
			   var row = formStore.getAt(index);
			   var flag =row.get("flag");
			   //��������Gridpanel
			   Ext.define("gridmodel",{
					extend : 'Ext.data.Model',
					fields : [ 
					   {name : "id"},
					  {name : "user"},
					  {name:"flag"},
					  {name:"tab"}
					]
				});
			   var gridStore = Ext.create('Ext.data.JsonStore', {
					autoLoad:false,
				    autoDestroy: true,
				    proxy: {
				        type: 'ajax',
				        url :contextPath + '/UsefulCaseAction!showUsefulcaseDetail.action',
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
			   var GridPanel=Ext.create('Ext.grid.Panel', {					
					id : 'grid',
					title : '<span style="font-size:15px">������</span>',
					region:"center",
					forceFit: true, //�б�������Ӧ 
					store : gridStore,
					columns : [// ���ñ����
		            Ext.create("Ext.grid.RowNumberer",{}),
					{
						header : "����",
						width : 200,
						dataIndex : 'user',
						sortable : true,
						editor : {
							allowBlank : true
						}
					}, {
						header : "flag",
						width : 200,
						dataIndex : "flag",
						hidden : true,
						hideable : false
					}, {
						header : "id",
						width : 200,
						dataIndex : "id",
						hidden : true,
						hideable : false
					}, {
						header : "tab",
						width : 200,
						dataIndex : "tab",
						hidden : true,
						hideable : false
					} ],
					selType : 'cellmodel',
					selModel : 'rowmodel',

					stripeRows : true,
					columnLines : true,
					enableColumnMove : true,
					enableColumnResize : true,
					trackMouseOver : true

				});
			   var Panel =Ext.create("Ext.panel.Panel",{
				   frame: true,
				   layout: 'fit',
				   items:[GridPanel]
			   });
			//  Ext.Msg.alert("",+"=="+row[0].data.tab);
			   var   win =  Ext.create("Ext.window.Window",{
	               //renderTo:'hello-tabs',
	              //�����´�����һ��Ҫд�������Ȼ���ܶ��ο����ͻ�grid��ձ���addcls null
				 			 
	               title: '������ϸ',
	               layout:'fit',
	               width:400,
	               height:500,
	               draggable : true, 
	               modal:true,	             
	               resizable : true, 
	               maximizable:true,
	               maximized :false,	             
	               modal:true,
	               plain: true,
	               items:Panel
	               
	          });	
			   win.show();
			   gridStore.on("beforeload",function(){
				   Ext.apply(this.proxy.extraParams,  
					{ 
					   flag:flag
					}
				   );
			   });
			   gridStore.load({});	
			  
			  		 
			  

	     //store�����ҳ�浯��������أ���Ȼie8���λ
	      }},
	tbar:[{  
        xtype : 'button', 
        width : 80,
		height : 25,
        text : 'ɾ��' ,
        handler: canel,
    	icon:''+contextPath+'/images/delete.gif'
    	
    },"-",{
		xtype : 'button',
		id : 'outputexcel',
		width : 80,
		height : 25,
		icon:''+contextPath+'/images/export_excel.png',
		text : '����excel',
		listeners : {
			click : function() {
				var store = this.up("grid").getStore();	
			    var sm = Ext.getCmp('centergrid').getSelectionModel();
		        var row =sm.getSelection();
		     
				// ���԰Ѷ�����������в���ʶ��
					// ��̨������ʶ��[objcet,object]������
					// ���Ǿ�����ֵ			
				window.location.href=contextPath + '/UsefulCaseAction!outputUsefulcaseExcel.action?record='+row[0].data.flag;
				
			}
		}
	    	} ],
	stripeRows : true,			
	columnLines: true,			
	enableColumnMove :true,			
	enableColumnResize : true,			
	trackMouseOver :true		
	
});
var northformPanel =  Ext.create("Ext.form.FormPanel",{
	region:"north",
	title:"��ϲ��Է���������ѡ��",
//	collapsible:true,
	labelWidth:80,
	collapsed:false,
	frame:true,
	border:false,
	items:[{
        xtype:'fieldset',
        title: '������������',
        collapsible:true,
        collapsed:false,
        autoHeight:true,
        layout:'column',
        items :[{layout:'form',columnWidth:0.6,border:false,bodyStyle:'background-color: #dfe9f6;',
        	items:[{
        			xtype:"combo",
        			id:"data",
        			store:combostore,
        			valueField : "id",// ��������ѡ����ֵ
					displayField : "msg",// ��������ѡ������ʾ�ı�
					triggerAction : "all",// ������Ϊ"all",����Ĭ��Ϊ"query"������£���ѡ��ĳ��ֵ���ٴ�����ʱ��ֻ����ƥ��ѡ������Ϊ"all"�Ļ���ÿ����������ʾȫ��ѡ��
					editable : true,// ���Ա༭
					loadingText : "���ڼ��ء�����",
					minChars : 1,// �����б���Զ������û���Ҫ�������С�ַ�������mode='remote'Ĭ��Ϊ4��mode='local'Ĭ��Ϊ0
					forceSelection : false, // ����ֵ�Ƿ��ϸ�Ϊ��ѡ�б��д��ڵ�ֵ��������벻���ڵ�ֵ�����Զ�ѡ���һ����ӽ���ֵ
					emptyText : "",
					hideLabel : true,				
					allowBlank : false,
					queryDelay : 1000,
					mode : 'local',
					hideTrigger:true,  //�ұߵĿɵ�����ǰ�ťȡ����				
					emptyText : "���������ֶ�",					
					width: '100%'					
        	       }]
		} ]

	}],

	buttons:[{
		   text: '��������',
		   handler:loadData
	   },{
		   text:'����',
		   handler:function(){
			   northformPanel.getForm().reset();
	   }
   }]
});



Ext.onReady(function(){
	Ext.create("Ext.container.Viewport",{
		defaults : {
			bodyStyle : "background-color: #FFFFFF;",
			frame : true
		},
		layout : "border",
		items:[centerGirdPanel,northformPanel]
	});
});





// ��������
function loadData(){	
	//��ȡcombo displayField
	 msg = Ext.getCmp("data").getRawValue();
		 //northformPanel.getForm().findField("msg").getValue();
	   formStore.on("beforeload",function(){
		   	Ext.apply(this.proxy.extraParams,  
			{ 
			   msg:msg
			}
		   );
	   });
	   formStore.load({});	


};

function canel() {
    Ext.MessageBox.confirm('��ʾ', 'ȷ��ɾ���ü�¼?', function(btn){
        if(btn!='yes') {
            return;
        }					            			
        var sm = Ext.getCmp('centergrid').getSelectionModel();
        var row =sm.getSelection();
       
        if(row[0].data.id!=null){
    	    Ext.Ajax.request({
    			url : contextPath + '/UsefulCaseAction!deleteRow.action',
    			method : 'POST',
    			timeout : 30000,
    			type : 'ajax',	    					// form:"ajaxform"
    			params : {
    				id : row[0].data.id  				
    			},
    			success:function(resp){
    			
    		        var store=Ext.getCmp('centergrid').getStore();
    		        store.remove(sm.getSelection());
    		        if (store.getCount() > 0) {
    		            sm.select(0);
    		        }
    		        Ext.example.msg("��ʾ","�Ѿ�ɾ����",true,500);
    			},
    			failure:function(resp){
    				Ext.example.msg("��ʾ","ɾ��ʧ�ܣ�������",true,500);
    			}
    		});
        }
     });
   
}

