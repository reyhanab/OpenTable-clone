from flask_wtf import FlaskForm
from wtforms import IntegerField, DateField, TimeField, StringField
from wtforms.validators import DataRequired

class ReservationForm(FlaskForm):
    count = IntegerField('count', validators=[DataRequired()])
    date = DateField('date', validators=[DataRequired()])
    time = TimeField('time', validators=[DataRequired()])
