from application import db, login_manager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime as dt

@login_manager.user_loader
def load_user(user_id):
  return Users.query.get(user_id)

class Users(db.Model, UserMixin):
  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(100), index = True)
  password = db.Column(db.String(200))

  def __init__(self, username, password):
    self.username = username
    self.password = generate_password_hash(password)
  
  def check_password(self, password):
    return check_password_hash(self.password, password)