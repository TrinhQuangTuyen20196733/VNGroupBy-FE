import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faCartShopping, faHouse } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";
import Button from "./Button";
import { useState, useEffect } from "react";
import { Badge } from "antd";
import fetchAPI from "@/utils/fetchAPI";
export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    fetchAPI(`http://localhost:8080/shopping_cart/count`, "GET")
      .then((response) => {
        // Truy cập trực tiếp vào giá trị int của response
        return response.text();
      })
      .then((data) => {
        const count = parseInt(data); // Parse giá trị thành kiểu int (nếu cần)
        setCartCount(count); // In ra giá trị
        // Bạn có thể làm bất kỳ điều gì với giá trị count ở đây
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="bg-primary-color  h-28 w-screen pl-20 flex justify-items-center items-center ">
      <div className="flex justify-items-center items-center gap-32 mx-auto max-w-screen-xl ">
        <div className="flex justify-items-center items-center">
          <Link href="/Home">
            <FontAwesomeIcon icon={faHouse} className="text-white w-8 h-8" />
          </Link>
          <span className="text-white text-lg ml-4 font-semibold">
            VNGroupBy
          </span>
        </div>

        <SearchBar width="800px" />
        <div className="flex justify-items-center items-center gap-8">
          <Link href="/CartInfor">
            <Badge count={cartCount} color="blue">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="text-white w-8 h-8"
              />
            </Badge>
          </Link>
          <Link href="/Login" className="">
            <Button
              text
              width="100px"
              height="40px"
              fontSize="1rem"
              fontWeight="500"
              borderRadius="10px"
              color="#0366fc"
              hover
              backgroundColor="white"
            >
              Login
            </Button>
          </Link>
          <Link href="/Signup">
            <Button
              text
              width="100px"
              height="40px"
              fontSize="1rem"
              fontWeight="500"
              borderRadius="10px"
              color="#0366fc"
              hover
              backgroundColor="white"
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
