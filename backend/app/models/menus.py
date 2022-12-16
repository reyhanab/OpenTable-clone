from .db import db,  environment, SCHEMA

class Menu(db.Model):
    __tablename__ = 'menus'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"), nullable=False)
    menu_items_id = db.Column(db.Integer, db.ForeignKey("menu_items.id"), nullable=False)

    restaurant = db.relationship("Restaurant", back_populates="menus",
         cascade="all, delete-orphan")
    menu_item = db.relationship("Menu_item", back_populates="menus",
         cascade="all, delete-orphan")