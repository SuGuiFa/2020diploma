var viewPort ;

var Panel =Ext.create("Ext.panel.Panel",{
	id:"panel",
	autoScroll :true ,
	region:"center",
	title:'<span style="font-size:15px">������</span>',
	tbar:[{ //��ʷ��ѯ������д
		    xtype:"combobox",
		    id:"comboid",
		    store:comboStore,
		    fieldLabel:"ѡ����ʷ����",
		    editable: false,	
		    valueField:"date",//��������صı���
	  	   	displayField:"flag",//�������ʾ�ı���
	  	   	emptyText:"--ѡ����ʷ����--",
	  	    queryMode: "local",
	  	    listeners:{
	  	   		select:function(combo,record,index){		  	   	
		  	   	//	Ext.example.msg(record[0].data.date,combo.value+"--"+combo.getValue(),true,50000);
	  	   		detailColumn = [];
	  	   		detailModel=[];
	  	   			Ext.Ajax.request({
					url : contextPath + '/ThirdCombinedMethodAction!searchCaseColumn.action',
					method : 'POST',
					timeout : 30000,
					type : 'ajax',	    					// form:"ajaxform"
					params : {
						flag : combo.getValue()
					},
					success:function(resp){
						var text = resp.responseText;   
						detailColumn = Ext.JSON.decode(text).column;
					    detailModel  = Ext.JSON.decode(text).model;	        					  
						showhistoryGrid(combo.getValue());
						 northformPanel.getForm().reset();
						Ext.example.msg("��ʾ","������ʾ�ɹ�",true,500);
			//			 Ext.Msg.alert("1",store.getAt(0).data.id+"=="+store.getAt(1).data.id);
					},
					failure:function(resp)
					{
						Ext.example.msg("��ʾ","������ʾʧ��",true,500);
					}
				})
	  	   		}
	  	   	}
		}],
	items:[detailPanel]
})


