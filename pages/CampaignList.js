import React, { useState } from "react";
import { Space, Table, Button, Image } from "antd";
import HomeLayout from "@/components/HomeLayOut";
import { useEffect } from "react";
import fetchAPI from "@/utils/fetchAPI";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";

export default function CampaignList() {
  const columns = [
    {
      title: "Campaign Name",
      dataIndex: "name",
      key: "campaignName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (text) => <a>{text}</a>,
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

  const [campaignList, setCampaignList] = useState([]);
  const [updateState, setUpdateState] = useState(true);
  const router = useRouter();

  const handleUpdate = (record) => {
    router.push(
      {
        pathname: "/AddCampaign",
        query: { campaignID: record.id },
      },
      "/AddCampaign"
    );
  };
  const handleDelete = (record) => {
    fetchAPI(`http://localhost:8080/campaigns/${record.id}`, "DELETE")
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
    fetchAPI(`http://localhost:8080/campaigns/GetItems`, "POST")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          data.data.forEach((item) => {
            item.startTime = moment(item.startTime).format("DD-MM-YYYY ");
            item.endTime = moment(item.staendTimertTime).format("DD-MM-YYYY ");
          });
          setCampaignList(data.data);
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
      <Link href="/AddCampaign">
        <Button
          type="primary"
          htmlType="submit"
          className="bg-blue-500 mt-8 mb-8"
        >
          Add Campaign
        </Button>
      </Link>
      <Table columns={columns} dataSource={campaignList} />
    </HomeLayout>
  );
}
