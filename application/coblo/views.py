from flask import render_template, Blueprint, redirect, url_for, flash, request
import json
from application.forms import login_form, coblo_form, save_image_pair_form
from application.models import Users, Projects
from application import db
from flask_login import login_user, login_required, logout_user, current_user
import shortuuid

coblo = Blueprint('coblo', __name__, template_folder = 'templates/coblo')

@coblo.route('/')
@login_required
def index():
  return render_template('coblo-index.html')

@coblo.route('/run/<string:ref_id>/<string:run_mode>/<string:target_mode>')
@login_required
def run(ref_id, run_mode, target_mode):
  def generate_target_url(run_mode, target_mode, target):

    if target == "run_mode":
      if run_mode == "change":
        new_run_mode = "flip"
      else:
        new_run_mode = "change"
      new_target_mode = target_mode
    elif target == "target_mode":
      if target_mode == "target":
        new_target_mode = "inverse"
      else:
        new_target_mode = "target"
      new_run_mode = run_mode

    return url_for('coblo.run', ref_id=ref_id, run_mode=new_run_mode, target_mode=new_target_mode)

  target_project = Projects.query.filter_by(ref_id=ref_id).first()
  form = save_image_pair_form()
  if target_project is None:
    flash('The requested project does not exist')
  print(type(target_project.config_JSON))
  return render_template('coblo-run.html', project_settings=target_project.config_JSON, form=form, run_mode=run_mode, ref_id=ref_id, target_mode=target_mode, generate_target_url=generate_target_url)

@coblo.route('/projects/<string:ref_id>', defaults={'ref_id': 'new'})
@coblo.route('/projects/<string:ref_id>', methods=['get', 'post'])
@login_required
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
      new_project = Projects(shortuuid.uuid(), current_user.id, form.name.data, form.description.data, new_JSON)
      db.session.add(new_project)
      db.session.commit()
      flash('Your new project has been created.')
      return redirect(url_for('coblo.projects', ref_id=new_project.ref_id))
  else:
    for field, error in form.errors.items():
      flash('{} ({} error)'.format(error[0], field))
  
  return render_template('coblo-projects.html', form=form, project_settings=project_settings, ref_id=ref_id)