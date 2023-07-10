import * as userConstants from "../constants/userConstants";

const initialState = {
  name: "Unknown",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default userReducer;
