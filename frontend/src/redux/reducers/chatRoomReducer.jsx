import * as chatRoomConstants from "../constants/chatRoomConstants";
const chatRoomsData = JSON.parse(sessionStorage.getItem("chatRooms"))
  ? JSON.parse(sessionStorage.getItem("chatRooms"))
  : JSON.parse(localStorage.getItem("chatRooms"));

const initialState = {
  chatRoomsData: chatRoomsData ? chatRoomsData : [],
};

const chatRoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case chatRoomConstants.SET_CHATROOM: {
      return {
        ...state,
        chatRoomsData: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default chatRoomReducer;
