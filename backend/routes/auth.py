from flask import Blueprint, request, jsonify


auth = Blueprint('auth', __name__)

@auth.route('/login', methods = ['GET', 'POST'])
def login(): 
    #Get username and phone number
    data = request.get_json()
    user_name = data.userName
    phone = data.userNumber 

    if len(phone) < 10: 
        return jsonify({'error': 'Phone number must be 10 characters'}), 404

    elif len(user_name) < 3: 
        return jsonify({'error': 'User name is too short'}), 404 

    else : 
        return jsonify({'success': 'Login successful'}), 200 