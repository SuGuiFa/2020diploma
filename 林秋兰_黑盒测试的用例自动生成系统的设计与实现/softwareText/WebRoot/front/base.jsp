<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'base.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	
<script type="text/javascript" src="./Ext/bootstrap.js"></script>	
	
<link rel="stylesheet" type="text/css"
	href="./Ext/resources/css/examples.css">
<link rel="stylesheet" type="text/css"
	href="./Ext/resources/css/ext-all.css">

<script type="text/javascript" src="./Ext/ext-all.js"></script>

<script type="text/javascript" src="./Ext/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="./Ext/examples.js"></script>

<link rel="stylesheet" type="text/css"
	href="./Ext/resources/css/icon.css" />
<link rel="stylesheet" type="text/css"
	href="./Ext/resources/css/vpc.css" />
<link rel="stylesheet" type="text/css"
	href="./Ext/resources/css/font-size.css" />
<link rel="stylesheet" type="text/css"
	href="./Ext/resources/css/examples.css" />
<script type="text/javascript">
	var contextPath =  "${pageContext.request.contextPath}";
	var blank_img_url = "" + contextPath
			+ "images/s.gif";

	//����ͨ�õ�Viewport��ʽ
	Ext.define('Ext.vpc.Viewport', {
		extend : 'Ext.container.Viewport',
		requires : [ 'Ext.container.Viewport' ],
		config : {
			//�Ƿ���Ҫ�м��
			//padding:'7 7 7 7',
			border : '255 255 255 0',
			//�Զ����ҵı������㶮�ģ�Ư��
			cls : "bgSquare",
			border : false,
			frame : true
		},
		constructor : function(config) {
			this.callParent([ config ]); /*��ExtJS 3.X�汾��ͬ*/
		},
		initComponent : function() {
			this.callParent();
		}
	});
</script>

</head>

<body>

</body>
</html>
