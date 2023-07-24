import * as Constants from "../constant/Constant";
import CryptoJS from "crypto-js";
export const encryptToken = (token) => {
  try {
    const encryptedToken = CryptoJS.AES.encrypt(
      token,
      Constants.TOKEN_PRIVATE_KEY
    ).toString();
    return encryptedToken;
  } catch (error) {
    console.error("Error encrypting token:", error);
    return null;
  }
};
