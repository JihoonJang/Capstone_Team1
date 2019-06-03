# For both Python 2.7 and Python 3.x
import base64
f = open("file.txt", 'rb')
img_data = f.read()
#print(img_data)
with open("imageToSave.png", "wb") as fh:
    fh.write(img_data)
    f.close()
