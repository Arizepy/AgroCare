from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
import os 


class Base(DeclarativeBase): 
    pass


db = SQLAlchemy(model_class=Base)
def create_app(): 

    app = Flask(__name__)
    CORS(app)

    #Register blueprints 
    from routes.api import api 
    from routes.auth import auth 
    app.register_blueprint(api, url_prefix = '/api')
    app.register_blueprint(auth, url_prefix = '/auth')

    #Setup secret key 
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
    app.config['DATABASE_URI'] = os.environ.get('DATABASE_URI')

    #Set db configurations 
    db.init_app(app = app)
    
    with app.app_context():
        db.create_all()
    return app 
