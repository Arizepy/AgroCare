from flask import Blueprint,redirect


home = Blueprint('home_bp', __name__)

@home.route('/', methods = ['GET'])
def home_page():
    return None