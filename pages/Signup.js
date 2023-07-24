import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SignUp() {
  // Initial State Value
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDay, setBirthDay] = useState();
  const [gender, setGender] = useState("Male");
  const [role, setRole] = useState("CUSTOMER");
  const router = useRouter();

  // Define Function
  const handleSubmit = async () => {
    const userInfor = {
      name,
      phoneNumber,
      birthDay,
      address,
      email,
      password,
      role,
      gender,
    };
    console.log(userInfor);
    try {
      const response = await fetch(
        "http://localhost:8080/register/generateOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfor),
        }
      );
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      if (jsonResponse.code == 200) {
        const emailObt = {
          email,
        };
        router.push(
          {
            pathname: "/VerifyOTP",
            query: emailObt,
          },
          "/VerifyOTP"
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-[#7bd4e8] bg-cover w-screen h-screen flex items-center justify-center">
      <div className="bg-[#ebe8da]  mx-auto my-auto w-[45%] h-[85%] flex flex-col items-center rounded-2xl gap-4 pb-4">
        <div className="w-20 h-20 bg-[#edda5c] flex items-center justify-center rounded-full mt-4">
          <FontAwesomeIcon
            icon={faCartShopping}
            className=" w-12 h-12 text-[#d19c0a] rounded-full "
          />
        </div>
        <span className="text-xl font-semibold mb-4">Sign Up</span>

        <Input
          type="text"
          placehoder="Enter your name"
          isPrimary
          width="55%"
          height="40px"
          marginBottom="10px"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          type="email"
          placehoder="Enter your email"
          isPrimary
          width="55%"
          height="40px"
          marginBottom="10px"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          type="password"
          placehoder="Enter your password"
          isPrimary
          width="55%"
          height="40px"
          marginBottom="10px"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Input
          placehoder="Enter your address"
          isPrimary
          width="55%"
          height="40px"
          marginBottom="10px"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />

        <div className="w-[55%] flex justify-between">
          <Input
            type="tell"
            placehoder="Phone number"
            isPrimary
            width="45%"
            height="40px"
            marginBottom="10px"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <Input
            placehoder="Choose from Calender"
            type="date"
            isPrimary
            width="45%"
            height="40px"
            marginBottom="10px"
            defaultValue={birthDay}
            onChange={(e) => {
              setBirthDay(e.target.value);
            }}
          />
        </div>
        <div className="w-[55%] flex justify-between">
          <select
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
            className="w-[45%] h-10 bg-[#d9d7ce] rounded-2xl border-orange-400 border-2 pl-8"
          >
            <option value="Male">Male</option>
            <option value="FeMale">Female</option>
          </select>
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
            className="w-[45%] h-10 bg-[#d9d7ce] rounded-2xl border-orange-400 border-2 pl-8"
          >
            <option value="CUSTOMER">Customer</option>
            <option value="SELLER">Seller</option>
          </select>
        </div>
        <Button
          text
          hover
          height="40px"
          width="55%"
          className=" bg-[#fc7f03] mt-3 rounded-2xl border-orange-400 border-2 pl-8 text-white font-semibold"
          onClick={handleSubmit}
        >
          Confirm
        </Button>
        <Button
          text
          hover
          height="40px"
          width="20%"
          className=" text-blue font-semibold  border-orange-400  rounded-2xl "
        >
          Back
        </Button>
      </div>
    </div>
  );
}