var detailPanel = Ext.create('Ext.grid.Panel', {
	id : 'grid',
layout : 'fit',
 store : detailStore,
 forceFit: true, //�б�������Ӧ 
columns : detailColumn,
selType: 'cellmodel',
selModel:'rowmodel',
autoScroll :true ,
tbar:[{
	xtype : 'button',
	width : 80,
	height : 25,
	id : 'save',
	width : 80,
	enableToggle:false,
	height : 25,
	//icon:''+contextPath+'/images/export_excel.png',
	text : '����',
	icon:''+contextPath+'/images/save.gif',

	listeners : {
		click : function() {
			var store = this.up("grid").getStore();
			var count = store.getCount();
			var count1 = store.getCount();
			for(var i=0;i<count1;i++){
				if(store.getAt(i).data.tab==1){
					count--;
				}
			}
			var records = new Array(count);
			var record;
			var index=0;
			for (var i = 0; i < count1; i++) {
				//tab =1 Ϊ������
				
				// ��ȡǰ̨���ݴ洢����̨ȥ
				record = store.getAt(i);
				if(record.data.flag==''||record.data.flag==null)
				{
					record.data.flag=store.getAt(0).data.flag;
				}
				if(record.data.tab==null||record.data.tab==0||record.data.tab==''){
					record.data.tab=1;
				
					var obj = {
							'id':record.data.id,
							'user' : record.data.user,
							'flag':record.data.flag,
							'tab':record.data.tab
					}
					records[index++] = JSON.stringify(obj);
					if(index>=count){
						break;
					}
				}
				// ���԰Ѷ�����������в���ʶ��
				// ��̨������ʶ��[objcet,object]������
				// ���Ǿ�����ֵ
				
			}
//			window.location.href=contextPath + '/BoundaryMethodAction!outputEquivalentExcel.action'
			Ext.Ajax.request({
				url : contextPath + '/ThirdCombinedMethodAction!saveOrUpdateCombined.action',
				method : 'POST',
				timeout : 30000,
				type : 'ajax',	    					// form:"ajaxform"
				params : {
					record : records
				},
				success:function(resp){
					var text = Ext.decode(resp.responseText);   				
					var store = Ext.getCmp("grid").getStore();
					var count = store.getCount();
					var index =0;
					for(var i=0;i<count;i++){
						if(store.getAt(i).data.id!=null||store.getAt(i).id!=""){
						//	store.getAt
							var record =store.getAt(i);
							record.data.id=text.root[index++].id;
							if(index>=text.totalcount){
								break;
							}								
						}
					}
					comboStore.reload();	
					Ext.example.msg("��ʾ","�������ڱ���",true,500);
		//			 Ext.Msg.alert("1",store.getAt(0).data.id+"=="+store.getAt(1).data.id);
				},
				failure:function(resp)
				{
					Ext.example.msg("��ʾ","�����Ѿ������˻���δ��������",true,500);
				}
			})
		}
	}
		},'-',{
			xtype : 'button',
			id : 'mark',
			width : 80,
			height : 25,
			icon:''+contextPath+'/images/tip.png',
			text : '���',
			listeners : {
				click : function() {
					var store = this.up("grid").getStore();	
			
					var flag ="thirdcombined,"+store.getAt(0).data.flag;
					var count =store.getCount();
					for(var i=0;i<count;i++){
						if(store.getAt(i).data.tab==0||store.getAt(i).data.tab==""||store.getAt(i).data.tab==null){
							Ext.example.msg("��ʾ","���ȱ����ٱ��",true,500);
							return ;
						}
					}
					Ext.Ajax.request({
						url : contextPath + '/UsefulCaseAction!saveOrUpdateUsefulCase.action',
						method : 'POST',
						timeout : 30000,
						type : 'ajax',	    					// form:"ajaxform"
						params : {
							
							flag:flag
						},
						success:function(resp){
							
						
							//
							var data =Ext.decode(resp.responseText);
							if(data.msg==""){	    								    						
								Ext.example.msg("��ʾ","���ݱ�ǳɹ�",true,500);
							}else{
								Ext.example.msg("��ʾ","�����Ѿ���ǹ�",true);
							}
				//			 Ext.Msg.alert("1",store.getAt(0).data.id+"=="+store.getAt(1).data.id);
						},
						failure:function(resp)
						{
							Ext.example.msg("��ʾ","���ݱ��ʧ��",true,500);
						}
					})
						// ���԰Ѷ�����������в���ʶ��
						// ��̨������ʶ��[objcet,object]������
						// ���Ǿ�����ֵ			
			
					//		window.location.href=contextPath + '/BoundaryMethodAction!outputBoundaryExcel.action?record='+record.data.flag;
					
				}
			}
		    	},'-',{
	xtype : 'button',
	id : 'outputexcel',
	width : 80,
	height : 25,
	icon:''+contextPath+'/images/export_excel.png',
	text : '����excel',
	listeners : {
		click : function() {
			var store = this.up("grid").getStore();	
			var record =store.getAt(0);
			var count =store.getCount();
			for(var i=0;i<count;i++){
				if(store.getAt(i).data.tab==0||store.getAt(i).data.tab==""||store.getAt(i).data.tab==null){
					Ext.example.msg("��ʾ","���ȱ���������",true,500);
					return ;
				}
			}
				// ���԰Ѷ�����������в���ʶ��
				// ��̨������ʶ��[objcet,object]������
				// ���Ǿ�����ֵ			
			window.location.href=contextPath + '/ThirdCombinedMethodAction!outputCombinedExcel.action?record='+record.data.flag;
			
		}
	}
		} ],
stripeRows : true,			
columnLines: true,
autoScroll :true ,
enableColumnMove :true,			
enableColumnResize : true,			
trackMouseOver :true		

})

var northformPanel =  Ext.create("Ext.form.FormPanel",{
	region:"north",
	title:"��ϲ��Է���������ѡ��",
	//collapsible:true,
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
        	    	labelAlign:'right',
					xtype : 'textarea',
					name : 'msg',
					id:'data',
					emptyText : "����\n0���죬�̣���\n1:�ᣬ�𣬿�\n2:���У� С",
					grow : true,
					width: '100%'
					
				
        	       }]
			  } ]

	},{
        xtype:'fieldset',
        title: '������������',
        collapsible:true,
        collapsed:false,
        autoHeight:true,
        layout:'column',
        items :[{layout:'form',columnWidth:0.5,border:false,bodyStyle:'background-color: #dfe9f6;',
        	items:[{
        	    	labelAlign:'right',
					xtype : 'textarea',
					id:"condition",
					name : 'selection',
					emptyText : "����\nif [0] in {��,��} then [1] not in{��}\nif [0] notin {��} then [1] in {��}\nif [1] notin {��} then [2] not in{��,��}\nif [0] in {��} then [2] not in {С}",
					grow : true,
					width: '100%'
				
        	       }]
			  } ]

	}],
	buttons:[{
		   text:'��������',
		   handler:importConditionTxt
	   },{
		   text:'��������',
		   handler:importDataTxt
	   },{
		   text: '����',
		   handler:loadData
	   },{
		   text:'����',
		   handler:function(){
			   northformPanel.getForm().reset();
	   }
   }]
});





