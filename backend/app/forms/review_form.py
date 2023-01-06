from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    rating = DecimalField('rating', validators=[DataRequired()])
    review = StringField('review', validators=[DataRequired()])