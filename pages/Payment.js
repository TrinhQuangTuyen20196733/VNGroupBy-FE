import { Button, Col, Row, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

import HomeLayout from "@/components/HomeLayOut";
import fetchAPI from "@/utils/fetchAPI";

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
export default function InforCart() {
  const router = useRouter();
  const dataObj = router.query;

  const data = dataObj.data + "";

  const jsonStringArray = data.split(";");

  const resultArray = jsonStringArray.map((jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  });
  console.log(resultArray);
  const productList = resultArray.map((item) => {
    return {
      id: item.id,
      key: item.id,
      productName: item.productName,
      productBrand: item.productBrand,
      currentPrice: item.currentPrice,
      quantity: item.quantity,
      totalMoney: item.currentPrice * item.quantity,
    };
  });
  const total = productList.reduce((acc, item) => {
    return acc + item.totalMoney;
  }, 0);
  const [option, setOption] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({});
  const [shipMethod, setShipmethod] = useState("Thường");
  const [shipCost, setShipCost] = useState(20000);

  const [totalPayment, setTotalPayment] = useState(total + shipCost);
  const [balance, setBalance] = useState(0);
  const handleClick = (buttonId) => {
    setSelectedButton(buttonId);
  };
  const handleFinish = () => {
    if (balance > totalPayment) {
      const payload = productList.map((item) => ({
        cartItemId: item.id,
        paymentName: selectedButton,
        shipName: shipMethod,
      }));
      console.log(payload);
      fetchAPI(`http://localhost:8080/orders`, "POST", payload)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.code == 200) {
            alert("Bạn đã đặt hàng thành công");
            router.push("/OrderInfor");
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Tài khoản của bạn không đủ để thực hiện giao dịch!");
    }
  };
  useEffect(() => {
    setTotalPayment(total + shipCost);
  }, [shipCost]);
  useEffect(() => {
    fetchAPI(`http://localhost:8080/wallet/balance`, "GET")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setBalance(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    fetchAPI(`http://localhost:8080/ship_fee`, "GET")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          const rs = data.data.map((item) => ({
            label: item.name,
            value: item.name,
          }));
          console.log(rs);
          setOption(rs);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    fetchAPI(`http://localhost:8080/shipping_address/GetMe`, "GET")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          setShippingAddress(data.data);
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
      <div style={{ width: "100%", height: "150px" }}>
        <div style={{ fontSize: "25px", color: "#ff7f00" }}>
          Addres to receive goods
        </div>
        <Row style={{ paddingTop: "15px" }}>
          <Col style={{ fontWeight: "800", fontSize: "15px" }}>
            {shippingAddress.name}{" "}
          </Col>
          <Col
            style={{ paddingLeft: "10px", fontWeight: "800", fontSize: "15px" }}
          >
            {shippingAddress.phoneNumber}
          </Col>
          <Col
            style={{ paddingLeft: "10px", fontSize: "15px", fontWeight: "600" }}
          >
            {shippingAddress.address}
          </Col>
        </Row>
        <Col
          style={{ paddingTop: "15px", fontSize: "15px", fontWeight: "400" }}
        >
          If you want to change address, place change default here and reload
          page
        </Col>
      </div>
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <Row>
          <p
            style={{
              paddingLeft: "15px",
              fontSize: "15px",
              fontWeight: "600",
              color: "#ff7f00",
            }}
          >
            PRODUCT
          </p>
          {/* <Button style={{color:'#fff', background:'blue'}} type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
            Tất cả
            </Button> */}
        </Row>

        {/* <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Bạn đã chọn ${selectedRowKeys.length}` : ''}
        </span> */}
      </div>
      <Table
        showHeader={true}
        columns={columns}
        dataSource={productList}
        scroll={{ y: 300 }}
        pagination={false}
      />
      <Row style={{ paddingTop: "30px" }}>
        <Col span={8}></Col>
        <Col span={8}></Col>
        <Col span={8}>
          <Row>
            <Col>Delivery:</Col>
            <Col span={6} style={{ paddingLeft: "15px" }}>
              <Space
                style={{
                  width: "100%",
                }}
                direction="vertical"
              >
                <Select
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please select"
                  value={shipMethod}
                  options={option}
                  onChange={(value) => {
                    setShipmethod(value);
                    if (value == "Nhanh") setShipCost(30000);
                    if (value == "Thường") setShipCost(20000);
                  }}
                />
              </Space>
            </Col>
            <Col style={{ paddingLeft: "40px" }} span={8}>
              Shipping Free:
            </Col>
            <Row>
              <h3
                style={{
                  textDecorationLine: "underline",
                  color: "#ff7f00",
                  paddingRight: "5px",
                }}
              >
                đ
              </h3>
              <Col span={8}> {shipCost}</Col>
            </Row>
          </Row>
        </Col>
      </Row>
      <Row style={{ paddingTop: "20px" }}>
        <Col span={8}></Col>
        <Col span={8}></Col>
        <Col span={8}>
          <Row>
            <Col></Col>
            <Col span={8}></Col>
            <Col style={{ paddingLeft: "15px" }} span={8}>
              Total amount to pay :
            </Col>
            <Row style={{ fontSize: "20px" }}>
              <h3 style={{ textDecorationLine: "underline", color: "#ff7f00" }}>
                đ
              </h3>
              <Col
                style={{
                  paddingLeft: "5px",
                  fontSize: "20px",
                  color: "#ff7f00",
                }}
                span={8}
              >
                {" "}
                {totalPayment}
              </Col>
            </Row>
          </Row>
        </Col>
      </Row>
      <Row style={{ height: "200px" }}>
        <Row
          style={{
            width: "100%",
            paddingTop: "30px",
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: "600" }}>
            Payment methods
          </span>
          <div style={{ paddingLeft: "20px", color: "#f77f00" }}>
            <Button
              id="wallet"
              style={{
                color: selectedButton === "wallet" ? "#f77f00" : "grey",
                border:
                  selectedButton === "wallet"
                    ? "2px solid #f77f00"
                    : "2px solid grey",
              }}
              onClick={() => {
                handleClick("wallet");
              }}
            >
              Payment Via Wallet
            </Button>
          </div>
          <div style={{ paddingLeft: "20px" }}>
            <Button
              id="delivery"
              style={{
                color: selectedButton === "delivery" ? "#f77f00" : "grey",
                border:
                  selectedButton === "delivery"
                    ? "2px solid #f77f00"
                    : "2px solid  grey",
              }}
              onClick={() => {
                handleClick("delivery");
              }}
            >
              Payment On Delivery
            </Button>
          </div>
        </Row>
        <Row style={{ width: "100%", paddingTop: "15px", fontWeight: "500" }}>
          <p style={{ fontSize: "15px" }}>Watllet balance:</p>
          <p
            style={{
              paddingLeft: "10px",
              fontSize: "15px",
              textDecorationLine: "underline",
              color: "#ff7f00",
            }}
          >
            đ
          </p>
          <p style={{ fontSize: "15px", color: "#ff7f00" }}>{balance}</p>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col span={6}></Col>
          <Col span={6}></Col>
          <Col span={6}></Col>
        </Row>
      </Row>
      <Row style={{ paddingTop: "70px" }}>
        <Col span={6}></Col>
        <Col span={6}></Col>
        <Col span={6}></Col>
        <Col span={4} style={{ display: "block" }}>
          <Row
            style={{
              width: "100%",
              paddingTop: "70px",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            <Button
              style={{
                width: "250px",
                height: "40px",
                fontSize: "18px",
                fontWeight: "500",
                borderRadius: "20px",
                background: "#ff7f00",
                color: "#fff",
              }}
              onClick={handleFinish}
            >
              Purchase
            </Button>
          </Row>
        </Col>
      </Row>
    </HomeLayout>
  );
}
