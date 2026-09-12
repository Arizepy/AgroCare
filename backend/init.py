from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
import os 


#db = SQLAlchemy()
def create_app(): 

    app = Flask(__name__)
    CORS(app, supports_credentials=True)

    #Register blueprints 
    from routes.api import api 
    from routes.auth import auth 
    from routes.home import home
    app.register_blueprint(api, url_prefix = '/api')
    app.register_blueprint(home,url_prefix = '/' )
    app.register_blueprint(auth, url_prefix = '/auth')

    #Setup secret key 
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
   # app.config['SQLACHEMY_DATABASE_URI'] = 'sqlite:///agrocare.db'

    #Set db configurations 
   # db.init_app(app)
    
    #with app.app_context():
       # db.create_all()
    return app 
