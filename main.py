from distutils.command.upload import upload
import os
import logging
import pathlib
import json
import sqlite3
import hashlib
from fastapi import FastAPI, Form, HTTPException,File,UploadFile
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import test_api
import test_barcode

app = FastAPI()
logger = logging.getLogger("uvicorn")
logger.level = logging.INFO
images = pathlib.Path(__file__).parent.resolve() / "images"
origins = [ os.environ.get('FRONT_URL', 'http://localhost:3000') ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET","POST","PUT","DELETE"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Hello, world!"}

'''
@app.get("/items/barcode/{barcode_num}")
def show_item_info(barcode_num):
    result_json = test_api.GetInfo(barcode_num)
    result = test_api.GetInfo(result_json)
    return result #{'name': name, 'category':category,'description': description,'transportation_method':transportation_method}
'''

@app.get("/items/barcode")
def get_item():
    #isbn = test_barcode.ReadBarcode()
    isbn = 9784151200748
    result_json = test_api.GetInfo(isbn)
    result = test_api.GetInfo(result_json)
    return result #{'name': name, 'category':category,'description': description,'transportation_method':transportation_method}