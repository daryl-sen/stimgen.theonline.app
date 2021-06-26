from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

PORT = os.getenv('PORT') or 8080

basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SECRET_KEY'] = os.getenv('APP_SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
Migrate(app,db)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'core.login'

from application.core.views import core
app.register_blueprint(core, url_prefix="/")

from application.coblo.views import coblo
app.register_blueprint(coblo, url_prefix="/coblo")

from application.cobloAdj.views import cobloAdj
app.register_blueprint(cobloAdj, url_prefix="/cobloAdj")
