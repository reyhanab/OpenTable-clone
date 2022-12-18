from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, StopValidation, Length
from app.models import User
from .signup_form import email_exists


def optional(form, field):
    # Checks if input is empty and stops the validation sequence
    if field.raw_data is None or not len(field.raw_data):
        raise StopValidation()

class EditProfileForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    email = StringField('email', validators=[optional, DataRequired(), Email(), email_exists])
    phone_number = StringField('phone_number', validators=[
                               optional, Length(min=10, max=10, message="Invalid phone number.")])
    city = StringField('city', validators=[optional])
    address = StringField('address', validators=[optional])