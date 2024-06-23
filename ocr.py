# app.py

from flask import Flask, render_template, request, redirect, session
import pytesseract
import shutil
import os
import random
try:
 from PIL import Image
except ImportError:
 import Image


app = Flask(__name__)

@app.route('/imagetotext/', methods=['GET'])
def ocr_text():
    extractedInformation = pytesseract.image_to_string(Image.open("/home/narayana77/test1.jpg"))
    print(extractedInformation)
    return {"output": extractedInformation}


    # etc etc, flask app code

if __name__ == '__main__':
    app.run()