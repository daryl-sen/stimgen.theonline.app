from flask import render_template, Blueprint, redirect, url_for, flash, request, jsonify, make_response
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

@coblo.route('/projects/<string:ref_id>')
def projects(ref_id):
  target_project = Projects.query.filter_by(ref_id=ref_id).first()
  form = coblo_form(obj=target_project)
  print("form meta:", form.meta)
  return render_template('coblo-projects.html', form=form, project_settings=target_project.config_JSON)