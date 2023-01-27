const LOAD_ALL_NEAR_RESTAURANTS = "restaurants/LOAD_ALL_NEAR_RESTAURANTS";


const loadAllRestaurant = (restaurants) => ({
    type: LOAD_ALL_NEAR_RESTAURANTS,
    restaurants
})


export const getAllRestaurantsLimited = (page) => async (dispatch) =>{

    const ipData = await fetch("https://geolocation-db.com/json/")
    const ipJson = await ipData.json()
    const ip = ipJson["IPv4"]
    const response = await fetch(`/api/restaurants/page?page=${page}&ip=${ip}`);
    const data = await response.json();

    dispatch(loadAllRestaurant(data.Restaurants));
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