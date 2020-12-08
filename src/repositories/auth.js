import axios from "axios";
import { API } from "../configs/api";

export const login = (user) => {
  return axios.post(`${API}/user/auth/login`, user);
};

export const signinWithGoogle = (tokenId) => {
  return axios.post(`${API}/user/auth/signin/google`, { tokenId });
};
export const signinWithFacebook = (userID, name, email, accessToken) => {
  return axios.post(`${API}user/auth/signin/facebook`, {
    userID,
    name,
    email,
    accessToken,
  });
};