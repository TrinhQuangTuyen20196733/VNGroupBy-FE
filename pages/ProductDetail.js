import { Button, Carousel, Col, InputNumber, Rate, Row } from "antd";
import React, { use, useState } from "react";

import HomeLayout from "@/components/HomeLayOut";
import { ShoppingOutlined } from "@ant-design/icons";

import { useRouter } from "next/router";
import fetchAPI from "@/utils/fetchAPI";

const contentStyle = {
  //   margin: 0,
  height: "260px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#ff7f00",
  display: "inline",
};
const contentItem = {};

export default function Inforproduct() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(0);
  const product = router.query;
  console.log(product);
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const handleAddToCart = () => {
    const cartItem = {
      product_id: product.id,
      quantity,
      currentPrice: product.price,
      buyType: "product",
    };
    console.log(cartItem);
    fetchAPI(`http://localhost:8080/cart_item`, "POST", cartItem)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          console.log(data);
          alert("Đã thêm sản phẩm vào giỏ hàng thành công!");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <HomeLayout>
      <Row>
        <Col
          span={8}
          style={{
            padding: "5px 20px 0px 20px",
            background: "#fff",
            height: "300px",
          }}
        >
          <Carousel afterChange={onChange}>
            <div>
              <h3 style={contentStyle}>
                <img
                  src={
                    "http://localhost:8080" +
                    product?.imageUrl?.replace(".", "")
                  }
                  alt="Mô tả ảnh"
                />
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <img
                  src="https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                  alt="Mô tả ảnh"
                />
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <img
                  src="https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                  alt="Mô tả ảnh"
                />
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <img
                  src="https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                  alt="Mô tả ảnh"
                />
              </h3>
            </div>
          </Carousel>
        </Col>
        <Col style={{ paddingLeft: "30px", lineHeight: "2.5" }} span={8}>
          <div>
            <div>
              <Row>
                <Col span={3}>
                  <h6>Brant</h6>
                </Col>
                <h6 style={{ color: "blue" }}>{product.brand}</h6>
              </Row>
            </div>
            <div style={{ fontSize: "20px", fontWeight: "600" }}>
              <h3>{product.name}</h3>
            </div>
            <div>
              <Row style={{ display: "flex", alignItems: "center" }}>
                <h3
                  style={{
                    fontSize: "20px",
                    textDecorationLine: "underline",
                    color: "#ff7f00",
                  }}
                >
                  0
                </h3>
                <Rate
                  style={{ justify: "center", padding: "0px 10px 0px 10px" }}
                />
                <h4 style={{ paddingRight: "10px" }}>(View 1000 review)</h4>
                <h4>Sold {product.soldQuantity}</h4>
              </Row>
            </div>
            <div>
              <Row style={{ alignItems: "end", display: "flex" }}>
                <Col
                  style={{ width: "100%", fontSize: "22px", color: "#ff7f00" }}
                  span={8}
                >
                  <h2>{product.price} đ</h2>{" "}
                </Col>
                <Col style={{ textDecoration: "line-through" }}>
                  {" "}
                  <h4> {product.originPrice} đ</h4>
                </Col>
              </Row>
            </div>
            <div>
              <Row>
                <Col span={8}>
                  <h2>Color</h2>
                </Col>
                <Col span={8}>
                  {" "}
                  <Button>Red</Button> <Button>Blue</Button>{" "}
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <h2>Quatity</h2>
                </Col>
                <Col span={8}>
                  {" "}
                  <InputNumber
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e);
                    }}
                  />{" "}
                </Col>
              </Row>
            </div>
            <div style={{ paddingTop: "20px" }}>
              <Button style={{ background: "#0099FF" }}>
                <Row
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyItems: "center",
                    color: "blue",
                    border: "none",
                    borderRadius: "5px",
                    color: "#fff",
                  }}
                >
                  <ShoppingOutlined />
                  <div
                    style={{ paddingLeft: "10px" }}
                    onClick={handleAddToCart}
                  >
                    Add to Shopping Cart
                  </div>
                </Row>
              </Button>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div>
            <h3 style={contentStyle}></h3>
          </div>
        </Col>
      </Row>
      <Row style={{ width: "100%", height: "100px", paddingTop: "20px" }}>
        <Col
          span={8}
          style={{ display: "flex", padding: "0px 150px 0px 10px" }}
        >
          <Row>
            <Col span={12}>
              <div
                style={{
                  justifyItems: "center",
                  alignItems: "center",
                  padding: "10px 10px 10px 10px",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                  alt="Mô tả ảnh"
                />
              </div>
            </Col>
            <Col span={12}>
              <div style={{ fontSize: "10px", fontWeight: "800" }}>Shop4</div>
              <div style={{ paddingTop: "10px" }}>
                <Button style={{ display: "flex", background: "#ff7f00" }}>
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyItems: "center",
                      color: "#fff",
                    }}
                  >
                    <ShoppingOutlined />
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: "600",
                        paddingLeft: "5px",
                      }}
                    >
                      View store
                    </p>
                  </Row>
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
        <Col
          span={12}
          style={{
            display: "flow",
            marginBlock: "20px",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Row>
            <Col span={8}>
              <Row>
                <div>Review:</div>
                <div
                  style={{
                    paddingLeft: "5px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#ff7f00",
                  }}
                >
                  0
                </div>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <div>Product:</div>
                <div
                  style={{
                    paddingLeft: "5px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#ff7f00",
                  }}
                >
                  {product.inStock}
                </div>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <div>Compaigns:</div>
                <div
                  style={{
                    paddingLeft: "15px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#ff7f00",
                  }}
                >
                  2
                </div>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Row>
                <div>Joined:</div>
                <div
                  style={{
                    paddingLeft: "5px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#ff7f00",
                  }}
                >
                  2 days ago
                </div>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <div>Adress:</div>
                <div
                  style={{
                    paddingLeft: "5px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#ff7f00",
                  }}
                >
                  Ha Noi
                </div>
              </Row>
            </Col>
            <Col span={8}></Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ height: "200px", paddingTop: "40px" }}>
        <Row style={{ width: "100%", fontSize: "15px", fontWeight: "600" }}>
          <span> PRODUCT DETAIL</span>
        </Row>
        <Row style={{ width: "100%", paddingTop: "20px" }}>
          <Col
            style={{ color: "#808080", fontSize: "15px", lineHeight: "2.0" }}
            span={8}
          >
            <div>Category:</div>
            <div>Origin:</div>
            <div>Brand:</div>
            <div>Sent from:</div>
            <div>Warehouses:</div>
          </Col>
          <Col
            style={{ fontSize: "15px", lineHeight: "2.0", fontWeight: "450" }}
          >
            <div>{product.category}</div>
            <div>{product.origin}</div>
            <div>{product.brand}</div>
            <div>Ha Noi</div>
            <div>149</div>
          </Col>
        </Row>
        <Row
          style={{
            width: "100%",
            paddingTop: "30px",
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          <span>PRODUCT DESCRIPTION</span>
        </Row>
        <Row style={{ width: "100%", paddingTop: "15px", fontWeight: "500" }}>
          <p>Sản phẩm chính hãng</p>
        </Row>
      </Row>
      <Row style={{ paddingTop: "100px" }}>
        <Row
          style={{
            width: "100%",
            paddingTop: "70px",
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          <span>PRODUCT REVIEWS</span>
        </Row>
      </Row>
    </HomeLayout>
  );
}
