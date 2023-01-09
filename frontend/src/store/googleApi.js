// const LOAD_URL = "googleApi/LOAD_URL";
// const API_KEY = process.env.API_KEY;

// const loadUrl = (url) =>{
//     return {
//         type: LOAD_URL,
//         url
//     }
// }
// export const getUrl = (restaurant) => async (dispatch) => {
//     const response = await fetch(`https://maps.googleapis.com/maps/api/staticmap?center=
//         ${restaurant?.lat},${restaurant?.lng}&zoom=12&size=300x200&
//         markers=color:red%7Clabel:S%7C11211%7C11206%7C11222&key=${API_KEY}`,
//         {
//         headers: {
//             "Access-Control-Allow-Origin": "*"
//         }
//     })
//     const data = await response.json();
//     if (response.ok) {
//         const url = dispatch(loadUrl(data));
//         return url;
//     }
// }

// const googleApiReducer = (state ={}, action) => {
//     switch(action.type){
//         case LOAD_URL:
//             return { ...action.url }
//         default:
//             return state;
//     }
// }

// export default googleApiReducer;