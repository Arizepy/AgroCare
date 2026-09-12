from flask import Flask, jsonify, Blueprint, request

api = Blueprint('api', __name__)

@api.route('/resource', methods = ['GET', 'POST'])
def getTemperature(): 
    data = request.get_json()
    food_level = 3
    water_level = 2

    return jsonify({'data' : [food_level, water_level]}), 200


api.route('/environmentalData', methods = ['GET', 'POST'])
def resource_level(): 
    data = request.get_json()
    temperature = data['temperature']
    humidity = data['humidty']
    door_status = data['data_status']

    return jsonify({'data' : [temperature, humidity, door_status]}), 200

