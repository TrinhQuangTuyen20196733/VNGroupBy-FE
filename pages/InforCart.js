import { Button, Col, Row, Table } from 'antd';
import React, { useState } from "react";

import HomeLayout from "@/components/HomeLayOut";

const columns = [
  
  {
    title: '',
    dataIndex: '',
},
    {
        title: 'Value Property',
        dataIndex: 'value property',
    },
    {
        title: 'Unit Price',
        dataIndex: 'unit price',
    },
    {
        title: 'Depoair',
        dataIndex: 'depoair',
    },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Total Money',
    dataIndex: 'total money',
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
export default function InforCart() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const start = () => {
        setLoading(true);
        setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
        }, 1000);
    };
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
  return (
    <HomeLayout>
     
      <Row style={{width:'100%', height:'70px', padding:'0px 0px 20px 0px'}}>
        <Col span={8} >
            <Row ></Row>  
            <Row style={{display:'flex',flexDirection: 'column', fontSize:'30px', fontWeight:"500", color: '#ff7f00' }} span={6}>
            Shopping Cart   
            </Row> 
            <Row ></Row> 
        </Col>
        <Col span={8}></Col>
        <Col span={8}>
          <Row>
          <Col style={{display:'flex',paddingTop:'10px', fontSize:'20px', fontWeight:"400" }}  span={8}>Total Payments:</Col>
          <Col style={{display:'flex',paddingTop:'10px', fontSize:'20px', fontWeight:"400", color:'#ff7f00' }}  span={8}>67,450,000
          <h3 style={{fontSize: '20px',paddingLeft:'5px', textDecorationLine: 'underline', color:'#ff7f00' }} >đ</h3>
          </Col>
          <Col style={{display:'flex',paddingTop:'10px', fontSize:'20px', fontWeight:"400" }}  span={8}>
            <Button style={{ fontSize:'15px', textAlign:'center', fontWeight:"600", width:'150px', height:'40px', color:'#fff', background:'#ff7f00' }} >
              Pay Now
            </Button>
          </Col>
          </Row>
        </Col>
      </Row>
      <div
        style={{
          marginBottom: 10,
        }}>
        <Button style={{color:'blue'}} type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Tất cả
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </HomeLayout>
  );
}
