# Importing required libraries
from flask import request, url_for, send_from_directory
import requests
from werkzeug.utils import secure_filename
import os
import json

# Importing required modules
from service import app
from service.Models.services import Service
from service.Functions.responsehelper import *
from service.Functions.fileprocessing import process_file
from service.Functions.apiprocessing import process_api
from service.Functions.textprocessing import process_text

# Allowed file extensions
ALLOWED_EXTENSIONS = {'txt'}

# Function to check if the file extension is allowed
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Path to the folder where the files will be stored
UPLOAD_FOLDER = '/service/service/Uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Route to upload files
@app.route('/uploads/<name>')
def download_file(name):
    return send_from_directory(app.config["UPLOAD_FOLDER"], name)

# Route that returns json response
@app.route('/reviews', methods=['GET'])
def get_reviews():
    with open("service/Routes/reviews.json") as json_file:
        data = json.load(json_file)
    return responseHelper(200, "File uploaded", data, "", "")

# Route to read file
@app.route('/getFile', methods=['POST'])
def get_file():
    token = request.headers.get("authToken")
    # Checking if user is authenticated
    try:
        url= "http://user:5000/profile"
        headers = {"authToken": token}
        response = requests.get(url, headers=headers)
        response_json = response.json()
        if response_json["code"] == 200:
            user = response_json["data"]
        else:
            return errorResponse("Invalid token", 400)
    except:
        return errorResponse("Unable to get profile", 400)
    
    if 'file' not in request.files:
        return errorResponse('No file part')
    file = request.files['file']
    if file.filename == '':
        return errorResponse('No selected file')
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        file_path = url_for('download_file', name=filename)
        service = Service(user=user, filePath=file_path)
        service.save()
        prediction = process_file(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        # result = []
        # for i in prediction:
        #     i = i.tolist()
        #     result.append(i)
        return responseHelper(200, "File uploaded", prediction, "", "")
    else:
        return errorResponse("Please provide valid file")

# Route to read api
@app.route('/getApi', methods=['POST'])
def get_api():
    token = request.headers.get("authToken")
    # Checking if user is authenticated
    try:
        url= "http://user:5000/profile"
        headers = {"authToken": token}
        response = requests.get(url, headers=headers)
        response_json = response.json()
        if response_json["code"] == 200:
            user = response_json["data"]
        else:
            return errorResponse("Invalid token", 400)
    except:
        return errorResponse("Unable to get profile", 400)
    
    data = request.get_json()
    endPoint = data["endPoint"]
    if endPoint:
        service = Service(user=user,endPoint=endPoint)
        service.save()
        # Get response from endpoint
        try:
            response = requests.get(endPoint)
            response_json = response.json()
        except:
            return errorResponse("Unable to get response from endpoint", 400)         
        prediction = process_api(response_json["data"])
        # result = []
        # for i in prediction:
        #     i = i.tolist()
        #     result.append(i)
        return responseHelper(200, "Endpoint saved", prediction, "", "")
    else:
        return errorResponse("Please provide endpoint")


# Route to receive text data
@app.route('/getText', methods=['POST'])
def get_text():
    token = request.headers.get("authToken")
    # Checking if user is authenticated
    try:
        url= "http://user:5000/profile"
        headers = {"authToken": token}
        response = requests.get(url, headers=headers)
        response_json = response.json()
        if response_json["code"] == 200:
            user = response_json["data"]
        else:
            return errorResponse("Invalid token", 400)
    except:
        return errorResponse("Unable to get profile", 400)
    
    data = request.get_json()
    text = data["text"]
    if text:
        service = Service(user=user, text=text)
        service.save()
        prediction = process_text(text)
        return responseHelper(200, "Text saved", prediction, "", "")
    else:
        return errorResponse("Please provide text")
