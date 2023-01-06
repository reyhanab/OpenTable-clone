const ADD_RESERVATION = "reservations/ADD_RESERVATION";
const LOAD_RESERVATIONS = "reservations/LOAD_RESERVATIONS";
const EDIT_RESERVATION = "reservations/EDIT_RESERVATION";
const DELETE_RESERVATION = "reservations/DELETE_RESERVATION";

const addReservation = (reservation) => {
    return {
        type: ADD_RESERVATION,
        reservation
    }
}
const getReservations = (reservations) => {
    return {
        type: LOAD_RESERVATIONS,
        reservations
    }
}
const updateReservation = (reservation) => {
    return {
        type: EDIT_RESERVATION,
        reservation
    }
}
const deleteReservation = (reservation_id) => {
    return {
        type: DELETE_RESERVATION,
        reservation_id
    }
}

export const createReservation= (reservation, restaurant_id) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${restaurant_id}/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservation),
    });
    const newReservation = await response.json();
    if (response.ok) {
      dispatch(addReservation(newReservation));
      return newReservation;
    }
};

export const loadReservations = (restaurant_id) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${restaurant_id}/reservations`);
    const data = await response.json();

    const payload = {};

    for (let obj of data.Reservations) {
      payload[obj.id] = obj;
    }
    dispatch(getReservations(payload));
};

export const loadAllReservations = (restaurant_ids) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/reservations`,{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(restaurant_ids),
    }
    );

    const data = await response.json();
    const payload = {};
    console.log("dataaaaaaa",data)
    for (let obj of data.Reservations) {
      payload[obj.id] = obj;
    }
    dispatch(getReservations(payload));
};

export const editReservation = (reservation, reservation_id) => async (dispatch) => {
    const response = await fetch(`/api/reservations/${reservation_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservation),
    });
    const editedReservation = await response.json();
    if (response.ok) {
      dispatch(updateReservation(editedReservation));
      return editedReservation;
    }
};

export const deleteReservationthunk = (reservation_id) => async (dispatch) => {
    const response = await fetch(`/api/reservations/${reservation_id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(deleteReservation(reservation_id));
      return null;
    }
  };

const reservationReducer = (state = {}, action) => {
    let newState = { ...state }
    switch (action.type){
        case ADD_RESERVATION:
            return { ...state, [action.reservation.id]: action.reservation }
        case LOAD_RESERVATIONS:
            return {  ...state, ...action.reservations  }
        case EDIT_RESERVATION:
            return { ...state, [action.reservation.id]: action.reservation }
        case DELETE_RESERVATION:
            delete newState[action.reservation_id]
            return newState;
        default:
            return state;
    }
};

export default reservationReducer;