# -*- coding: utf-8  -*-
from konlpy.corpus import kolaw
from konlpy.corpus import kobill
#import MySQLdb
import pymysql
import re



conn = pymysql.connect(host = '3.15.75.68', user = 'root', password = '1234' ,db = 'CAP')
# host = DB주소(localhost 또는 ip주소), user = DB id, password = DB password, db = DB명
curs = conn.cursor()


c = kolaw.open('constitution.txt').read()
#print(type(c))
c = re.sub(r'\n',' ',c)
c = re.sub('  ',' ',c)
k = c.split(' ')
n = []
for i in k:
    if len(i) == 3 and i.isalpha() == True :
        n.append(i)

for j in n:
    sql = "insert into CAP.data(word,flag) VALUES('"+j+"',1)"
    curs.execute(sql)


sql = "SELECT * FROM data"
curs.execute(sql) # 쿼리문 실행

rows = curs.fetchall() # 데이터 패치

for i in rows :
     print(i)
conn.commit()
conn.close()


'''
c = kolaw.open('1809890.txt').read()
c = re.sub(r'\n',' ',c)
c = re.sub('  ',' ',c)
k = c.split(' ')
for i in k:
    if len(i) == 3:
        n.append(i)
'''


#print (n)
