import { decryptToken } from "./decryptToken";

const fetchAPI = (url, method, data = {}) => {
  const encryptAccessToken = localStorage.getItem("access_token");
  const access_token = decryptToken(encryptAccessToken);
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
      charset: "UTF-8",
    },
    // body: JSON.stringify(data),
    ...(method.toUpperCase() === "GET" || method.toUpperCase() === "DELETE"
      ? {}
      : { body: JSON.stringify(data) }),
  });
};
export default fetchAPI;
