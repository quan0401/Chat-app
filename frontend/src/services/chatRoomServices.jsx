import axiosInstance from "../setup/axios";

export const getChatRoomById = async (roomId, limit, skip) => {
  return await axiosInstance.get(
    `api/chatRoom/${roomId}?limit=${limit}&skip=${skip}`
  );
};
