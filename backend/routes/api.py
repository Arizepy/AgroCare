from flask import Flask, jsonify, Blueprint, request

api = Blueprint('api', __name__)

@api.route('/getTemperature', methods = ['GET', 'POST'])
def home_page(): 
    pass 


@api.route('/login', methods = ['GET', 'POST'])
def auth() : 
    data = request.get_json()
    user_name = data.get('username')
    user_phone = data.get('usernumber')
    print(f"Username : {user_name}, Usernumber: {user_phone}")
    return jsonify({'hello': 'hello'}), 200