from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(10))
    city = db.Column(db.String(40))
    address = db.Column(db.String(255))
    profile_picture = db.Column(db.String)

    reservations = db.relationship("Reservation", back_populates="user",
         cascade="all, delete-orphan")

    reviews = db.relationship("Review", back_populates="user",
         cascade="all, delete-orphan")

    saved = db.relationship("Saved", back_populates="user",
         cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'profile_picture': self.profile_picture,
            'city': self.city,
            'address': self.address,
            'phone_number': self.phone_number
        }
