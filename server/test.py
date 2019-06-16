# -*- coding: utf-8  -*-

import sys
import json
import hbcvt
re = []
def tr(a):
    x = hbcvt.h2b.text(str(a))

    
    rr = ""
    for i in x:
        y = i[1:]
        for j in y :
            if len(j) <= 1:
                continue
    
            for k in j:
                for xx in k[1]:
                    re.append(xx)
    for i in re:
        total = 0
        for j in range(6):
            total = total + i[j] * pow(2,5-j)
        
        rr = rr + str(total) +", "
    print(rr)


    
tr('가나다')
