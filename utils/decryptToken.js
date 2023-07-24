import * as Constants from "../constant/Constant";
import CryptoJS from "crypto-js";
export const decryptToken = (encryptedToken) => {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(
      encryptedToken,
      Constants.TOKEN_PRIVATE_KEY
    );
    const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedToken;
  } catch (error) {
    console.error("Error decrypting token:", error);
    return null;
  }
};
