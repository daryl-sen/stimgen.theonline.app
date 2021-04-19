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

class coblo_form(project_form):
  image_background = StringField('Image Background Color')
  image_width = StringField('Image Width')
  image_height = StringField('Image Height')
  outer_margins = StringField('Outer Margin')
  central_margins = StringField('Central Margin')
  object_width = StringField('Object Width')
  object_height = StringField('Object Height')
  debug = StringField('Debugging Mode')
  radius = StringField('Object-Center Radius')
  fixation_cross_show = StringField('Show Fixation Cross')
  fixation_cross_color = StringField('Fixation Cross Color')
  fixation_cross_thickness = StringField('Fixation Cross Thickness')
  fixation_cross_length = StringField('Fixation Cross Length')