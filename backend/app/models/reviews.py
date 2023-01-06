from .db import db,  environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.DECIMAL, nullable=False)
    review = db.Column(db.Text, nullable=False)
    edited = db.Column(db.Boolean, default=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    user = db.relationship("User", back_populates="reviews")
    restaurant = db.relationship("Restaurant", back_populates="reviews")


    def to_dict(self):
        return {
            'id': self.id,
            'rating': float(self.rating),
            'review': self.review,
            'user_id': self.user_id,
            'restaurant_id': self.restaurant_id,
            'edited':self.edited,
            'user_pp': self.user.profile_picture,
            'user_name': self.user.first_name
        }