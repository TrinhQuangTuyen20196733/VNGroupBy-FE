import { Button, Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import fetchAPI from "@/utils/fetchAPI";
import { useRouter } from "next/router";

import HomeLayout from "@/components/HomeLayOut";

const columns = [
  {
    title: "Product Name",
    dataIndex: "productName",
  },
  {
    title: "Product Brand",
    dataIndex: "productBrand",
  },
  {
    title: "Buy Type",
    dataIndex: "buyType",
  },
  {
    title: "Price",
    dataIndex: "currentPrice",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Total Money",
    dataIndex: "totalMoney",
  },
];

export default function CartInfor() {
  const router = useRouter();
  const [itemList, setItemList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [money, setMoney] = useState(0);
  const handlePayment = () => {
    const result = itemList.filter((item) => selectedRowKeys.includes(item.id));
    const data = result.reduce((acc, item) => {
      return acc + JSON.stringify(item) + ";";
    }, "");
    console.log(data);

    router.push(
      {
        pathname: "/Payment",
        query: { data: data.slice(0, -1) },
      },
      "/Payment"
    );
  };
  const onSelectChange = (newSelectedRowKeys) => {
    const totalMoney = itemList.reduce((acc, item) => {
      console.log(item.currentPrice);
      if (newSelectedRowKeys.includes(item.id)) {
        return acc + item.currentPrice * item.quantity;
      }
      return acc;
    }, 0);
    setMoney(totalMoney);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  useEffect(() => {
    fetchAPI(`http://localhost:8080/cart_item/GetMe`, "GET")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          console.log(data.data);
          var lst = data.data.map((item) => {
            return {
              id: item.id,
              key: item.id,
              productName: item.productName,
              productBrand: item.productBrand,
              currentPrice: item.currentPrice,
              quantity: item.quantity,
              totalMoney: item.currentPrice * item.quantity,
              buyType: item.buyType,
            };
          });
          setItemList(lst);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <HomeLayout>
      <Row
        style={{ width: "100%", height: "70px", padding: "0px 0px 20px 0px" }}
      >
        <Col span={8}>
          <Row></Row>
          <Row
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "30px",
              fontWeight: "500",
              color: "#ff7f00",
            }}
            span={6}
          >
            Shopping Cart
          </Row>
          <Row></Row>
        </Col>
        <Col span={8}></Col>
        <Col span={8}>
          <Row>
            <Col
              style={{
                display: "flex",
                paddingTop: "10px",
                fontSize: "20px",
                fontWeight: "400",
              }}
              span={8}
            >
              Total Payments:
            </Col>
            <Col
              style={{
                display: "flex",
                paddingTop: "10px",
                fontSize: "20px",
                fontWeight: "400",
                color: "#ff7f00",
              }}
              span={8}
            >
              {money}
              <h3
                style={{
                  fontSize: "20px",
                  paddingLeft: "5px",
                  textDecorationLine: "underline",
                  color: "#ff7f00",
                }}
              >
                đ
              </h3>
            </Col>
            <Col
              style={{
                display: "flex",
                paddingTop: "10px",
                fontSize: "20px",
                fontWeight: "400",
              }}
              span={8}
            >
              <Button
                style={{
                  fontSize: "15px",
                  textAlign: "center",
                  fontWeight: "600",
                  width: "150px",
                  height: "40px",
                  color: "#fff",
                  background: "#ff7f00",
                }}
                onClick={handlePayment}
              >
                Pay Now
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <Button style={{ color: "blue" }} type="primary">
          Tất cả
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        ></span>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={itemList}
      />
    </HomeLayout>
  );
}
