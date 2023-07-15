import * as chatRoomConstants from "../constants/chatRoomConstants";
const chatRoomsData = JSON.parse(sessionStorage.getItem("chatRooms"))
  ? JSON.parse(sessionStorage.getItem("chatRooms"))
  : JSON.parse(localStorage.getItem("chatRooms"));

const initialState = {
  chatRoomsData: chatRoomsData ? chatRoomsData : [],
  selectedRoomIndex: -1,
};

const chatRoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case chatRoomConstants.SET_CHATROOM: {
      return {
        ...state,
        chatRoomsData: action.payload,
      };
    }
    case chatRoomConstants.SELECT_ROOM: {
      return {
        ...state,
        selectedRoomIndex: action.payload,
      };
    }
    case chatRoomConstants.ADD_ROOM: {
      const roomsData = state.chatRoomsData;
      const addingRoom = action.payload;

      if (state.selectedRoomIndex !== -1) {
        roomsData[state.selectedRoomIndex] = addingRoom;
      }

      return {
        ...state,
        chatRoomsData: roomsData,
      };
    }
    default: {
      return state;
    }
  }
};
export default chatRoomReducer;
