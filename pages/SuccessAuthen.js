import { useEffect } from "react";
import { useRouter } from "next/router";
import * as Constants from "../constant/Constant";
import { encryptToken } from "@/utils/encryptToken";
import React from "react";
import { Button, Result } from "antd";
export default function SuccessAuthen() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const tokenItem = token.split(";**");

    if (token) {
      // Lưu token vào Local Storage
      localStorage.setItem("token", token);
      localStorage.setItem("access_token", encryptToken(tokenItem[0]));
      localStorage.setItem("refresh_token", encryptToken(tokenItem[1]));

      window.location.href = "http://localhost:3000";
    }
  }, []);
  return (
    <Result
      status="success"
      title="Sign in successfully!"
      subTitle="We are redirecting you to the homepage, please wait."
    />
  );
}
