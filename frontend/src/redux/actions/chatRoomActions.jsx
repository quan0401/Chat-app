import * as chatRoomConstants from "../constants/chatRoomConstants";
export const setChatRoom = (chatRoomsData) => (dispatch, getState) => {
  dispatch({
    payload: chatRoomsData,
    type: chatRoomConstants.SET_CHATROOM,
  });
};

export const selectRoomAction = (roomIndex) => (dispatch) => {
  dispatch({
    type: chatRoomConstants.SELECT_ROOM,
    payload: roomIndex,
  });
};
export const addChatRoom = (room) => (dispatch) => {
  dispatch({
    type: chatRoomConstants.ADD_ROOM,
    payload: room,
  });
};
export const addMessageAction = (message) => (dispatch) => {
  dispatch({
    type: chatRoomConstants.ADD_MESSAGE,
    payload: message,
  });
};
