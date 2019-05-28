# -*- coding: utf-8  -*-
from konlpy.corpus import kolaw
from konlpy.corpus import kobill
#import MySQLdb
import pymysql
import re

conn = pymysql.connect(host = '3.15.75.68', user = 'root', password = '1234' ,db = 'CAP')
# host = DB주소(localhost 또는 ip주소), user = DB id, password = DB password, db = DB명
curs = conn.cursor()


sql = "insert into jaum(jaum) VALUES('ㄱ')"
curs.execute(sql)

sql = "insert into jaum(jaum) VALUES('ㄴ')"
curs.execute(sql)


sql = "insert into jaum(jaum) VALUES('ㄷ')"
curs.execute(sql)


sql = "insert into jaum(jaum) VALUES('ㄹ')"
curs.execute(sql)


sql = "insert into jaum(jaum) VALUES('ㅁ')"
curs.execute(sql)


sql = "insert into jaum(jaum) VALUES('ㅂ')"
curs.execute(sql)


sql = "insert into jaum(jaum) VALUES('ㅅ')"
curs.execute(sql)


sql = "insert into jaum(jaum) VALUES('ㅇ')"
curs.execute(sql)


sql = "insert into jaum(jaum) VALUES('ㅈ')"
curs.execute(sql)


sql = "insert into jaum(jaum) VALUES('ㅊ')"
curs.execute(sql)


sql = "insert into jaum(jaum) VALUES('ㅋ')"
curs.execute(sql)


sql = "insert into jaum(jaum) VALUES('ㅌ')"
curs.execute(sql)


sql = "insert into jaum(jaum) VALUES('ㅍ')"
curs.execute(sql)


sql = "insert into jaum(jaum) VALUES('ㅎ')"
curs.execute(sql)



sql = "SELECT * FROM CAP.jaum"
curs.execute(sql) # 쿼리문 실행

rows = curs.fetchall() # 데이터 패치

for i in rows :
     print(i)
conn.commit()
conn.close()
