// constants
const LOAD_USER_DETAILS = "users/LOAD_USER_DETAILS";
const LOAD_USERS = "users/LOAD_USERS"

const loadUserDetails = (user) => ({
    type: LOAD_USER_DETAILS,
    user,
});

const loadUsers = (users) =>({
  type: LOAD_USERS,
  users
});

export const loadAllUsers = () => async (dispatch) => {
  const response = await fetch("/api/users/");
  const data = await response.json();

  const payload = {};

    for (let obj of data.Users) {
      payload[obj.id] = obj;
    }
    dispatch(loadUsers(payload));
    return data
}

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
      case LOAD_USERS:
        return { ...action.users }
      default:
        return state;
    }
};

export default usersReducer;