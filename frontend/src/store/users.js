// constants
const LOAD_USER_DETAILS = "users/LOAD_USER_DETAILS";

const loadUserDetails = (user) => ({
    type: LOAD_USER_DETAILS,
    user,
});

export const loadUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`);
    const user = await res.json();

    if (res.ok) {
      dispatch(loadUserDetails(user));
      return user;
    }
};

const usersReducer = (state = {}, action) => {
    switch (action.type) {
      case LOAD_USER_DETAILS:
        return { ...action.user };
      default:
        return state;
    }
};

export default usersReducer;