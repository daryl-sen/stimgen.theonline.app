from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField
from wtforms.validators import DataRequired

class login_form(FlaskForm):
  email = StringField(validators=[DataRequired("Your username is required for login.")])
  password = PasswordField(validators=[DataRequired("Your password is required for login")])
  submit = SubmitField("Log In")

class project_form(FlaskForm):
  name = StringField('Project Name')
  create = SubmitField('Create Project')
  edit = SubmitField('Edit Project')