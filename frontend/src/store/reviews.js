const ADD_REVIEW = "reviews/ADD_REVIEW";
const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
const EDIT_REVIEW = "reviews/EDIT_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";


const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}
const getReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}
const updateReview = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    }
}
const deleteReview = (review_id) => {
    return {
        type: DELETE_REVIEW,
        review_id
    }
}

export const createReview = (review, restaurant_id) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${restaurant_id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    if (response.ok) {
      const newReview = await response.json();
      dispatch(addReview(newReview));
      return newReview;
    }
    else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
        return data;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
};

export const loadReviews = (restaurant_id) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${restaurant_id}/reviews`);
    const data = await response.json();

    const payload = {};

    for (let obj of data.Reviews) {
      payload[obj.id] = obj;
    }
    dispatch(getReviews(payload));
};

export const editReview = (review, review_id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${review_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    if (response.ok) {
      const editedReview = await response.json();
      dispatch(updateReview(editedReview));
      return editedReview;
    }
    else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
        return data;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
};

export const deleteReviewThunk = (review_id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${review_id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(deleteReview(review_id));
      return null;
    }
  };


const reviewReducer = (state = {}, action) => {
    let newState = { ...state }
    switch (action.type){
        case ADD_REVIEW:
            return { ...state, [action.review.id]: action.review }
        case LOAD_REVIEWS:
            return { ...action.reviews }
        case EDIT_REVIEW:
            return { ...state, [action.review.id]: action.review }
        case DELETE_REVIEW:
            delete newState[action.review_id]
            return newState;
        default:
            return state;
    }
};

export default reviewReducer;