import axiosInstance from "../setup/axios";

export const loginUser = async (acc, password, doNotLogout) => {
  return await axiosInstance.post("/api/user/login", {
    email: acc,
    name: acc,
    password,
    doNotLogout,
  });
};
export const registerUser = async (username, email, password) => {
  return await axiosInstance.post("api/user/register", {
    name: username,
    email,
    password,
  });
};
export const logoutUser = async () => {
  return await axiosInstance.get("api/logout");
};

export const testUser = async () => {
  return await axiosInstance.get("/api/user/test");
};
export const userSendMessage = async (userId, content, roomId) => {
  return await axiosInstance.post("/api/message", { userId, content, roomId });
};

export const getUserAndChatRoomData = async () => {
  return await axiosInstance.get("/api/user");
};
