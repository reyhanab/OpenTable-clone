from flask import Blueprint, jsonify, redirect, url_for, request
from flask_login import login_required, current_user
from app.models import User, Saved, db
from app.forms import EditProfileForm
from .auth_routes import validation_errors_to_error_messages

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


#Delete a user profile
@user_routes.route('/profile', methods=['DELETE'])
@login_required
def delete_user():

    db.session.delete(current_user)
    db.session.commit()
    return jsonify({"message":"Successfully deleted"})


#Edit user profile
@user_routes.route('/profile', methods=['PUT'])
@login_required
def edit_user_profile():

    form = EditProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        for key, val in form.data.items():
            if val:
                setattr(current_user, key, val)
        db.session.commit()
        return current_user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
