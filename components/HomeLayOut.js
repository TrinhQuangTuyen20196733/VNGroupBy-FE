import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  FundOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Header from "@/components/Header";

import {
  ShoppingCartOutlined,
  MailOutlined,
  WalletOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
const { Content, Footer, Sider } = Layout;
const items2 = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  WalletOutlined,
].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});
function getItem(label, key, icon, children, type, url) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Tài khoản", "sub1", <MailOutlined />, [
    getItem("Địa chỉ giao hàng", "/ShippingAddress"),
    getItem("Chỉnh sửa tài khoản", "/UpdateAccount"),
    getItem("Đổi mật khẩu ", "/UpdatePassword"),
  ]),
  getItem("Quản lý ví", "sub2", <WalletOutlined />, [
    getItem("Thông tin ví", "/Wallet"),
    getItem("Thông tin giao dịch", "/MoneyTransfer"),
  ]),
  {
    type: "divider",
  },
  getItem("Thông tin shop", "/ShopInfo", <ShopOutlined />),
  getItem("Thông tin sản phẩm ", "sub4", <ShoppingOutlined />, [
    getItem("Thêm mới sản phẩm", "/AddProduct"),
    getItem("Danh sách sản phẩm", "/ProductList"),
  ]),
  getItem("Quản lý giỏ hàng ", "sub9", <ShoppingCartOutlined />, [
    getItem("Xem giỏ hàng", "/CartInfor"),
  ]),
  getItem("Thông tin đơn hàng", "/OrderInfor", <UnorderedListOutlined />),
  getItem("Thông tin đơn đặt hàng", "/ShopOrder", <UnorderedListOutlined />),
  getItem("Quản lý chiến dịch ", "sub900", <FundOutlined />, [
    getItem("Tạo mới chiến dịch", "/AddCampaign"),
    getItem("Danh sách chiến dịch", "/CampaignList"),
  ]),
];
const HomeLayout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();
  const onClick = (item) => {
    router.push(item.keyPath[0]);
  };
  return (
    <Layout>
      <Header />
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={300}
          >
            <Menu
              onClick={(item) => {
                onClick(item);
              }}
              style={{
                height: "100%",
                fontSize: "14px",
                fontWeight: "500",
              }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              items={items}
            />
          </Sider>
          <Content
            style={{
              padding: "0 24px",
              minHeight: 700,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        VNGroupBy ©2023 Created by Trinh Quang Tuyen - HUST(K64)
      </Footer>
    </Layout>
  );
};
export default HomeLayout;
