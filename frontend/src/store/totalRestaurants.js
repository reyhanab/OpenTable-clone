const LOAD_TOTAL_RESTAURANTS = "restaurants/LOAD_TOTAL_RESTAURANTS";


const loadTotalRestaurant = (total) => ({
    type: LOAD_TOTAL_RESTAURANTS,
    total
})

export const getTotalRestaurants = () => async (dispatch) =>{
    const response = await fetch('/api/restaurants/quantity')
    const data = await response.json();
    dispatch(loadTotalRestaurant(data))
    return data
}

const totalRestaurantReducer = (state={}, action) =>{
    switch(action.type){
        case LOAD_TOTAL_RESTAURANTS:
            return {...action.total}
        default:
            return state;
    }
}
export default totalRestaurantReducer;