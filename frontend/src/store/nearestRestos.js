const LOAD_ALL_NEAR_RESTAURANTS = "restaurants/LOAD_ALL_NEAR_RESTAURANTS";


const loadAllRestaurant = (restaurants) => ({
    type: LOAD_ALL_NEAR_RESTAURANTS,
    restaurants
})


export const getAllRestaurantsLimited = (page) => async (dispatch) =>{

    const response = await fetch(`/api/restaurants/page?page=${page}`);
    const data = await response.json();

    const payload = {};

    for (let obj of data.Restaurants) {
    payload[obj.id] = obj;
    }

    dispatch(loadAllRestaurant(payload));
    return data;
}

const nearestRestaurantsReducer = (state = {}, action) => {
    switch(action.type){
        case LOAD_ALL_NEAR_RESTAURANTS:
            return { ...action.restaurants }
        default:
            return state;
    }
}

export default nearestRestaurantsReducer;