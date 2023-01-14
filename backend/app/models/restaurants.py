from .db import db,  environment, SCHEMA
from geoalchemy2 import Geometry


class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.Text, nullable=False)
    type = db.Column(db.String(40), nullable=False)
    phone_number = db.Column(db.String)
    city = db.Column(db.String(40), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.DECIMAL)
    capacity = db.Column(db.Integer, nullable=False)
    lat = db.Column(db.DECIMAL)
    lng = db.Column(db.DECIMAL)
    preview_image = db.Column(db.String)
    loc = db.Column(Geometry(geometry_type='POINT'))

    menus = db.relationship("Menu", back_populates = "restaurant")

    reservations = db.relationship("Reservation", back_populates="restaurant",
         cascade="all, delete-orphan")

    reviews = db.relationship("Review", back_populates="restaurant",
         cascade="all, delete-orphan")

    images = db.relationship("Image", back_populates="restaurant",
         cascade="all, delete-orphan")

    saved = db.relationship("Saved", back_populates="restaurant",
         cascade="all, delete-orphan")


    def to_dict(self):
     #    print("loooooooooooooc",str(self.loc))
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'lat': float(self.lat),
            'lng': float(self.lng),
            'phone_number': self.phone_number,
            'description': self.description,
            'city': self.city,
            'capacity':self.capacity,
            'address': self.address,
            'rating': float(self.rating),
            'preview_image': self.preview_image,
            'num_of_reviews': len(self.reviews),

        }
