import { Button, Col, Row, Select, Space, Table } from 'antd';
import React, { useState } from "react";

import HomeLayout from "@/components/HomeLayOut";

const columns = [
    {
    title: '',
    dataIndex: '',
    },
    {
        title: '',
        dataIndex: '',
        },
    {
        title: 'Unit Price',
        dataIndex: 'unit price',
    },
    {
        title: 'Quanity',
        dataIndex: 'quanity',
    },
    {
        title: 'Unit Depoair',
        dataIndex: 'unitdepoair',
    }, 
    {
        title: 'Sum Depoair',
        dataIndex: 'sumdepoair',
    },
    {
        title: 'Sum Price',
        dataIndex: 'sumprice',
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
const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
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
      <div style={{width:'100%', height:'150px'}}>
        <div style={{fontSize:'25px', color:'#ff7f00'}}  >
            Addres to receive goods
        </div>
       <Row style={{paddingTop:'15px'}}>
            <Col style={{fontWeight:'800',fontSize:'15px'}}>Nguyễn Minh Quân </Col>
            <Col style={{paddingLeft:'10px',fontWeight:'800', fontSize:'15px'}}>033 444 2029</Col>
            <Col style={{paddingLeft:'10px', fontSize:'15px', fontWeight: '600'}}>Thuong Thuy, Phu Phuong, Tay Ho, Ha Noi</Col>
       </Row>
        <Col style={{paddingTop:'15px', fontSize:'15px', fontWeight:'400'}}>
        If you want to change address, place change default here and reload page
        </Col>
      </div>
      <div
        style={{
          marginBottom: 10,
        }}>
        <Row>
            <p style={{paddingLeft:'15px',fontSize:'15px',fontWeight:'600', color:'#ff7f00'}}>PRODUCT</p>
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
      <Table showHeader={true} rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{y: 300}}  pagination={false } />
      <Row style={{paddingTop:'30px'}}>
            <Col span={8}></Col>
            <Col span={8}></Col>
            <Col span={8}>
                <Row>
                    <Col>Delivery:</Col>
                    <Col span={6} style={{paddingLeft:'15px'}}>
                        <Space
                            style={{
                            width: '100%',
                            }}
                            direction="vertical"
                        >
                            <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please select"
                            onChange={handleChange}
                            options={options}
                            />
                        </Space>
                    </Col>
                    <Col style={{paddingLeft:'40px'}} span={8}>Shipping Free:</Col>
                    <Row>
                    <h3 style={{textDecorationLine: 'underline', color:'#ff7f00' }} >đ</h3>
                    <Col span={8}> 25,000</Col>
                    </Row>
                </Row>
            </Col>
      </Row>
      <Row style={{paddingTop:'20px'}}>
            <Col span={8}></Col>
            <Col span={8}></Col>
            <Col span={8}>
                <Row> 
                    <Col></Col>
                    <Col span={8}></Col>
                    <Col style={{paddingLeft:'15px'}} span={8}>Total amount to pay :</Col>
                    <Row style={{fontSize:'20px'}}>
                    <h3 style={{textDecorationLine: 'underline', color:'#ff7f00' }} >đ</h3>
                    <Col style={{paddingLeft:'5px',fontSize:'20px', color:'#ff7f00'}} span={8}> 67,475,000</Col>
                    </Row>
                </Row>
            </Col>
      </Row>
      <Row style={{ height:'200px'}} >
           <Row style={{width:'100%', paddingTop:'30px', fontSize:'15px', fontWeight:'600'}}>
           <span style={{fontSize:'20px', fontWeight:'600'}}>Payment methods</span>
           <div style={{paddingLeft:'20px', color:'#f77f00'}}>
                <Button style={{color:'#f77f00', border: '2px solid #f77f00'}}>Payment Vis Wallet</Button>
           </div>
           <div style={{paddingLeft:'20px'}}>
                <Button>Payment On Delivery</Button>
           </div>
           </Row>
           <Row style={{width:'100%', paddingTop:'15px', fontWeight:'500'}}>
            <p style={{fontSize: '15px'}}>Watllet balace:</p>
            <p style={{paddingLeft:'10px',fontSize: '15px', textDecorationLine: 'underline', color:'#ff7f00' }} >đ</p>
            <p style={{fontSize: '15px', color:'#ff7f00' }}>0</p>
           </Row>
           <Row style={{width:'100%'}}>
                <Col span={6}></Col>
                <Col span={6}></Col>
                <Col span={6}></Col>
                <Col span={6}>
                    <Row>
                    <Col style={{fontSize:'15px',lineHeight: '3.0', fontWeight:'600'}}>
                        <div>Category:</div>
                        <div>Origin:</div>
                        <div>Brand:</div>
                        <div>Sent from:</div>
                        <div>Warehouses:</div>
                    </Col>
                    <Col style={{ paddingLeft:'80px',fontSize:'15px',lineHeight: '3.0', fontWeight:'450'  }}>
                        <div>Phones & accessories </div>
                        <div>Viet Nam</div>
                        <div>Apple</div>
                        <div>Ha Noi</div>
                        <div>149</div>
                    </Col>
                    </Row>
                </Col>         
               
            </Row>
        </Row>
        <Row style={{paddingTop:"70px"}}>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6} style={{display:'block'}}>
                    <Row style={{width:'100%', paddingTop:'70px', fontSize:'20px', fontWeight:'600'}}>
                    <Button style={{width:'250px', height:'40px',fontSize:'18px', fontWeight:'500',borderRadius:'20px', background:'#ff7f00', color:'#fff'}}>Puchase</Button>
                    </Row>
            </Col>
        </Row>
    </HomeLayout>
  );
}
