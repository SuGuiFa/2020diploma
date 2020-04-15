package com.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileUtil 
{
	
	
	
	/**
	 * �����ļ����ļ���
	 * @param fromFile
	 * @param toFile
	 */
	public static void copy(File fromFile, File toFile)
	{
		if(!fromFile.exists())
		{
			System.out.println("�ϴ��ļ������ڣ�");	
			return;
		}
		if(fromFile.isFile())
		{
			try
			{
				FileInputStream fis = new FileInputStream(fromFile);
				FileOutputStream fos = new FileOutputStream(toFile);
				int len = 0;
				byte[] b = new byte[1024];
				while((len = fis.read(b)) != -1)
				{
					fos.write(b, 0, len);
				}
				fis.close();
				fos.flush();
				fos.close();
				
			} catch (FileNotFoundException e)
			{
				e.printStackTrace();
			} catch (IOException e)
			{
				e.printStackTrace();
			}
		}
		else if(fromFile.isDirectory())
		{
			File objFolder = new File(toFile.getPath() + File.separator + fromFile.getName()); //����Ŀ���ļ�
			for(File f : fromFile.listFiles())
			{
				copy(f, objFolder);
			}
		}
	}
}
	
	