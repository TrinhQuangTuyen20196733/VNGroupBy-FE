import HomeLayout from "@/components/HomeLayOut";
import React, { useState } from "react";

import { useEffect } from "react";
import fetchAPI from "@/utils/fetchAPI";
import { Space, Table, Tag } from "antd";

export default function ShopOrder() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(true);
  const [actions, setActions] = useState(["Approve", "Find Shipper", "Cancel"]);
  const [actionIndex, setActionIndex] = useState(0);
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
      title: "Customer Address",
      dataIndex: "customerAddress",
      key: "customerAddress",
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
      render: (record) => (
        <Space size="middle">
          <a
            className="text-sky-500e "
            onClick={() => {
              handleClick(record);
            }}
          >
            {actions[actionIndex]}
          </a>
        </Space>
      ),
    },
  ];
  const handleClick = (record) => {
    let act = "approve";
    switch (actionIndex) {
      case 0:
        act = "approve";
        break;
      case 1:
        act = "findShipper";
        break;
      default:
        break;
    }
    fetchAPI(`http://localhost:8080/orders/${act}/${record.id}`, "POST")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          setActionIndex(actionIndex + 1);
          alert(" Successfull!");
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
    fetchAPI(`http://localhost:8080/orders/GetAllOfShop`, "GET")
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
              setActionIndex(0);
              break;
            case 200:
              tag = "Order Pepared";
              setActionIndex(1);
              break;
            case 300:
              color = "ShipperWatting";
              setActionIndex(2);
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

            quantity: item.quantity,
            price: item.currentPrice,
            paymentType: item.paymentType,
            customerAddress: item.customerAddress,
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
