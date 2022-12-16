from flask import Blueprint, request
from app.models import Restaurant, Menu, Review, db
from flask_login import current_user, login_required
from app.forms import ReviewForm
from .auth_routes import validation_errors_to_error_messages


restaurant_routes = Blueprint('restaurants', __name__)

# Get restaurants
@restaurant_routes.route('/', methods=['GET'])
def load_restaurants():

    restaurants = Restaurant.query.all()
    return {"Restaurants":[restaurant.to_dict()
                           for restaurant in restaurants]}


#Get restaurant menus
@restaurant_routes.route('/<int:restaurant_id>/menus', methods=['GET'])
def load_menus(restaurant_id):

    menus = Menu.query.filter(Menu.restaurant_id == restaurant_id).all()
    menuObj = [{**menu.to_dict(), "Menu_item": menu.menu_item.to_dict()} for menu in menus]
    return {"Menus":[menu for menu in menuObj]}


#Get restaurant menu_items based on type
@restaurant_routes.route('/<int:restaurant_id>/menus/<type>', methods=['GET'])
def load_menu_type(restaurant_id, type):

    menus = Menu.query.filter(Menu.restaurant_id == restaurant_id, Menu.type == type).all()
    return {"Menus":{"Menu_items": [item.menu_item.to_dict() for item in menus], "Type": type}}


#Get reviews of a restaurant
@restaurant_routes.route('/<int:restaurant_id>/reviews', methods=['GET'])
def load_reviews(restaurant_id):

    reviews = Review.query.filter(Review.restaurant_id == restaurant_id).all()
    return {"Reviews":[review.to_dict()
                           for review in reviews]}


#Post a review on a restaurant
@restaurant_routes.route('/<int:restaurant_id>/reviews', methods=['POST'])
@login_required
def add_review(restaurant_id):

    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        review = Review (
            user_id = current_user.id,
            restaurant_id = restaurant_id,
            review = form.data["review"],
            rating = form.data["rating"]
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401