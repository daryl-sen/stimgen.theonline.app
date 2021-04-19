from flask import render_template, Blueprint, redirect, url_for, flash, request
import json
from application.forms import login_form, coblo_form
from application.models import Users, Projects
from application import db
from flask_login import login_user, login_required, logout_user, current_user

coblo = Blueprint('coblo', __name__, template_folder = 'templates/coblo')

@coblo.route('/')
def index():
  return render_template('coblo-index.html')

@coblo.route('/run/<string:ref_id>')
def run(ref_id):
  target_project = Projects.query.filter_by(ref_id=ref_id).first()
  if target_project is None:
    flash('The requested project does not exist')
  print(type(target_project.config_JSON))
  return render_template('coblo-run.html', project_settings=target_project.config_JSON)

@coblo.route('/projects/<string:ref_id>', methods=['get', 'post'])
def projects(ref_id):
  target_project = Projects.query.filter_by(ref_id=ref_id).first()
  form = coblo_form(obj=target_project)
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
    target_project.config_JSON = new_JSON
    db.session.commit()
    flash(f'Your settings for {target_project.name} have been updated.')
    return redirect(url_for('coblo.projects', ref_id=target_project.ref_id))
  else:
    for field, error in form.errors.items():
        flash('{} ({} error)'.format(error[0], field))
  return render_template('coblo-projects.html', form=form, project_settings=target_project.config_JSON)