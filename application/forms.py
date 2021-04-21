from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField, BooleanField, IntegerField, TextAreaField, HiddenField
from wtforms.validators import DataRequired

class login_form(FlaskForm):
  email = StringField(validators=[DataRequired("Your username is required for login.")])
  password = PasswordField(validators=[DataRequired("Your password is required for login")])
  submit = SubmitField("Log In")

class project_form(FlaskForm):
  name = StringField(validators=[DataRequired("A project name is required.")], label='Project Name')
  description = TextAreaField(label='Project Description', render_kw={'placeholder': 'Something short and sweet'})
  create = SubmitField('Create Project')
  edit = SubmitField('Edit Project')

class coblo_form(project_form):
  image_background = StringField(label='Image Background Color', render_kw={'placeholder': 'i.e. #000000 for black'})
  image_width = IntegerField('Image Width', render_kw={'placeholder': 'In pixels, default is 1280'})
  image_height = IntegerField('Image Height', render_kw={'placeholder': 'In pixels, default is 1024'})
  outer_margins = IntegerField('Outer Margin', render_kw={'placeholder': 'In pixels, distance from the edge of the image'})
  central_margins = IntegerField('Central Margin', render_kw={'placeholder': 'In pixels, distance from middle of the image'})
  object_width = IntegerField('Object Width', render_kw={'placeholder': 'In pixels, width of each colored block'})
  object_height = IntegerField('Object Height', render_kw={'placeholder': 'In pixels, height of each colored block'})
  debug = BooleanField('Debugging Mode')
  radius = IntegerField('Object-Center Radius', render_kw={'placeholder': 'In pixels, distance from center of image (radial mode only)'})
  fixation_cross_show = BooleanField('Show Fixation Cross', default=True)
  fixation_cross_color = StringField('Fixation Cross Color', render_kw={'placeholder': 'i.e. #ffffff for white'})
  fixation_cross_thickness = IntegerField('Fixation Cross Thickness', render_kw={'placeholder': 'In pixels, line thickness'})
  fixation_cross_length = IntegerField('Fixation Cross Length', render_kw={'placeholder': 'In pixels, line length'})
  colors = StringField('Color Options', render_kw={'placeholder': 'Possible colors, separated by commas and no spaces'})

class save_image_pair_form(FlaskForm):
  project_id = HiddenField()
  stimulus_JSON = TextAreaField()
  comments = TextAreaField()
  save = SubmitField()