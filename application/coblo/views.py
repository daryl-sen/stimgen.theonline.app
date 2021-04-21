from flask import render_template, Blueprint, redirect, url_for, flash, request
import json
from application.forms import login_form, coblo_form, save_image_pair_form
from application.models import Users, Projects
from application import db
from flask_login import login_user, login_required, logout_user, current_user

coblo = Blueprint('coblo', __name__, template_folder = 'templates/coblo')

@coblo.route('/')
def index():
  return render_template('coblo-index.html')

@coblo.route('/projects/<string:ref_id>', methods=['get', 'post'])
def projects(ref_id):
  target_project = Projects.query.filter_by(ref_id=ref_id).first()
  if target_project is None:
    form = coblo_form()
    project_settings = None
    mode = 'create'
      
  else:
    form = coblo_form(obj=target_project)
    project_settings = target_project.config_JSON
    mode = 'edit'

  if form.validate_on_submit():    
    new_JSON = json.dumps({
      "imageBackground":form.image_background.data,
      "imageWidth":form.image_width.data,
      "imageHeight":form.image_height.data,
      "outerMargins":form.outer_margins.data,
      "centralMargins":form.central_margins.data,
      "objectWidth":form.object_width.data,
      "objectHeight":form.object_height.data,
      "radial":{
        "radius": form.radius.data
      },
      "fixationCross": {
        "color":form.fixation_cross_color.data,
        "thickness":form.fixation_cross_thickness.data,
        "length":form.fixation_cross_length.data,
        "show":form.fixation_cross_show.data,
      },
      "debug":form.debug.data,
      "colors":form.colors.data.split(',')
    })
    if mode == 'edit':
      target_project.config_JSON = new_JSON
      db.session.commit()
      flash(f'Your settings for {target_project.name} have been updated.')
      return redirect(url_for('coblo.projects', ref_id=target_project.ref_id))
    elif mode == 'create':
      new_project = Projects('ref_id', current_user.id, form.name.data, form.description.data, new_JSON)
      db.session.add(new_project)
      db.session.commit()
      return redirect(url_for('coblo.projects', ref_id=new_project.ref_id))
  else:
    for field, error in form.errors.items():
      flash('{} ({} error)'.format(error[0], field))
  
  return render_template('coblo-projects.html', form=form, project_settings=project_settings)

@coblo.route('/new')
def new():
  form = coblo_form()
  return render_template('coblo-new.html', form=form)