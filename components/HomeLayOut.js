import {
  AppstoreOutlined,
  InboxOutlined,
  MailOutlined,
  SettingOutlined,
  WalletOutlined
} from "@ant-design/icons";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";

import Header from "@/components/Header";
import React from "react";
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
    getItem("Địa chỉ giao hàng", "5"),
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
  getItem("Quản lý sản phẩm", "sub4", <InboxOutlined />, [
    getItem("Thông tin sản phẩm", "/Inforproduct"),
    getItem("Cập nhật sản phẩm", "/OrderCart"),
    getItem("Option 12", "12"),
  ]),
  getItem(
    "Group",
    "grp",
    null,
    [getItem("Option 13", "13"), getItem("Option 14", "14")],
    "group"
  ),
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
