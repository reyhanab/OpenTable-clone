from .db import db,  environment, SCHEMA

class Saved(db.Model):
    __tablename__ = 'saved'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="saved")
    restaurant = db.relationship("Restaurant", back_populates="saved")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'restaurant_id': self.restaurant_id,
        }