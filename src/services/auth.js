import axios from "axios";
import { API } from "../configs/api";

export const login = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API}/admin/auth/login`, user)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

// export const signinWithGoogle = (tokenId) => {
//   return axios.post(`${API}/admin/auth/signin/google`, { tokenId });
// };
// export const signinWithFacebook = (userID, name, email, accessToken) => {
//   return axios.post(`${API}/admin/auth/signin/facebook`, {
//     userID,
//     name,
//     email,
//     accessToken,
//   });
// };
