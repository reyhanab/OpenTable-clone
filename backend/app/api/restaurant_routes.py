from flask import Blueprint, request
from app.models import Restaurant, Menu, Review, Reservation,Image, db
from flask_login import current_user, login_required
from app.forms import ReviewForm, ReservationForm
import datetime
from sqlalchemy import func, distinct, desc
from .auth_routes import validation_errors_to_error_messages
import requests
import os

restaurant_routes = Blueprint('restaurants', __name__)

# Get restaurants
@restaurant_routes.route('/', methods=['GET'])
def load_restaurants():

    restaurants = Restaurant.query.distinct(Restaurant.name, Restaurant.id).order_by(desc(Restaurant.id)).all()
    return {"Restaurants":[restaurant.to_dict()
                           for restaurant in restaurants]}

#Get number of restaurants
@restaurant_routes.route('/quantity', methods=['GET'])
def load_number_of_restaurants():

    # restaurants_count = Restaurant.query(func.count(distinct(Restaurant.name))).all()
    restaurants_count = db.session.query(Restaurant).distinct(Restaurant.name).count()
    return {"count":restaurants_count}


# Get restaurants by page
# /api/restaurants/page?page=0&page_size=5
# @restaurant_routes.route('/page', methods=['GET'])
# def load_restaurants_by_page():

#     page = request.args.get('page', default=0, type=int)
#     page_size = request.args.get('page_size', default=5, type=int)

#     restaurants = Restaurant.query.distinct(Restaurant.name).limit(page_size).offset(page * page_size)
#     return {"Restaurants":[restaurant.to_dict()
#                            for restaurant in restaurants]}

#Get details of a restaurant
@restaurant_routes.route('/<int:restaurant_id>', methods = ['GET'])
def load_details(restaurant_id):

    restaurant = Restaurant.query.get_or_404(restaurant_id)
    return restaurant.to_dict()


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

    restaurant = Restaurant.query.get_or_404(restaurant_id)
    totalRating = 0

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
        reviewsRatings = [review.rating for review in restaurant.reviews]
        for rating in reviewsRatings:
            totalRating += rating
        restaurant.rating = totalRating / (len(reviewsRatings))
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
    offset = form.data["offset"]
    hour = time.strftime("%H")
    start_hour = datetime.time(int(hour), 0)
    end_hour = datetime.time(int(hour), 59)


    reserved = db.session.query(Reservation.date, func.sum(Reservation.count))\
        .filter(Reservation.time <= end_hour)\
        .filter(Reservation.time >= start_hour)\
        .filter(Reservation.date == date)\
        .filter(Reservation.restaurant_id == restaurant_id)\
        .group_by(Reservation.date).first()

    restaurant = Restaurant.query.get_or_404(restaurant_id)
    user_has_reservations = Reservation.query.filter(Reservation.restaurant_id == restaurant_id,
                                                    Reservation.user_id == current_user.id,
                                                    Reservation.date == date).first()
    user_has_reservation_same_time = Reservation.query.filter(
                                                    Reservation.user_id == current_user.id,
                                                    Reservation.date == date,
                                                    Reservation.time <= end_hour,
                                                    Reservation.time >= start_hour).first()


    if (reserved is None or len(reserved) == 0) and count <= restaurant.capacity : valid_reserveation = True
    else: valid_reserveation = count + reserved[1] <= restaurant.capacity

    today = date.today()
    now = datetime.datetime.now()

    valid_time = True
    if(date == today):
        if (now.hour-offset) == time.hour:
            if now.minute > time.minute:
                valid_time = False
        elif (now.hour-offset) > time.hour:
            valid_time = False

    if form.validate_on_submit():
        if valid_reserveation:
            if not user_has_reservations:
                if not user_has_reservation_same_time:
                    if valid_time:
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
                    return {"errors": "Reserve time has passed, Sorry!"}, 404
                return {"errors": "Reservation have already been made on this time!"}, 404
            return {"errors": "Reservation have already been made on this Restaurant!"}, 404
        return {"errors": "Not enough capacity at this time"}, 404
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Get all reservations of a restaurant
@restaurant_routes.route('/<int:restaurant_id>/reservations', methods=['GET'])
@login_required
def get_reservations(restaurant_id):

    reservations = Reservation.query.filter(Reservation.restaurant_id == restaurant_id).all()
    test = [reservation.to_dict()
                           for reservation in reservations]
    return {"Reservations":[reservation.to_dict()
                           for reservation in reservations]}


#Get all reservations of all restaurants
@restaurant_routes.route('/reservations', methods=['POST'])
def get_all_reservations():

    restaurant_ids = request.json
    reservations = Reservation.query.filter(Reservation.restaurant_id.in_(restaurant_ids)).all()
    return {"Reservations":[reservation.to_dict()
                        for reservation in reservations]}


#Get all images of a restaurant
@restaurant_routes.route('/<int:restaurant_id>/images', methods=['GET'])
def get_images(restaurant_id):

    images = Image.query.filter(Image.restaurant_id == restaurant_id).all()
    return {"Images":[image.to_dict()
                           for image in images]}


@restaurant_routes.route('/page', methods=['GET'])
def get_restos():

    ip = request.args.get('ip')
    key = os.environ.get('IP_API_KEY')
    response = requests.get(f'http://api.ipapi.com/api/{ip}?access_key={key}')
    data = response.json()


    page = request.args.get('page', default=0, type=int)
    page_size = request.args.get('page_size', default=5, type=int)


    restaurants = db.session.query(Restaurant).distinct(func.ST_DISTANCE\
    (Restaurant.loc, func.ST_MakePoint(data['latitude'], data['longitude'])), Restaurant.name).order_by(func.ST_DISTANCE\
    (Restaurant.loc, func.ST_MakePoint(data['latitude'], data['longitude']))).limit(page_size).offset(page * page_size)


    return {"Restaurants":[restaurant.to_dict()
                           for restaurant in restaurants]}
