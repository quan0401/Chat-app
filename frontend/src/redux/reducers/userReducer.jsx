import * as userConstants from "../constants/userConstants";
const userData = JSON.parse(sessionStorage.getItem("userData"))
  ? JSON.parse(sessionStorage.getItem("userData"))
  : JSON.parse(localStorage.getItem("userData"));

const initialState = {
  userData: userData ? userData : {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN: {
      return {
        ...state,
        userData: action.payload,
      };
    }
    case userConstants.LOGOUT: {
      return {
        ...{},
      };
    }
    case userConstants.SET_SOCKET: {
      return {
        ...state,
        socket: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
export default userReducer;
