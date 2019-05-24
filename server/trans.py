# -*- coding: utf-8  -*-
import sys
import json
import hbcvt
flag = sys.argv[1]
def tr(a):
    print(str(hbcvt.h2b.text(str(a))))
    print(flag) 
tr(flag)

