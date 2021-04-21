from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField, BooleanField, IntegerField, TextAreaField, HiddenField
from wtforms.validators import DataRequired

class login_form(FlaskForm):
  email = StringField(validators=[DataRequired("Your username is required for login.")])
  password = PasswordField(validators=[DataRequired("Your password is required for login")])
  submit = SubmitField("Log In")

class project_form(FlaskForm):
  name = StringField('Project Name')
  description = TextAreaField('Project Description')
  create = SubmitField('Create Project')
  edit = SubmitField('Edit Project')

class coblo_form(project_form):
  image_background = StringField('Image Background Color')
  image_width = IntegerField('Image Width')
  image_height = IntegerField('Image Height')
  outer_margins = IntegerField('Outer Margin')
  central_margins = IntegerField('Central Margin')
  object_width = IntegerField('Object Width')
  object_height = IntegerField('Object Height')
  debug = BooleanField('Debugging Mode')
  radius = IntegerField('Object-Center Radius')
  fixation_cross_show = BooleanField('Show Fixation Cross')
  fixation_cross_color = StringField('Fixation Cross Color')
  fixation_cross_thickness = IntegerField('Fixation Cross Thickness')
  fixation_cross_length = IntegerField('Fixation Cross Length')
  colors = StringField('Color Options')

class save_image_pair_form(FlaskForm):
  project_id = HiddenField()
  stimulus_JSON = TextAreaField()
  comments = TextAreaField()
  save = SubmitField()