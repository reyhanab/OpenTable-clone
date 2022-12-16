from .db import db,  environment, SCHEMA

class Menu_item(db.Model):
    __tablename__ = 'menu_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text(1000), nullable=False)
    price = db.Column(db.DECIMAL)

    menus = db.relationship("Menu", back_populates = "menu_item")


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': float(self.price)
            # 'restaurant_id': self.restaurant_id,
        }