import axiosInstance from './api';

export const login = (user) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/admin/auth/login`, user)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
