from flask import Blueprint, request, redirect, url_for, jsonify
from app.models import  Reservation,Restaurant, db
from flask_login import current_user, login_required
from app.forms import  ReservationForm
import datetime
from sqlalchemy import func
from .auth_routes import validation_errors_to_error_messages


reservation_routes = Blueprint("reservations", __name__)


#Edit a reservation
@reservation_routes.route('/<int:reservation_id>', methods=['PUT'])
@login_required
def edit_reservation(reservation_id):

    reservation = Reservation.query.get_or_404(reservation_id)

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

    restaurant = Restaurant.query.get_or_404(reservation.restaurant_id)
    if reserved is None or len(reserved) == 0: valid_reserveation = True
    else: valid_reserveation = count + reserved[1] <= restaurant.capacity

    if form.validate_on_submit():
        if reservation.user_id == current_user.id:
            if valid_reserveation:
                reservation.count = count
                reservation.date = date
                reservation.time = time
                db.session.add(reservation)
                db.session.commit()
                return reservation.to_dict()
            return {"message": "No capacity at this time"}
        return redirect(url_for("auth.unauthorized"))
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Delete a reservation
@reservation_routes.route('/<int:reservation_id>', methods=['DELETE'])
@login_required
def delete_reservation(reservation_id):

    reservation = Reservation.query.get_or_404(reservation_id)

    if reservation.user_id == current_user.id:
        db.session.delete(reservation)
        db.session.commit()
        return jsonify({"message":"Successfully deleted"})
    return redirect(url_for("auth.unauthorized"))