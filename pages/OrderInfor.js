import HomeLayout from "@/components/HomeLayOut";
import React, { useState } from "react";

import { useEffect } from "react";
import fetchAPI from "@/utils/fetchAPI";
import { Space, Table, Tag } from "antd";

export default function CustomerOrder() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(true);
  const columns = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (text) => <a></a>,
    },
    {
      title: "ProductName",
      dataIndex: "productName",
      key: "productName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "ShopName",
      dataIndex: "shopName",
      key: "shopName",
    },
    {
      title: "paymentType",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { tag }) => {
        let color = "green";
        switch (tag) {
          case "ApproveWatting":
            color = "green";
            break;
          case "GoodsPepared":
            color = "blue";
            break;
          case "ShipperWatting":
            color = "yellow";
            break;
          case "Shipping":
            color = "grey";
            break;
          case "Done":
            color = "green";
            break;
          case "Cancel":
            color = "volcano";
            break;
          default:
            break;
        }
        return (
          <Tag color={color} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: ({ action }, record) => (
        <Space size="middle">
          <a
            className="text-sky-500e "
            onClick={() => {
              handleCancel(record);
            }}
          >
            {action}
          </a>
        </Space>
      ),
    },
  ];
  const handleCancel = (record) => {
    fetchAPI(`http://localhost:8080/orders/cancel/${record.id}`, "POST")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          alert("Delete Successfull!");
          setReload(!reload);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  useEffect(() => {
    fetchAPI(`http://localhost:8080/orders/GetAllOfUser`, "GET")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data.data);
        const result = data.data.map((item, index) => {
          let tag = "ApproveWatting";
          let action = "";
          switch (item.status) {
            case 100:
              tag = "ApproveWatting";
              action = "CANCEL";
              break;
            case 200:
              tag = "GoodsPepared";
              action = "CANCEL";
              break;
            case 300:
              color = "ShipperWatting";
              action = "CANCEL";
              break;
            case 400:
              color = "Shipping";
              break;
            case 500:
              color = "Done";
              break;
            case 600:
              color = "Cancel";
              break;
            default:
              break;
          }
          return {
            id: item.orderId,
            key: item.id,
            productName: item.productName,
            shopName: item.shopName,
            quantity: item.quantity,
            price: item.currentPrice,
            paymentType: item.paymentType,
            tag,
            action,
          };
        });
        setData(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);

  return (
    <HomeLayout>
      <Table columns={columns} dataSource={data} />;
    </HomeLayout>
  );
}
