import * as chatRoomConstants from "../constants/chatRoomConstants";
export const setChatRoom = (chatRoomsData) => (dispatch, getState) => {
  dispatch({
    payload: chatRoomsData,
    type: chatRoomConstants.SET_CHATROOM,
  });
};
