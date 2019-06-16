# -*- coding: utf-8  -*-
from konlpy.corpus import kolaw
from konlpy.corpus import kobill
#import MySQLdb
import pymysql
import re
import sys
import json
flag = sys.argv[1]
def gg(a):
    conn = pymysql.connect(host = '3.15.75.68', user = 'root', password = '1234' ,db = 'CAP')
    # host = DB주소(localhost 또는 ip주소), user = DB id, password = DB password, db = DB명
    curs = conn.cursor()

    sql = "select word from CAP.data order by rand() limit 1"
    curs.execute(sql)

    rows = curs.fetchall() # 데이터 패치

    print(rows)
    conn.commit()
    conn.close()

gg(flag)
