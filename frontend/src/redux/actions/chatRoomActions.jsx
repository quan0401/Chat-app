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
export const logoutRoomAction = () => (dispatch) => {
  dispatch({
    type: chatRoomConstants.LOGOUT,
    payload: "",
  });
};

export const addChatRoom = (room) => (dispatch) => {
  dispatch({
    type: chatRoomConstants.ADD_ROOM,
    payload: room,
  });
};

export const addMessageAction = (message, roomId) => (dispatch) => {
  dispatch({
    type: chatRoomConstants.ADD_MESSAGE,
    payload: { message, roomId },
  });
};

export const markAsReadAction = (roomId, readerId) => (dispatch) => {
  dispatch({
    type: chatRoomConstants.MARK_READ,
    payload: {
      roomId,
      readerId,
    },
  });
};
