/**
 * 
 */
/**
 * 
 */

var centerGirdPanel = Ext.create('Ext.grid.Panel', {
		region : "center",
			id : 'grid',
		 title : '<span style="font-size:15px">������</span>',
		layout : 'fit',
		 store : formStore,
		 forceFit: true, //�б�������Ӧ 
	   columns : [// ���ñ����
	              Ext.create("Ext.grid.RowNumberer",{}),
	              {
					header : "����",
					width : 120,
					dataIndex : 'user',
					sortable : true,
					editor:{ allowBlank:true  }
				},{
					header:"flag",
					width:200,
					dataIndex:"flag",
					 hidden: true,
					 hideable: false
				},{
					header:"id",
					width:200,
					dataIndex:"id",
					 hidden: true,
					 hideable: false
				},{
					header:"tab",
					width:200,
					dataIndex:"tab",
					 hidden: true,
					 hideable: false
				}],
	   selType: 'cellmodel',
	   selModel:'rowmodel',
	   listeners: {
		   'edit':function(obj){
			   var row = Ext.getCmp("grid").getSelectionModel().getSelection();
			   row[0].data.tab=0;
			//  Ext.Msg.alert("",+"=="+row[0].data.tab);
		   }
		   },
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
						record.commit();  
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
		//		window.location.href=contextPath + '/EquivalentMethodAction!outputEquivalentExcel.action'
				Ext.Ajax.request({
					url : contextPath + '/ComboEquivalentMethodAction!saveOrUpdateEquivalent.action',
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
						Ext.example.msg("��ʾ","�����Ѿ�������",true,500);
					}
				})
			}
		}
	    	},'-',{
	    		xtype : 'button',
	    		id : 'mark',
	    		width : 80,
	    		height : 25,
	    		text : '���',
	    		icon:''+contextPath+'/images/tip.png',
	    		listeners : {
	    			click : function() {
	    				var store = this.up("grid").getStore();		
	    				var count =store.getCount();
	    				var flag ="comboequivalent,"+store.getAt(count-1).data.flag;
	    				
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
				window.location.href=contextPath + '/ComboEquivalentMethodAction!outputEquivalentExcel.action?record='+record.data.flag;
				
			}
		}
	    	},'-',{
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
	    	  	   		var store = this.up("grid").getStore();	
	    	  	   	 northformPanel.getForm().reset();
	    	  	   	//	Ext.example.msg(record[0].data.date,combo.value+"--"+combo.getValue(),true,50000);
	    	  	   		store.proxy.url=contextPath + '/ComboEquivalentMethodAction!searchCase.action?flag='+combo.getValue(); 	   
	    		  		 msg = null;
	    		  	
	    		  		
	    	  	   		store.load({});
	    				
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
	title:"������ȼ��෨��������",
	collapsible:true,
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
					emptyText : "����\n �ᡢ�𡢿ࡢ������˳�����룩",
					grow : true,
					width: '100%'
					
				
        	       }]
			  } ]

	}],
	buttons:[{
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



Ext.onReady(function(){
	Ext.create("Ext.container.Viewport",{
		defaults : {
			bodyStyle : "background-color: #FFFFFF;",
			frame : true
		},
		layout : "border",
		items:[northformPanel,centerGirdPanel]
	})
})
//
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
						url : contextPath+ '/ComboEquivalentMethodAction!impDataExcel.action',
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

// ��������
function loadData(){	
	 msg = northformPanel.getForm().findField("msg").getValue();
	if(msg==null||msg==''){
		Ext.example.msg("��ʾ", "�����������ݣ�", true, 500);
		return;		
	}

	formStore.proxy.url =contextPath + '/ComboEquivalentMethodAction!comboEquivalentMethod.action';

	formStore.load({});
};
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
    			url : contextPath + '/ComboEquivalentMethodAction!deleteRow.action',
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
   
}




/**
 * 
 */