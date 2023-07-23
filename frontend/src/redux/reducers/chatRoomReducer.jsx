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
    case chatRoomConstants.LOGOUT: {
      return {
        chatRoomsData: [],
        selectedRoomIndex: -1,
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
        if (roomsData[state.selectedRoomIndex].messages)
          addingRoom.messages.push(
            ...roomsData[state.selectedRoomIndex].messages
          );
        roomsData[state.selectedRoomIndex] = addingRoom;
      }

      return {
        ...state,
        chatRoomsData: roomsData,
      };
    }

    case chatRoomConstants.ADD_MESSAGE: {
      const roomIndex = state.chatRoomsData.findIndex(
        (room) => room._id === action.payload.roomId
      );
      if (roomIndex !== -1) {
        state.chatRoomsData[roomIndex].lastMessage = action.payload.message;
        state.chatRoomsData[roomIndex].messages.push(action.payload.message);
      }
      return {
        ...state,
      };
    }
    case chatRoomConstants.MARK_READ: {
      const roomIndex = state.chatRoomsData.findIndex(
        (room) => room._id === action.payload.roomId
      );
      state.chatRoomsData[roomIndex].messages.forEach((msg) => {
        if (!msg.read.includes(action.payload.readerId)) {
          msg.read.push(action.payload.readerId);
        }
      });
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};
export default chatRoomReducer;
