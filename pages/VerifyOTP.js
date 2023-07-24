import { useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import MessageAlert from "@/components/MessageAlert";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const emailObj = router.query;
  console.log(emailObj);
  console.log(emailObj.email);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Gửi OTP đến server để xác thực
    const verifyObj = {
      email: emailObj.email,
      otpNum: otp,
    };
    try {
      const response = await fetch(
        "http://localhost:8080/register/validateOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(verifyObj),
        }
      );
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      if (jsonResponse.code == 200) {
        setStatus("success");
        setMessage("Đăng kí thành công");
        setTimeout(() => {
          router.push({
            pathname: "/Login",
          });
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#2d5dad]">
      <MessageAlert color="black" status={status}>
        {message}
      </MessageAlert>
      <div className="max-w-md w-full bg-[#d5d9de] p-8 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">OTP Verification</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block mb-2 font-medium">
              OTP Code
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleOtpChange}
              className="w-full border-gray-300 border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter OTP code"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
