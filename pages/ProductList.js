import React, { useState } from "react";
import { Space, Table, Button, Image } from "antd";
import HomeLayout from "@/components/HomeLayOut";
import { useEffect } from "react";
import fetchAPI from "@/utils/fetchAPI";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ProductList() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Image Url",
      key: "imageUrl",
      dataIndex: "imageUrl",
      render: (_, { imageUrl }) => <Image width={100} src={imageUrl} />,
    },
    {
      title: "Origin Price",
      dataIndex: "originPrice",
      key: "originPrice",
    },
    {
      title: " Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: " Sold Quantity",
      dataIndex: "soldQuantity",
      key: "soldQuantity",
    },
    {
      title: " In Stock",
      dataIndex: "inStock",
      key: "inStock",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            className="text-sky-500e "
            onClick={() => {
              handleUpdate(record);
            }}
          >
            Update
          </a>
          <a
            className="text-red-700"
            onClick={() => {
              handleDelete(record);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  const [productList, setProductList] = useState([]);
  const [updateState, setUpdateState] = useState(true);
  const router = useRouter();

  const handleUpdate = (record) => {
    router.push(
      {
        pathname: "/AddProduct",
        query: { productID: record.id },
      },
      "/AddProduct"
    );
  };
  const handleDelete = (record) => {
    fetchAPI(`http://localhost:8080/products/${record.id}`, "DELETE")
      .then((response) => {
        setUpdateState(!updateState);
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          alert("Delete Successfull!");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchAPI(`http://localhost:8080/products/GetItems`, "POST")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          console.log(data);

          data.data.forEach((item) => {
            item.imageUrl =
              "http://localhost:8080" + item.imageUrl.replace(".", "");
          });
          setProductList(data.data);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updateState]);
  return (
    <HomeLayout>
      <Link href="/AddProduct">
        <Button
          type="primary"
          htmlType="submit"
          className="bg-blue-500 mt-8 mb-8"
        >
          Add product
        </Button>
      </Link>
      <Table columns={columns} dataSource={productList} />
    </HomeLayout>
  );
}
