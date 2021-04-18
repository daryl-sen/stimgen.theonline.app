from flask import render_template, Blueprint, redirect, url_for, flash, request, jsonify, make_response
from application.forms import login_form
from application.models import Users
from application import db
from flask_login import login_user, login_required, logout_user, current_user

coblo = Blueprint('coblo', __name__, template_folder = 'templates/coblo')

@coblo.route('/')
def index():
  return render_template('coblo-index.html')