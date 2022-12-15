from .db import db,  environment, SCHEMA

class User(db.Model):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    type = db.Column(db.String(40), nullable=False)
    description = db.Column(db.Text(40), nullable=False)
    phone_number = db.Column(db.String(10))
    city = db.Column(db.string(40), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Decimal)
    capacity = db.Column(db.Integer, nullable=False)
    lat = db.Column(db.Decimal)
    lng = db.Column(db.Decimal)
    preview_image = db.Column(db.String)


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'description': self.description,
            'city': self.city,
            'address': self.address,
            'rating': self.rating,
            'preview_image': self.preview_image
        }