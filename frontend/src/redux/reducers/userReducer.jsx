import * as userConstants from "../constants/userConstants";
const userData = JSON.parse(sessionStorage.getItem("userData"))
  ? JSON.parse(sessionStorage.getItem("userData"))
  : JSON.parse(localStorage.getItem("userData"));

const initialState = {
  userData: userData ? userData : { name: "unknown" },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case userConstants.LOGOUT: {
      return {
        name: "unknown",
      };
    }
    default: {
      return state;
    }
  }
};
export default userReducer;
