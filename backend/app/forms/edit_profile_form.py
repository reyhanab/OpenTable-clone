from flask_wtf import FlaskForm
from wtforms import StringField, FormField, FieldList
from wtforms.validators import DataRequired, Email, ValidationError, StopValidation, Length, Optional
from app.models import User
from flask_login import current_user


def email_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and not user.id == current_user.id:
        raise ValidationError('Email address is already in use.')

def optional(form, field):
    # Checks if input is empty and stops the validation sequence
    if field.raw_data is None or not len(field.raw_data):
        raise StopValidation()

class EditProfileForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired(),
                            Length(min=2, max=20, message="First name must be between 2 to 20 characters long." )
                            ])
    last_name = StringField('last_name', validators=[DataRequired(),
                            Length(min=2, max=20, message="Last name must be between 2 to 20 characters long." )
                            ])
    email = StringField('email', validators=[optional, Email(), email_exists])
    phone_number = StringField('phone_number', validators=[Optional(),
                        Length(min=10, message="invalid phone number")
                        ])
    city = StringField('city', validators=[optional])
    address = StringField('address', validators=[optional])
    profile_picture = FieldList(FormField('profile_picture'), validators=[optional])