function importDataTxt(){
	uploadPanel =  Ext.create( "Ext.form.FormPanel",{
		labelWidth : 30,
		height : 120,
		border : false,
		bodyStyle : 'padding:30px 5px;',
		buttonAlign : 'center',
		buttons : [ {
			id : 'impFile',
			text : '����',
			width : 90,
			height : 25,
			handler : btnClick
		}, {
			id : 'cal',
			text : 'ȡ��',
			width : 90,
			height : 25,
			handler : btnClick
		} ],
		fileUpload : true,
		items : [{
			xtype : 'fileuploadfield',
			emptyText : 'ѡ���ļ�',
			fieldLabel : '',
			anchor : '80%',
			name : 'upload',
			regex : /\.txt$/i,
			regexText : '��ѡ���ı��ļ�',
			buttonText : '����ļ�'
		}]
	});
	win =  Ext.create("Ext.Window",{
		height : 160,
		width : 320,
		title : '���봰��',
		modal : true
	});
	win.add(uploadPanel);
	win.show();
};
var win;
function importConditionTxt(){
	uploadPanel =  Ext.create( "Ext.form.FormPanel",{
		labelWidth : 30,
		height : 120,
		border : false,
		bodyStyle : 'padding:30px 5px;',
		buttonAlign : 'center',
		buttons : [ {
			id : 'impFile',
			text : '����',
			width : 90,
			height : 25,
			handler : btnClick1
		}, {
			id : 'cal',
			text : 'ȡ��',
			width : 90,
			height : 25,
			handler : btnClick1
		} ],
		fileUpload : true,
		items : [{
			xtype : 'fileuploadfield',
			emptyText : 'ѡ���ļ�',
			fieldLabel : '',
			anchor : '80%',
			name : 'upload',
			regex : /\.txt$/i,
			regexText : '��ѡ���ı��ļ�',
			buttonText : '����ļ�'
		}]
	});
	win =  Ext.create("Ext.Window",{
		height : 160,
		width : 320,
		title : '���봰��',
		modal : true
	});
	win.add(uploadPanel);
	win.show();
};
function btnClick(btn){
	var bid = btn.id;
	if(bid == 'impFile'){
		var form = uploadPanel.form;
		if (form.isValid()) {
			Ext.Msg.confirm('ϵͳ��ʾ','�ò�����ǿ�Ƹ��ǵ�ǰ���ݣ����������档�Ƿ������',function(btn){
				if(btn == 'yes') {
					form.submit({
						clientValidation : true,
						waitMsg : '�����ϴ��ļ�...',// ��ʾ��Ϣ
						waitTitle : '��Ϣ��ʾ',
						url : contextPath+ '/ThirdCombinedMethodAction!impDataExcel.action',
						params : {},
						method : 'post',
						success : function(form, action) {
							win.close();
							var text =Ext.getCmp("data");
							text.setValue(action.result.msg);
							Ext.example.msg('��ʾ', 'txt����ɹ�!',true,500);						
						},
						failure : function(form, action) {
							var errorInfo = "";
							errorInfo = Ext.encode(action.result.msg);
							Ext.example.msg('������ʾ', 'txt����ʧ�ܣ�',true,500);
						}
					});
				}
			});
		}
	}else if (bid == 'cal') {
		win.close();
	}
};
function btnClick1(btn){
	var bid = btn.id;
	if(bid == 'impFile'){
		var form = uploadPanel.form;
		if (form.isValid()) {
			Ext.Msg.confirm('ϵͳ��ʾ','�ò�����ǿ�Ƹ��ǵ�ǰ���ݣ����������档�Ƿ������',function(btn){
				if(btn == 'yes') {
					form.submit({
						clientValidation : true,
						waitMsg : '�����ϴ��ļ�...',// ��ʾ��Ϣ
						waitTitle : '��Ϣ��ʾ',
						url : contextPath+ '/ThirdCombinedMethodAction!impDataExcel.action',
						params : {},
						method : 'post',
						success : function(form, action) {
							win.close();
							var text =Ext.getCmp("condition");
							text.setValue(action.result.msg);
							Ext.example.msg('��ʾ', 'txt����ɹ�!',true,500);						
						},
						failure : function(form, action) {
							var errorInfo = "";
							errorInfo = Ext.encode(action.result.msg);
							Ext.example.msg('������ʾ', 'txt����ʧ�ܣ�',true,500);
						}
					});
				}
			});
		}
	}else if (bid == 'cal') {
		win.close();
	}
};
// ��������
function loadData(){	
	 msg = northformPanel.getForm().findField("msg").getValue();
	 selection = northformPanel.getForm().findField("selection").getValue();
	if(msg==null||msg==''){
		Ext.example.msg("��ʾ", "�����������ݣ�", true, 500);
		return;		
	}
	selectChange(msg,selection);
	
};
function selectChange(msg,selection){
	detailColumn = [];
	detailModel=[];
	//��ȡ��������Ϣ
	Ext.Ajax.request({
		url: contextPath + '/ThirdCombinedMethodAction!getColumnForGirdpanel.action',
	    params: {
	    	msg:msg
	    	
	    },
	    success: function(response){
	        var text = response.responseText;
	        //����COLUMN
	        detailColumn = Ext.JSON.decode(text).column;
	        detailModel  = Ext.JSON.decode(text).model;	        
	        showGrid(msg,selection);
	    }
	});
}


