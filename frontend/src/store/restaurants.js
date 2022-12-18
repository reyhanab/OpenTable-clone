const LOAD_ALL_RESTAURANTS = "restaurants/LOAD_ALL_RESTAURANTS";
const LOAD_RESTAURANT_DETAILS = "restaurants/LOAD_RESTAURANT_DETAILS"


const loadAllRestaurant = (restaurants) => ({
    type: LOAD_ALL_RESTAURANTS,
    restaurants
})

const loadRestDetails = (restaurant) => ({
    type: LOAD_RESTAURANT_DETAILS,
    restaurant
})

export const getAllRestaurants = () => async (dispatch) =>{

    const response = await fetch('/api/restaurants');
    const data = await response.json();

    const payload = {};

    for (let obj of data.Restaurants) {
    payload[obj.id] = obj;
    }

    dispatch(loadAllRestaurant(payload));
}

export const getRestDetails = (restId) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${restId}`);
    const data = await response.json();

    if (response.ok) {
      dispatch(loadRestDetails(data));
      return data;
    }
};


const restaurantsReducer = (state = {}, action) => {
    switch(action.type){
        case LOAD_ALL_RESTAURANTS:
            return { ...action.restaurants }
        case LOAD_RESTAURANT_DETAILS:
            return {
                ...state,
                [action.restaurant.id]: { ...state[action.restaurant.id], ...action.restaurant },
            }
    }
}

export default restaurantsReducer;