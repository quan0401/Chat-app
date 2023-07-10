import axiosInstance from "../setup/axios";

export const loginUser = async (acc, password) => {
  return await axiosInstance.post("/api/user/login", {
    email: acc,
    name: acc,
    password,
  });
};
export const registerUser = async (username, email, password) => {
  return await axiosInstance.post("api/user/register", {
    name: username,
    email,
    password,
  });
};

export const testUser = async () => {
  return await axiosInstance.get("/api/user/test");
};
