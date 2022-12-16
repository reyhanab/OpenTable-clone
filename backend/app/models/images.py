from .db import db,  environment, SCHEMA

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"), nullable=False)
    url = db.Column(db.String, nullable = False)

    restaurant = db.relationship("Restaurant", back_populates="images")

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'restaurant_id': self.restaurant_id,
        }