function showhistoryGrid(msg){
	Ext.define('detailModel', {
		extend : 'Ext.data.Model',
		fields :   detailModel
		           
	});
	detailStore = Ext.create('Ext.data.Store', {
		autoLoad:true,
		autoDestory:true,
		model: 'detailModel',
		proxy: {
			type: 'ajax',
			url: contextPath + '/ThirdCombinedMethodAction!searchCase.action',
			reader: {
				type: 'json',
				root: 'root'
			},
			 actionMethods : {
					read : 'POST' // Store��������ķ�������Ajax����������  
				},
			extraParams: {  
				flag:msg
				
			}
		}
	});

	// viewPort.remove(detailPanel);
	//��ϸ�����б�
	var detailPanel = Ext.create("Ext.grid.Panel",{
		//id					: 'configGrid',
		autoScroll :true ,
	//	id : 'grid',
	layout : 'fit',
	 store : detailStore,
	 forceFit: true, //�б�������Ӧ 
	columns : detailColumn,
	selType: 'cellmodel',
	selModel:'rowmodel',
	tbar:[{
		xtype : 'button',
		width : 80,
		height : 25,
	//	id : 'save',
		width : 80,
		enableToggle:false,
		height : 25,
		//icon:''+contextPath+'/images/export_excel.png',
		text : '����',
		icon:''+contextPath+'/images/save.gif',

		listeners : {
			click : function() {
				var store = this.up("grid").getStore();
				var count = store.getCount();
				var count1 = store.getCount();
				for(var i=0;i<count1;i++){
					if(store.getAt(i).data.tab==1){
						count--;
					}
				}
				var records = new Array(count);
				var record;
				var index=0;
				for (var i = 0; i < count1; i++) {
					//tab =1 Ϊ������
					
					// ��ȡǰ̨���ݴ洢����̨ȥ
					record = store.getAt(i);
					if(record.data.flag==''||record.data.flag==null)
					{
						record.data.flag=store.getAt(0).data.flag;
					}
					if(record.data.tab==null||record.data.tab==0||record.data.tab==''){
						record.data.tab=1;
					
						var obj = {
								'id':record.data.id,
								'user' : record.data.user,
								'flag':record.data.flag,
								'tab':record.data.tab
						}
						records[index++] = JSON.stringify(obj);
						if(index>=count){
							break;
						}
					}
					// ���԰Ѷ�����������в���ʶ��
					// ��̨������ʶ��[objcet,object]������
					// ���Ǿ�����ֵ
					
				}
//				window.location.href=contextPath + '/BoundaryMethodAction!outputEquivalentExcel.action'
				Ext.Ajax.request({
					url : contextPath + '/ThirdCombinedMethodAction!saveOrUpdateCombined.action',
					method : 'POST',
					timeout : 30000,
					type : 'ajax',	    					// form:"ajaxform"
					params : {
						record : records
					},
					success:function(resp){
						var text = Ext.decode(resp.responseText);   				
						var store = Ext.getCmp("grid").getStore();
						var count = store.getCount();
						var index =0;
						for(var i=0;i<count;i++){
							if(store.getAt(i).data.id!=null||store.getAt(i).id!=""){
							//	store.getAt
								var record =store.getAt(i);
								record.data.id=text.root[index++].id;
								if(index>=text.totalcount){
									break;
								}								
							}
						}
						comboStore.reload();	
						Ext.example.msg("��ʾ","�������ڱ���",true,500);
			//			 Ext.Msg.alert("1",store.getAt(0).data.id+"=="+store.getAt(1).data.id);
					},
					failure:function(resp)
					{
						Ext.example.msg("��ʾ","�����Ѿ������˻���δ��������",true,500);
					}
				})
			}
		}
			},'-',{
				xtype : 'button',
			//	id : 'mark',
				width : 80,
				height : 25,
			//	icon:''+contextPath+'/images/export_excel.png',
				text : '���',
				icon:''+contextPath+'/images/tip.png',
				listeners : {
					click : function() {
						var store = this.up("grid").getStore();	
				
						var flag ="thirdcombined,"+store.getAt(0).data.flag;
						var count =store.getCount();
						for(var i=0;i<count;i++){
							if(store.getAt(i).data.tab==0||store.getAt(i).data.tab==""||store.getAt(i).data.tab==null){
								Ext.example.msg("��ʾ","���ȱ����ٱ��",true,500);
								return ;
							}
						}
						Ext.Ajax.request({
							url : contextPath + '/UsefulCaseAction!saveOrUpdateUsefulCase.action',
							method : 'POST',
							timeout : 30000,
							type : 'ajax',	    					// form:"ajaxform"
							params : {
								
								flag:flag
							},
							success:function(resp){
								
							
								//
								var data =Ext.decode(resp.responseText);
								if(data.msg==""){	    								    						
									Ext.example.msg("��ʾ","���ݱ�ǳɹ�",true,500);
								}else{
									Ext.example.msg("��ʾ","�����Ѿ���ǹ�",true);
								}
					//			 Ext.Msg.alert("1",store.getAt(0).data.id+"=="+store.getAt(1).data.id);
							},
							failure:function(resp)
							{
								Ext.example.msg("��ʾ","���ݱ��ʧ��",true,500);
							}
						})
							// ���԰Ѷ�����������в���ʶ��
							// ��̨������ʶ��[objcet,object]������
							// ���Ǿ�����ֵ			
				
						//		window.location.href=contextPath + '/BoundaryMethodAction!outputBoundaryExcel.action?record='+record.data.flag;
						
					}
				}
			    	},'-',{
		xtype : 'button',
	//	id : 'outputexcel',
		width : 80,
		height : 25,
		icon:''+contextPath+'/images/export_excel.png',
		text : '����excel',
		listeners : {
			click : function() {
				var store = this.up("grid").getStore();	
				var record =store.getAt(0);
				var count =store.getCount();
				for(var i=0;i<count;i++){
					if(store.getAt(i).data.tab==0||store.getAt(i).data.tab==""||store.getAt(i).data.tab==null){
						Ext.example.msg("��ʾ","���ȱ���������",true,500);
						return ;
					}
				}
					// ���԰Ѷ�����������в���ʶ��
					// ��̨������ʶ��[objcet,object]������
					// ���Ǿ�����ֵ			
				window.location.href=contextPath + '/ThirdCombinedMethodAction!outputCombinedExcel.action?record='+record.data.flag;
				
			}
		}
			} ],
	stripeRows : true,			
	columnLines: true,			
	enableColumnMove :true,			
	enableColumnResize : true,			
	trackMouseOver :true		
	})		
	var grid =Panel.items.get(0);
	if(grid!=null){
		Panel.remove(grid);
	}
	Panel.add(detailPanel);
	detailStore.reload();
	


}

