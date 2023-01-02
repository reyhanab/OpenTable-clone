from .db import db,  environment, SCHEMA, add_prefix_for_prod
from pytz import timezone
from datetime import time, datetime

class Reservation(db.Model):
    __tablename__ = 'reservations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    count = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    user = db.relationship("User", back_populates="reservations")
    restaurant = db.relationship("Restaurant", back_populates="reservations")


    def to_dict(self):
        do = datetime.combine(self.date, time.min)
        est_time = do.astimezone(timezone("EST"))
        print("dateeee", est_time)

        return {
            'id': self.id,
            'count': self.count,
            'date': est_time,
            'time': str(self.time),
            'user_id': self.user_id,
            'restaurant_id': self.restaurant_id,
        }