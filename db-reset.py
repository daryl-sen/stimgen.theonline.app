from application import db
from application.models import *
from db.user_seeds import users
from db.project_seeds import projects

all_seeds = [
  users,
  projects
]

all_models = [
  Users,
  Projects
]

for i in range(len(all_seeds)):
  all_models[i].query.delete()
  for seed in all_seeds[i]:
    db.session.add(all_models[i](**seed))

db.session.commit()