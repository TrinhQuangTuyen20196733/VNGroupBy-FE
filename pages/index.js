import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/HomeLayOut";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { decryptToken } from "@/utils/decryptToken";
import * as Constants from "../constant/Constant";
import fetchAPI from "@/utils/fetchAPI";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className=" bg-cover h-auto w-screen">
      <Layout />;
    </div>
  );
}
