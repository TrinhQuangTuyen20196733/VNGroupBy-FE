import HomeLayout from "@/components/HomeLayOut";
import { Tabs } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import fetchAPI from "@/utils/fetchAPI";
import Product from "@/components/Product";

export default function Home() {
  const onChange = (key) => {
    console.log(key);
  };
  const { TabPane } = Tabs;
  const [cateList, setCateList] = useState([]);
  const [cateCode, setCateCode] = useState("ĐH");
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    fetchAPI(`http://localhost:8080/categorys`, "GET")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          console.log(data);
          const ls = data.data.map((cate, index) => ({
            key: cate.code,
            label: cate.name,
            children: <Product cateCode={cate.code}></Product>,
          }));
          setCateList(ls);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleTabClick = (key, event) => {
    setCateCode(key);
  };

  return (
    <HomeLayout>
      <Tabs
        defaultActiveKey="1"
        items={cateList}
        onChange={onChange}
        onTabClick={handleTabClick}
      ></Tabs>
    </HomeLayout>
  );
}
