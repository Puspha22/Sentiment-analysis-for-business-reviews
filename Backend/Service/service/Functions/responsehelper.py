from flask import jsonify

# a function to send response in predefined format
# function is called everytime when a request is made

def responseHelper(code, message, data, error, meta):
    return jsonify({
        "code": code, 
        "data": data, 
        "error": error, 
        "message": message,
        "meta": meta
        })

def successResponse(message="",code=200):
    return jsonify({
        "code": code,
        "message": message,
        "status": True,
    }),code

def errorResponse(error="",code=400):
    return jsonify({
        "code": code,
        "error": error,
        "status" :False,
    }),code

def successWithResponse(data="",message="",code=200):
    return jsonify({
        "code": code,
        "data":data,
        "message": message,
        "status" : True,
    }),code