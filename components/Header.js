import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="bg-primary-color  h-28 w-screen pl-20 flex justify-items-center items-center ">
      <div className="flex justify-items-center items-center gap-32 mx-auto max-w-screen-xl ">
        <div className="flex justify-items-center items-center">
          <FontAwesomeIcon icon={faHouse} className="text-white w-8 h-8" />
          <span className="text-white text-lg ml-4 font-semibold">
            VNGroupBy
          </span>
        </div>

        <SearchBar width="800px" />
        <div className="flex justify-items-center items-center gap-8">
         <Link href="/InforCart" className="">
          <Button>
          <FontAwesomeIcon
              icon={faCartShopping}
              className="text-white w-8 h-8"
              
            />
          </Button>
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
