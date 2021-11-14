# General Steps

1. Create a python virtual environment and switch into it.
2. Install dependencies within the environment.
3. Run db migrations

## Python virtual environment

1. Install `virtualenv` or `venv`
2. Run `python3 -m venv <environment name>` to create an environemnt
3. Run `source venv/bin/activate` to switch into the environment

## Install dependencies

Run: `pip3 install -r requirements.txt`

## Run db migrations

Run:
- `flask db init`
- `flask db migrate`
- `flask db upgrade`
