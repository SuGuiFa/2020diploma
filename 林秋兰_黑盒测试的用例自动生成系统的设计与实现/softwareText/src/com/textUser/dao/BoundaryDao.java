package com.textUser.dao;

import java.io.OutputStream;
import java.util.List;

import com.textUser.bean.CaseBean;

public interface BoundaryDao {
	public List<Long> saveOrUpdateBoundaryCase(List<CaseBean> list);
	public void deleteRow(String id);
	public void outputExcel(OutputStream os, String filename, String[] titles,String date);
	public List<CaseBean> showCase(String flag);
	public List<CaseBean> showCombobox();
}
