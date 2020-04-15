package com.util;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Component;

import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.write.Label;
import jxl.write.NumberFormat;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

import com.textUser.bean.CaseBean;

public  class UserUtil {
	
	public UserUtil() {

	}
	public  String creatNumOrCharOrMarkByRandom (int length,String total)
	{
		String val="";
		Random random = new Random();      
		for(int i=0;i<length;i++)
		{			
			if(total.length()!=0)
			{
				val+=total.charAt(random.nextInt(total.length()));	
			}
		}
		return val;
	}
	public  String createByRandom(int length ,int isChar, int isNum,int isMark)
	{				           
        //����length����ʾ���ɼ�λ�����  
        String Char="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String Num ="012345678901234567890123456789012345678901234567890123456789";
        String Mark=",.=_+()*&^%$#@!";
        String total="";
        if(isChar==1)
        {
        	total+=Char;         			     
        }
        if(isNum==1)
        {
        	total+=Num;
        }
        if(isMark==1){
        	total+=Mark;
        }        
        return creatNumOrCharOrMarkByRandom(length,total);
	}
	/**
	 * 
	 * 
	 * ����EXCEL
	 * 
	 * @param os
	 * @param casebean
	 * @param filename
	 */
	public void outputExcel(OutputStream os,List<CaseBean> list ,String filename,String[] titles)
	{
		WritableWorkbook wbook;
		try {
			wbook = Workbook.createWorkbook(os);
			WritableSheet wsheet = wbook.createSheet(filename, 0);

			/**
			 * ���ÿ��
			 */
			for (int i = 0; i < 100; i++) {
				wsheet.setColumnView(i, 20);
			}
			// ��Ӵ�������Formatting�Ķ���
			WritableFont wf_title = new WritableFont(
					WritableFont.createFont("����"), 12, WritableFont.BOLD, false);
			WritableCellFormat wcf_title = new WritableCellFormat(wf_title);
			wcf_title.setAlignment(Alignment.LEFT);
			wcf_title.setBorder(Border.ALL, BorderLineStyle.THIN);
			WritableFont wf_c = new WritableFont(WritableFont.createFont("����"),
					12, WritableFont.NO_BOLD, false);
			WritableCellFormat wcf_c = new WritableCellFormat(wf_c);
			wcf_c.setAlignment(Alignment.LEFT);
			wcf_c.setBorder(Border.ALL, BorderLineStyle.THIN);

			jxl.write.NumberFormat nf = new NumberFormat("#,##0.00");
			WritableCellFormat wcf_num = new WritableCellFormat(nf);
			wcf_num.setBorder(Border.ALL, BorderLineStyle.THIN);
			// ///
			WritableFont wf_Head = new WritableFont(
					WritableFont.createFont("����"), 18, WritableFont.BOLD, false);
			WritableCellFormat wcf_Head = new WritableCellFormat(wf_Head);
			// ����
			wcf_Head.setAlignment(jxl.format.Alignment.CENTRE);
			wcf_Head.setBorder(Border.ALL, BorderLineStyle.THIN);
			int col=1;
			if(titles!=null){
				for(String title :titles){
					Label titleLabel = new Label(col,0, title, wcf_title);
					wsheet.addCell(titleLabel);
					col++;		
				}
			}
			int index =1;
			for(int row =0;row<list.size();row++)
			{
				//����к�
				wsheet.addCell(new Label(0, row+1,String.valueOf(row)));				
				for(int column =1;column<titles.length+1;column++)
				{
					//�����ı� ��λ��
					CaseBean Case= list.get(row);
					String use =Case.getUser();	
					
					Label label =new Label(column, row+1,use);
					//��ӵ���Ԫ��
					wsheet.addCell(label);
				}
			}
			wbook.write();
			wbook.close();			
		} catch (Exception e) {
			// TODO �Զ����ɵ� catch ��
			e.printStackTrace();
		}
		
	}
	
	public void outputCombinedExcel(OutputStream os,List<CaseBean> list ,String filename,String[] titles)
	{
		WritableWorkbook wbook;
		try {
			wbook = Workbook.createWorkbook(os);
			WritableSheet wsheet = wbook.createSheet(filename, 0);

			/**
			 * ���ÿ��
			 */
			for (int i = 0; i < 100; i++) {
				wsheet.setColumnView(i, 20);
			}
			// ��Ӵ�������Formatting�Ķ���
			WritableFont wf_title = new WritableFont(
					WritableFont.createFont("����"), 12, WritableFont.BOLD, false);
			WritableCellFormat wcf_title = new WritableCellFormat(wf_title);
			wcf_title.setAlignment(Alignment.LEFT);
			wcf_title.setBorder(Border.ALL, BorderLineStyle.THIN);
			WritableFont wf_c = new WritableFont(WritableFont.createFont("����"),
					12, WritableFont.NO_BOLD, false);
			WritableCellFormat wcf_c = new WritableCellFormat(wf_c);
			wcf_c.setAlignment(Alignment.LEFT);
			wcf_c.setBorder(Border.ALL, BorderLineStyle.THIN);

			jxl.write.NumberFormat nf = new NumberFormat("#,##0.00");
			WritableCellFormat wcf_num = new WritableCellFormat(nf);
			wcf_num.setBorder(Border.ALL, BorderLineStyle.THIN);
			// ///
			WritableFont wf_Head = new WritableFont(
					WritableFont.createFont("����"), 18, WritableFont.BOLD, false);
			WritableCellFormat wcf_Head = new WritableCellFormat(wf_Head);
			// ����
			wcf_Head.setAlignment(jxl.format.Alignment.CENTRE);
			wcf_Head.setBorder(Border.ALL, BorderLineStyle.THIN);
			wsheet.addCell(new Label(0, 0,"�к�"));
			for(int row =0;row<list.size();row++)
			{
				//����к�
				wsheet.addCell(new Label(0, row+1,String.valueOf(row+1)));
				CaseBean Case= list.get(row);
				String use =Case.getUser();
				String[] usecase=use.split(",");				
				for(int column =0;column<usecase.length;column++)
				{
					//�����ı� ��λ��
					Label label =new Label(column+1, row+1,usecase[column]);
					//��ӵ���Ԫ��
					wsheet.addCell(label);
				}
			}
			wbook.write();
			wbook.close();			
		} catch (Exception e) {
			// TODO �Զ����ɵ� catch ��
			e.printStackTrace();
		}
		
	}
	
	
	
	
	
	
	/**
	 * 
	 * �ų�������������ķ���
	 * 
	 * 
	 * @param length ��ʼresult ����
	 * @param begin list ��λ��
	 * @param list ����data������
	 * @param regexlist ������ʽ
	 * @param result1 ���һ������
	 * @param result result1 �ļ���
	 */
	public  void deleteCaseByRegex(int length,int begin, List<List<String>> list, List<String> regexlist,StringBuffer result1,List<String> result)
	{
		Boolean flag =true;
		if(begin<list.size()){
			for(int i=0;i<list.get(begin).size();i++)
			{
				String str =list.get(begin).get(i);				
				result1.setLength(length);
				if(begin==list.size()-1){
					result1.append(str);
				}else{
					result1.append(str+",");
				}
				deleteCaseByRegex(result1.length(),begin+1, list,regexlist,result1,result);
				if(begin==list.size()-1)
				{					
					if(regexlist!=null)
					{
						
						for(String regex : regexlist){
							if(result1.toString().matches(regex)==true){
								flag=false;	
								break;
							}
						}
					}
					if(flag==true){
						result.add(result1.toString());
					}
					if(flag==false){
						flag=true;
					}
				}
			}
		}
	}
}
