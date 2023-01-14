const LOAD_NEAR_RESTAURANTS = "restaurants/LOAD_NEAR_RESTAURANTS";

const loadAllRestaurant = (restaurants) => ({
    type: LOAD_NEAR_RESTAURANTS,
    restaurants
})

export const getNearestRestaurants = () => async (dispatch) =>{

    const response = await fetch('/api/restaurants/nearest');
    const data = await response.json();

    // const payload = {};

    // for (let obj of data.Restaurants) {
    // payload[obj.id] = obj;
    // }

    dispatch(loadAllRestaurant(data.Restaurants));
    return data;
}

const nearRestaurantsReducer = (state = {}, action) => {
    switch(action.type){
        case LOAD_NEAR_RESTAURANTS:
            return { ...action.restaurants }
        default:
                return state;
        }
}

export default nearRestaurantsReducer;