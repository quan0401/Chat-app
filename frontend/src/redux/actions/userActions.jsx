import { logoutUser } from "../../services/userServices";
import axiosInstance from "../../setup/axios";
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
  logoutUser().then((res) => {});
  dispatch({
    type: userConstants.LOGOUT,
  });
};
