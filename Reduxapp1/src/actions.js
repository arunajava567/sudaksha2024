export const GET_USERS = "GET_USERS";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";


//defining 2 actions 
export const getUsers = () => {
  return {
    type: GET_USERS
  };
};

export const getUsersSuccess = users => {
  return {
    type: GET_USERS_SUCCESS,
    users
  };
};
