import { logoutUser } from "../../services/userServices";

import * as userConstants from "../constants/userConstants";
export const userLoginAction = (userData) => (dispatch, getState) => {
  dispatch({
    payload: userData,
    type: userConstants.LOGIN,
  });
};

export const userLogoutAction = () => async (dispatch) => {
  localStorage.removeItem("userData");
  sessionStorage.removeItem("userData");

  localStorage.removeItem("chatRooms");
  sessionStorage.removeItem("chatRooms");
  logoutUser().then((res) => {});
  dispatch({
    type: userConstants.LOGOUT,
  });
};

export const setSocket = (socket) => (dispatch) => {
  dispatch({
    type: userConstants.SET_SOCKET,
    payload: socket,
  });
};
