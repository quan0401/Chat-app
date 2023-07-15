import axiosInstance from "../setup/axios";

export const getChatRoomById = async (roomId) => {
  return await axiosInstance.get("api/chatRoom/" + roomId);
};
