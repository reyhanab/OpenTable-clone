from flask import Blueprint, request, redirect, url_for, jsonify
from app.models import Review, db, Restaurant
from app.forms import ReviewForm
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint("reviews", __name__)

#Edit a review
@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def edit_review(review_id):

    review = Review.query.get_or_404(review_id)
    restaurant = Restaurant.query.get_or_404(review.restaurant_id)
    totalRating = 0

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if review.user_id == current_user.id:
            review.review = form.data["review"]
            review.rating = form.data["rating"]
            review.edited = True
            db.session.commit()
            reviewsRatings = [review.rating for review in restaurant.reviews]
            for rating in reviewsRatings:
                totalRating += rating
            restaurant.rating = totalRating / (len(reviewsRatings))
            db.session.commit()
            return review.to_dict()
        return redirect(url_for("auth.unauthorized"))
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Delete a review
@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):

    review = Review.query.get_or_404(review_id)

    if review.user_id == current_user.id:
        db.session.delete(review)
        db.session.commit()
        return jsonify({"message":"Successfully deleted"})
    return redirect(url_for("auth.unauthorized"))