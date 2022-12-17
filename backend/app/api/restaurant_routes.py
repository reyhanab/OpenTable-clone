from flask import Blueprint, request
from app.models import Restaurant, Menu, Review, Reservation,Image, db
from flask_login import current_user, login_required
from app.forms import ReviewForm, ReservationForm
import datetime
from sqlalchemy import func
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


#Create a reservation for a restaurant
@restaurant_routes.route('/<int:restaurant_id>/reservations', methods=['POST'])
@login_required
def add_reservation(restaurant_id):

    form = ReservationForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    count = form.data["count"]
    date = form.data["date"]
    time = form.data["time"]
    hour = time.strftime("%H")
    start_hour = datetime.time(int(hour), 0)
    end_hour = datetime.time(int(hour), 59)

    reserved = db.session.query(Reservation, func.sum(Reservation.count))\
        .filter(Reservation.time <= end_hour).filter(Reservation.time >= start_hour)\
        .group_by(Reservation.date).first()

    restaurant = Restaurant.query.get_or_404(restaurant_id)
    if reserved is None or len(reserved) == 0: valid_reserveation = True
    else: valid_reserveation = count + reserved[1] <= restaurant.capacity

    if form.validate_on_submit():
        if valid_reserveation:
            reservation = Reservation(
                user_id = current_user.id,
                restaurant_id = restaurant_id,
                count = count,
                date = date,
                time = time
            )
            db.session.add(reservation)
            db.session.commit()
            return reservation.to_dict()
        return {"message": "No capacity at this time"}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Get all reservations of a restaurant
@restaurant_routes.route('/<int:restaurant_id>/reservations', methods=['GET'])
@login_required
def get_reservations(restaurant_id):

    reservations = Reservation.query.filter(Reservation.restaurant_id == restaurant_id).all()
    return {"Reservations":[reservation.to_dict()
                           for reservation in reservations]}


#Get all images of a restaurant
@restaurant_routes.route('/<int:restaurant_id>/images', methods=['GET'])
def get_images(restaurant_id):

    images = Image.query.filter(Image.restaurant_id == restaurant_id).all()
    return {"Images":[image.to_dict()
                           for image in images]}