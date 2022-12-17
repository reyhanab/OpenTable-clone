from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Saved

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


#Get all saved restaurants for a user
@user_routes.route('/<int:id>/saved', methods=['GET'])
def get_saved(id):

    saved_rests = Saved.query.filter(Saved.user_id == id).all()
    return {"Saved":[saved.to_dict()
                           for saved in saved_rests]}


#Edit user profile
# user_routes.route('/<int:id>/edit', methods=['PUT'])