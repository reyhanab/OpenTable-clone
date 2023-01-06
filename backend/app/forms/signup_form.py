from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def email_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


# def username_exists(form, field):
    # Checking if username is already in use
    # username = field.data
    # user = User.query.filter(User.username == username).first()
    # if user:
    #     raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField(
        'first_name', validators=[DataRequired(), Length(min=2, max=20, message="First name must be between 2 to 20 characters long." )])
    last_name = StringField(
        'last_name', validators=[DataRequired(), Length(min=2, max=20, message="Last name must be between 2 to 20 characters long." )])
    email = StringField('email', validators=[DataRequired(), Email(), email_exists])
    password = StringField('password', validators=[DataRequired(), Length(min=6, max=20, message="Password must be between 6 to 20 characters long." )])