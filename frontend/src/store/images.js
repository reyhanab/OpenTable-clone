const LOAD_IMAGES = 'images/LOAD_IMAGES';

const getImages = (images) => ({
    type: LOAD_IMAGES,
    images
});

export const loadImages = (restaurant_id) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${restaurant_id}/images`)
    const data = await response.json();

    const payload = {};

    for (let obj of data.Images) {
    payload[obj.id] = obj;
    }

    dispatch(getImages(payload));
    return data;
}

const imagesReducer = (state = {}, action) => {
    switch(action.type){
        case LOAD_IMAGES:
            return { ...action.images }
        default:
            return state;
    }
}

export default imagesReducer;