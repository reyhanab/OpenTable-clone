from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired, Length


class ReviewForm(FlaskForm):
    rating = DecimalField('rating', validators=[DataRequired()])
    review = StringField('review', validators=[DataRequired(), Length(min=2, max=2000, message="Review must be less than 2000 characters." )])