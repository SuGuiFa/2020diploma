package com.textUser.dao.impl;

import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.hibernate.Session;

import com.hibernate.HibernateSessionFactory;
import com.textUser.bean.CaseBean;
import com.textUser.dao.ComboBoundaryDao;
import com.util.UserUtil;

public class ComboBoundaryDaoimpl implements ComboBoundaryDao {/**
	 * 
	 * ���»��߱���
	 * 
	 * 
	 */
		
		private  UserUtil userutil =new UserUtil();
		@Override
		public List<Long> saveOrUpdateBoundaryCase(List<CaseBean> list) {
			// TODO �Զ����ɵķ������
			Session session=HibernateSessionFactory.getSession();
			
			session.beginTransaction();
			List<Long> ids =new ArrayList<Long>();
			for(int i=0;i<list.size();i++)
			{
				CaseBean casebean =list.get(i);
				if(casebean.getId()==null)
				{				
					ids.add((Long) session.save(casebean));							
				}else
				{				
					session.update(casebean);							
				}
			}
			session.getTransaction().commit();
			session.close();		
			System.out.println(Arrays.toString(ids.toArray(new Object[ids.size()])));
			return ids;
		}
	/**
	 * 
	 * 
	 * ɾ��ѡ����
	 */
		@Override
		public void deleteRow(String id) {
			// TODO �Զ����ɵķ������
			Session session=HibernateSessionFactory.getSession();		
			session.beginTransaction();
			try {
				CaseBean casebean= (CaseBean) session.createSQLQuery("select *  FROM t_usecase where id=?").addEntity(CaseBean.class).setString(1, id).uniqueResult();
				session.delete(casebean);
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
				session.getTransaction().rollback();
				return ;
			}
			session.getTransaction().commit();
			session.close();
			
		}
		/**
		 * 
		 * 
		 * �����ݿ��е�������excel
		 */
	@Override
	public void outputExcel(OutputStream os, String filename, String[] titles,String date) {
		// TODO �Զ����ɵķ������
		List<CaseBean> list =new ArrayList<CaseBean>();
		Session session=HibernateSessionFactory.getSession();		
		session.beginTransaction();
		try {
			String sql ="select * from t_usecase where flag=?";
			//��������
			list=session.createSQLQuery(sql).addEntity(CaseBean.class).setString(1, date).list();
		} catch (Exception e) {
			e.printStackTrace();
			
			// TODO: handle exception
		}
		userutil.outputExcel(os, list, filename, titles);
		session.getTransaction().commit();
		session.close();

	}
	@Override
	public List<CaseBean> showCase(String flag) {
		// TODO �Զ����ɵķ������
		List<CaseBean> list =new ArrayList<CaseBean>();
		Session session=HibernateSessionFactory.getSession();		
		session.beginTransaction();
		try {
			String sql ="select * from t_usecase where flag=?";
			//��������
			flag ="comboboundary"+flag;
			list=session.createSQLQuery(sql).addEntity(CaseBean.class).setString(1, flag).list();
		} catch (Exception e) {
			e.printStackTrace();
			
			// TODO: handle exception
		}
		session.getTransaction().commit();
		session.close();
		return list;
	}
	@Override
	public List<CaseBean> showCombobox(){
		List<CaseBean> list =new ArrayList<CaseBean>();
		Session session=HibernateSessionFactory.getSession();		
		session.beginTransaction();
		try {
			String sql ="select * from t_usecase ";
			//��������
			list=session.createSQLQuery(sql).addEntity(CaseBean.class).list();	
		} catch (Exception e) {
			e.printStackTrace();
			
			// TODO: handle exception
		}
		session.getTransaction().commit();
		session.close();
		return list;

	}
	}
