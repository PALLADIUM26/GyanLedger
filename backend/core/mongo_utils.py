from pymongo import MongoClient
# import gridfs
# from django.conf import settings

from gridfs import GridFS
from bson.objectid import ObjectId
# import pymongo
from django.utils.timezone import now

# Connect to MongoDB (local)
client = MongoClient("mongodb://localhost:27017/")
db = client["gl2"]
fs = GridFS(db)

def save_image(file, username):
    existing = fs.find_one({'username': username})
    if existing:
        fs.delete(existing._id)

    file_id = fs.put(file.read(), filename=file.name, username=username)
    return str(file_id)


def get_image(username):
    # file = fs.find_one({"filename": filename})
    file = fs.find_one({'username': username})
    return file if file else None
