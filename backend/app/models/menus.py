from .db import db,  environment, SCHEMA, add_prefix_for_prod

class Menu(db.Model):
    __tablename__ = 'menus'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id")), nullable=False)
    menu_item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("menu_items.id")), nullable=False)

    restaurant = db.relationship("Restaurant", back_populates="menus")
    menu_item = db.relationship("Menu_item", back_populates="menus")


    def to_dict(self):
        return {
            "id": self.id,
            "restaurant_id":self.restaurant_id,
            "type":self.type
        }