//����grid��

function showGrid(msg,selection){

	Ext.define('detailModel', {
		extend : 'Ext.data.Model',
		fields :   detailModel
		           
	});
	detailStore = Ext.create('Ext.data.Store', {
		autoLoad:true,
		autoDestory:true,
		model: 'detailModel',
		proxy: {
			type: 'ajax',
			url: contextPath + '/ThirdCombinedMethodAction!combinedMethod.action',
			reader: {
				type: 'json',
				root: 'root'
			},
			 actionMethods : {
					read : 'POST' // Store��������ķ�������Ajax����������  
				},
			extraParams: {  
				msg:msg,
				selection:selection
			}
		}
	});

	// viewPort.remove(detailPanel);
	//��ϸ�����б�
	var detailPanel = Ext.create("Ext.grid.Panel",{
		//id					: 'configGrid',
		autoScroll :true ,
	//	id : 'grid',
	layout : 'fit',
	 store : detailStore,
	 forceFit: true, //�б�������Ӧ 
	columns : detailColumn,
	selType: 'cellmodel',
	selModel:'rowmodel',
	tbar:[{
		xtype : 'button',
		width : 80,
		height : 25,
	//	id : 'save',
		width : 80,
		enableToggle:false,
		height : 25,
		//icon:''+contextPath+'/images/export_excel.png',
		text : '����',
		icon:''+contextPath+'/images/save.gif',

		listeners : {
			click : function() {
				var store = this.up("grid").getStore();
				var count = store.getCount();
				var count1 = store.getCount();
				for(var i=0;i<count1;i++){
					if(store.getAt(i).data.tab==1){
						count--;
					}
				}
				var records = new Array(count);
				var record;
				var index=0;
				for (var i = 0; i < count1; i++) {
					//tab =1 Ϊ������
					
					// ��ȡǰ̨���ݴ洢����̨ȥ
					record = store.getAt(i);
					if(record.data.flag==''||record.data.flag==null)
					{
						record.data.flag=store.getAt(0).data.flag;
					}
					if(record.data.tab==null||record.data.tab==0||record.data.tab==''){
						record.data.tab=1;
						
						var obj = {
								'id':record.data.id,
								'user' : record.data.user,
								'flag':record.data.flag,
								'tab':record.data.tab
						}
						records[index++] = JSON.stringify(obj);
						if(index>=count){
							break;
						}
					}
					// ���԰Ѷ�����������в���ʶ��
					// ��̨������ʶ��[objcet,object]������
					// ���Ǿ�����ֵ
					
				}
//				window.location.href=contextPath + '/BoundaryMethodAction!outputEquivalentExcel.action'
				Ext.Ajax.request({
					url : contextPath + '/ThirdCombinedMethodAction!saveOrUpdateCombined.action',
					method : 'POST',
					timeout : 30000,
					type : 'ajax',	    					// form:"ajaxform"
					params : {
						record : records
					},
					success:function(resp){
						var text = Ext.decode(resp.responseText);   				
						var store = Ext.getCmp("grid").getStore();
						var count = store.getCount();
						var index =0;
						for(var i=0;i<count;i++){
							if(store.getAt(i).data.id!=null||store.getAt(i).id!=""){
							//	store.getAt
								var record =store.getAt(i);
								record.data.id=text.root[index++].id;
								if(index>=text.totalcount){
									break;
								}								
							}
						}
						comboStore.reload();	
						Ext.example.msg("��ʾ","�������ڱ���",true,500);
			//			 Ext.Msg.alert("1",store.getAt(0).data.id+"=="+store.getAt(1).data.id);
					},
					failure:function(resp)
					{
						Ext.example.msg("��ʾ","�����Ѿ������˻���δ��������",true,500);
					}
				})
			}
		}
			},'-',{
				xtype : 'button',
			//	id : 'mark',
				width : 80,
				height : 25,
			//	icon:''+contextPath+'/images/export_excel.png',
				text : '���',
				icon:''+contextPath+'/images/tip.png',
				listeners : {
					click : function() {
						var store = this.up("grid").getStore();	
				
						var flag ="thirdcombined,"+store.getAt(0).data.flag;
						var count =store.getCount();
						for(var i=0;i<count;i++){
							if(store.getAt(i).data.tab==0||store.getAt(i).data.tab==""||store.getAt(i).data.tab==null){
								Ext.example.msg("��ʾ","���ȱ����ٱ��",true,500);
								return ;
							}
						}
						Ext.Ajax.request({
							url : contextPath + '/UsefulCaseAction!saveOrUpdateUsefulCase.action',
							method : 'POST',
							timeout : 30000,
							type : 'ajax',	    					// form:"ajaxform"
							params : {
								
								flag:flag
							},
							success:function(resp){
								
							
								//
								var data =Ext.decode(resp.responseText);
								if(data.msg==""){	    								    						
									Ext.example.msg("��ʾ","���ݱ�ǳɹ�",true,500);
								}else{
									Ext.example.msg("��ʾ","�����Ѿ���ǹ�",true);
								}
					//			 Ext.Msg.alert("1",store.getAt(0).data.id+"=="+store.getAt(1).data.id);
							},
							failure:function(resp)
							{
								Ext.example.msg("��ʾ","���ݱ��ʧ��",true,500);
							}
						})
							// ���԰Ѷ�����������в���ʶ��
							// ��̨������ʶ��[objcet,object]������
							// ���Ǿ�����ֵ			
				
						//		window.location.href=contextPath + '/BoundaryMethodAction!outputBoundaryExcel.action?record='+record.data.flag;
						
					}
				}
			    	},'-',{
		xtype : 'button',
	//	id : 'outputexcel',
		width : 80,
		height : 25,
		icon:''+contextPath+'/images/export_excel.png',
		text : '����excel',
		listeners : {
			click : function() {
				var store = this.up("grid").getStore();	
				var record =store.getAt(0);
				var count =store.getCount();
				for(var i=0;i<count;i++){
					if(store.getAt(i).data.tab==0||store.getAt(i).data.tab==""||store.getAt(i).data.tab==null){
						Ext.example.msg("��ʾ","���ȱ���������",true,500);
						return ;
					}
				}
					// ���԰Ѷ�����������в���ʶ��
					// ��̨������ʶ��[objcet,object]������
					// ���Ǿ�����ֵ			
				window.location.href=contextPath + '/ThirdCombinedMethodAction!outputCombinedExcel.action?record='+record.data.flag;
				
			}
		}
			} ],
	stripeRows : true,			
	columnLines: true,			
	enableColumnMove :true,			
	enableColumnResize : true,			
	trackMouseOver :true		
	})		
	var grid =Panel.items.get(0);
	Panel.remove(grid);
	Panel.add(detailPanel);
	detailStore.reload();
	

}
//

