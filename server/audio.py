'''from base64 import decodestring
import base64
fw = open('file.txt', 'rb')
file_content = fw.read()
imagestr = base64.encodestring(file_content)

with open("foo.png","wb") as f:
    f.write(decodestring(imagestr))

'''



import base64
fw = open('file.txt', 'r')
imgstring = fw.read()
#imagestr = base64.encodestring(file_content)


imgdata = base64.b64decode(imgstring)
filename = 'some_image.raw'  # I assume you have a way of picking unique filenames
with open(filename, 'wb') as f:
    f.write(imgdata)
