from flask import render_template, Blueprint, redirect, url_for, flash, request, jsonify, make_response
from application.forms import login_form
from application.models import Users, Projects
from application import db
from flask_login import login_user, login_required, logout_user, current_user

core = Blueprint('core', __name__, template_folder = 'templates/core')

@core.route('/')
def index():
  return render_template('index.html')

@core.route('/login', methods=['post', 'get'])
def login():
  form = login_form()
  if form.validate_on_submit():
    this_user = Users.query.filter_by(email = form.email.data.lower()).first()
    if this_user is not None and this_user.check_password(form.password.data):
      login_user(this_user)
      flash(f'Welcome back, {this_user.display_name}')      
      return redirect(url_for('core.dashboard'))
    else:
      flash('You have provided a wrong email or password.')
      return redirect(url_for('core.login'))
  else:
    for field, error in form.errors.items():
      flash('{} ({} error)'.format(error[0], field))
  return render_template('login.html', form = form)

@core.route('/logout')
@login_required
def logout():
  logout_user()
  flash('Logged out.')
  return redirect(url_for('core.login'))

@core.route('/dashboard')
@login_required
def dashboard():
  my_projects = Projects.query.filter_by(user_id=current_user.id).all()
  if len(my_projects) == 0:
    my_projects = None
  return render_template('dashboard.html', my_projects=my_projects)

@core.route('/apps')
def apps():
  return render_template('apps.html')