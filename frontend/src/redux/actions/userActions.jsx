import * as userConstants from "../constants/userConstants";
export const userLoginAction = (userData) => (dispatch, getState) => {
  dispatch({
    payload: userData,
    type: userConstants.LOGIN,
  });
};