function add(){
	  rowEditing.cancelEdit();
	  var store =Ext.getCmp('grid').getStore();
	  Ext.getCmp('grid').getStore().insert(store.getCount(), new gridmodel());
    rowEditing.startEdit(store.getCount()-1, 0);
};
function canel() {
    Ext.MessageBox.confirm('��ʾ', 'ȷ��ɾ���ü�¼?', function(btn){
        if(btn!='yes') {
            return;
        }					            			
        var sm = Ext.getCmp('grid').getSelectionModel();
        var row =sm.getSelection();
       
        if(row[0].data.id!=null||row[0].data.id!=""){
    	    Ext.Ajax.request({
    			url : contextPath + '/ThirdCombinedMethodAction!deleteRow.action',
    			method : 'POST',
    			timeout : 30000,
    			type : 'ajax',	    					// form:"ajaxform"
    			params : {
    				id : row[0].data.id  				
    			},
    			success:function(resp){
    				rowEditing.cancelEdit();
    		        var store=Ext.getCmp('grid').getStore();
    		        store.remove(sm.getSelection());
    		        if (store.getCount() > 0) {
    		            sm.select(0);
    		        }
    		        Ext.example.msg("��ʾ","�Ѿ�ɾ����",true,500);
    			},
    			failure:function(resp){
    				Ext.example.msg("��ʾ","ɾ��ʧ�ܣ�������",true,500);
    			}
    		})
        }else{
        	rowEditing.cancelEdit();
            var store=Ext.getCmp('grid').getStore();
            store.remove(sm.getSelection());
            if (store.getCount() > 0) {
                sm.select(0);
            }
            Ext.example.msg("��ʾ","�Ѿ�ɾ����",true,500);
        }
     });
   
};

Ext.onReady(function (){
	viewPort= Ext.create("Ext.container.Viewport",{
		defaults : {
			bodyStyle : "background-color: #FFFFFF;",
			frame : true
		},
		layout : "border",
		items:[Panel,northformPanel]
	})
})