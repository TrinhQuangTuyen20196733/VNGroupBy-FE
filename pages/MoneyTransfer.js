import HomeLayout from "@/components/HomeLayOut";
import React, { useState } from "react";
import { Table } from "antd";
import { useEffect } from "react";
import fetchAPI from "@/utils/fetchAPI";
const columns = [
  {
    title: "TRANSFER_ID",
    dataIndex: "TRANSFER_ID",
    key: "TRANSFER_ID",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "FROM_USER",
    dataIndex: "FROM_USER",
    key: "FROM_USER",
  },
  {
    title: "TO_USER",
    dataIndex: "TO_USER",
    key: "TO_USER",
  },
  {
    title: "TRANSFERED_DATE",
    dataIndex: "TRANSFERED_DATE",
    key: "TRANSFERED_DATE",
  },
];

export default function MoneyTransfer() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const apiParam = {
      page: 1,
      limit: 10,
    };
    fetchAPI(`http://localhost:8080/moneyTransfer/getMe`, "POST", apiParam)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data.data);
        setData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <HomeLayout>
      <Table columns={columns} dataSource={data || ""} />
    </HomeLayout>
  );
}
