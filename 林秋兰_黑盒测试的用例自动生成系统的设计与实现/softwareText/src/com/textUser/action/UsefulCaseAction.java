package com.textUser.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.opensymphony.xwork2.ActionSupport;
import com.textUser.bean.CaseBean;
import com.textUser.bean.UsefulCaseBean;
import com.textUser.dao.UsefulcaseDao;
import com.util.Jacksonutil;
import com.util.UserUtil;

public class UsefulCaseAction  extends ActionSupport{

	private  HttpServletRequest request = ServletActionContext.getRequest();
	private 	HttpServletResponse response = ServletActionContext.getResponse();
	private UsefulcaseDao usefulcaseDaoimpl = new com.textUser.dao.impl.UsefulcaseDaoimpl();
	private static final long serialVersionUID = 8730614045002757086L;
	ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");

	private  UserUtil userUtil =new UserUtil() ;
	
	private CaseBean  caseBean =new CaseBean();
	/**
	 * 
	 * ������ϲ��Է���
	 * @throws Exception 
	 * @throws Exception 
	 */
	public void showUsefulcaseList() throws Exception 
	{
		String msg="";
		if(request.getParameter("msg")==null){
			msg="";
		}else {
			msg=request.getParameter("msg");
		}
		List<UsefulCaseBean> list =usefulcaseDaoimpl.showUsefulcaseList(msg);
		Map<String, Object> m =new HashMap<String, Object>();
		m.put("root", list);		
		response.setContentType("application/json;charset=UTF-8");
	    response.setHeader("pragma", "no-cache");
	    response.setHeader("cache-control", "no-cache");
	    String s =Jacksonutil.objectToJson(m);
	    response.getWriter().write(s);
		System.out.println(s);
	}
	/**
	 * 
	 * չʾusecase������Ϣ
	 * @throws Exception 
	 * 
	 * 
	 */
	public void showUsefulcaseDetail() throws Exception
	{
		String flag =request.getParameter("flag");
		List<CaseBean> list =usefulcaseDaoimpl.showUsefulcaseDetail(flag);
		Map<String, Object>m =new HashMap<String, Object>();
		m.put("root", list);
		response.setContentType("text/html;charset=UTF-8");
		response.setHeader("pragma", "no-cache");
	    response.setHeader("cache-control", "no-cache");
	    String s =Jacksonutil.objectToJson(m);
	    System.out.println(s);
	    response.getWriter().write(s);
	}
	/**
	 * 
	 * ���»��߱���
	 * 
	 * @throws Exception
	 */
	public void saveOrUpdateUsefulCase() throws Exception{
		String[] str =request.getParameterValues("record");
		String minlength="";
		String maxlength="";
		String ischar="";
		String isnum="";
		String ismark="";	
		StringBuffer condition =new StringBuffer();
		String method ="";
		
		if(request.getParameter("maxlength")!=null&&request.getParameter("minlength")!=null&&request.getParameter("ismark")!=null&&request.getParameter("isnum")!=null&&request.getParameter("ischar")!=null){
			ismark=request.getParameter("ismark");
			ischar =request.getParameter("ischar");
			isnum =request.getParameter("isnum");
			condition.append("������");
			if(isnum.equals("1"))
			{
				condition.append(" ��������");						
			}else{
				condition.append(" ����������");
			}
			if(ischar.equals("1"))
			{
				condition.append(" ������ĸ");						
			}else{
				condition.append(" ��������ĸ");
			}if(ismark.equals("1"))
			{
				condition.append(" �����������");						
			}else{
				condition.append(" �������������");
			}
			maxlength=request.getParameter("maxlength");
			condition.append(" ��󳤶�Ϊ:"+maxlength);
			minlength=request.getParameter("minlength");
			condition.append(" ��С����Ϊ:"+minlength);
		}else{
			condition.append("��������");
		}
		String flag = request.getParameter("flag");
		String []tmp =flag.split(",");
		if(tmp[1].indexOf(tmp[0])!=-1)
		{
			tmp[1] =tmp[1].replace(tmp[0], "");
			flag =tmp[0]+","+tmp[1];
			condition.setLength(0);
			condition.append("��ʷ��¼");			
		}
		String method1[]={"txtboundary","comboboundary","txtequivalent","doublecombined","thirdcombined","combined","comboequivalent"};
		String method2[]={"�ı���ı߽編","������ı߽編","�ı���ĵȼ��෨","���ڲ������������ϲ��Է�","���ڲ���������ϲ��Է�","ȫ��ϲ��Է�","������ĵȼ��෨"};
		for(int i=0;i<method1.length;i++){
			if(method1[i].equals(tmp[0])){
				method=method2[i];
				break;
			}
		}
		/*if(tmp[0].equals("txtboundary")){
			method="�ı���ı߽編";
		}else if(tmp[0].equals("comboboundary")){
			method="������ı߽編";
		}else if(tmp[0].equals("txtequivalent")){
			method="�ı���ĵȼ��෨";
		}else if(tmp[0].equals("doublecombined")){
			method="��ż��ϲ��Է�";
		}else if(tmp[0].equals("thirdcombined")){
			method="������ϲ��Է�";
		}else if(tmp[0].equals("combined")){
			method="ȫ��ϲ��Է�";
		}else{
			method="������ĵȼ��෨";
		}*/
		flag =flag.replace(",", "");
		UsefulCaseBean usefulCaseBean =new  UsefulCaseBean(null, method, flag, tmp[1], condition.toString());
		String msg = usefulcaseDaoimpl.saveUsefulcase(usefulCaseBean);	
		Map<String, Object> m =new HashMap<String, Object>();
		response.setContentType("application/json;charset=UTF-8");
	    response.setHeader("pragma", "no-cache");
	    response.setHeader("cache-control", "no-cache");
		if(msg!=null){
			
			m.put("msg","exit");		
			
		}else{
			m.put("msg","");
		}				
	    String s =Jacksonutil.objectToJson(m);
	    response.getWriter().write(s);
		System.out.println(s);

	}
	/**
	 * 
	 * 
	 * ����excel
	 * 
	 */
	public String outputUsefulcaseExcel() throws IOException{
		String record =request.getParameter("record");
	
		String[] titles={"����"};
		String filename ="�������ɱ�";
	
		response.setHeader("Content-type",
				"application/x-msdownload;charset=UTF-8");

		response.setHeader("Content-disposition", "attachment;filename="
				+ new String(filename.getBytes("GBK"), "ISO-8859-1") + ".xls");
		OutputStream os = null;
		os = response.getOutputStream();
		usefulcaseDaoimpl.outputExcel(os, filename, titles, record);
		if (os != null) {
			os.close();
		}
		return null;				
	}
	/**
	 * 
	 * ɾ����
	 * 
	 * 
	 */
	public void deleteRow()
	{
		String id =request.getParameter("id");
		usefulcaseDaoimpl.deleteRow(id);
	}
	/**
	 * ģ����ѯ�����ѯ
	 * 
	 * 
	 */
	public void showSearchResult(){
		String msg="";
		if(request.getParameter("query")==null){
			msg="";
			return;
		}else {
			msg=request.getParameter("query");
		}
		List<Map<String,Object>> list =usefulcaseDaoimpl.showsearchList(msg);
		Map<String, Object> m =new HashMap<String, Object>();
		m.put("root", list);		
		response.setContentType("application/json;charset=UTF-8");
	    response.setHeader("pragma", "no-cache");
	    response.setHeader("cache-control", "no-cache");
	    String s =Jacksonutil.objectToJson(m);
	    try {
			response.getWriter().write(s);
		} catch (IOException e) {
			// TODO �Զ����ɵ� catch ��
			e.printStackTrace();
		}
		System.out.println(s);
	}


	

}
