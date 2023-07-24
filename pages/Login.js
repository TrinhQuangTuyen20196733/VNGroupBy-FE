import { decryptToken } from "@/utils/decryptToken";
import { encryptToken } from "@/utils/encryptToken";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignin = async () => {
    const loginReq = {
      email,
      password,
    };
    console.log(loginReq);
    try {
      const response = await fetch("http://localhost:8080/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginReq),
      });
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const accessToken = jsonResponse.access_token;
      const refreshToken = jsonResponse.refresh_token;
      const encryptAccessToken = encryptToken(accessToken);
      localStorage.setItem("access_token", encryptAccessToken);
      const encryptRefreshToken = encryptToken(refreshToken);
      localStorage.setItem("refresh_token", encryptRefreshToken);
      router.push({
        pathname: "/Home",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            Welcom VNGroupBY! Please enter your details
          </span>
          <div className="py-4">
            <span className="mb-2 text-md">Email</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div className="flex justify-between w-full py-4">
            <div className="mr-24">
              <input type="checkbox" name="ch" id="ch" className="mr-2" />
              <span className="text-md">Remember for 30 days</span>
            </div>
            <span className="font-bold text-md">Forgot password</span>
          </div>
          <button
            className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
            onClick={handleSignin}
          >
            Sign in
          </button>
          <a href="http://localhost:8080/OAuth2/authentication">
            <button
              className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
              // onClick={handleOAuth2Signin}
            >
              <img
                src="/icons/google.svg"
                alt="img"
                className="w-6 h-6 inline mr-2"
              />
              Sign in with Google
            </button>
          </a>
          <div className="text-center text-gray-400">
            Do not have an account?
            <span className="font-bold text-black">Sign up for free</span>
          </div>
        </div>
        <div className="relative">
          <img
            src="/images/login.jpg"
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  );
}
