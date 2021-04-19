from application import db, login_manager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime as dt

@login_manager.user_loader
def load_user(user_id):
  return Users.query.get(user_id)

class Users(db.Model, UserMixin):
  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(100), index=True)
  password = db.Column(db.String(200))
  display_name = db.Column(db.String(100))
  projects = db.relationship('projects', backref='project_owner', cascade='all,delete')

  def __init__(self, email, password, display_name):
    self.email = email
    self.display_name = display_name
    self.password = generate_password_hash(password)
  
  def check_password(self, password):
    return check_password_hash(self.password, password)

class Projects(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  ref_id = db.Column(db.Integer, index=True)
  name = db.Column(db.String(100))
  creation_date = db.Column(db.DateTime)
  last_accessed = db.Column(db.DateTime)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  config_JSON = db.Column(db.Text)

  def __init__(self, user_id, name, creation_date, last_accessed, config_JSON):
    self.ref_id = ref_id
    self.user_id = user_id
    self.name = name
    self.creation_date = creation_date
    self.last_accessed = last_accessed
    self.config_JSON = config_JSON