import { Button, Col, Row, Steps, Table } from 'antd';
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
        title: 'Quanity',
        dataIndex: 'quanity',
    },
    {
        title: 'Unit Deposit',
        dataIndex: 'unitdepoair',
    }, 
    {
        title: 'Unit Price',
        dataIndex: 'unitprice',
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
const { Step } = Steps;
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
         <div style={{fontSize:'25px', color:'#ff7f00'}}  >
            Addres to receive goods
        </div>
      <Row>
      <Col span={12} style={{width:'100%', height:'150px', lineHeight: '2.0'}}>
       <div style={{paddingTop:'15px'}}>
            <Col style={{fontWeight:'800',fontSize:'15px'}}>Nguyễn Minh Quân </Col>
            <Col style={{fontWeight:'800', fontSize:'15px'}}>033 444 2029</Col>
            <Col style={{fontSize:'15px', fontWeight: '600'}}>Thuong Thuy, Phu Phuong, Tay Ho, Ha Noi</Col>
       </div>
      </Col>
      <Col span={12}>
        <Col span={8}></Col>
        <Col span={12} style={{paddingTop:'15px',lineHeight: '3.0' }}>
            <Col style={{fontWeight:'600',fontSize:'15px'}}>The order has been placed </Col>
            <Col style={{fontSize:'15px', fontWeight: '600'}}>The order has been placed successfully shipped</Col>
        </Col>
      </Col>
      </Row>
      <div
        style={{
          marginBottom: 10,
        }}>
        <Row style={{width: '100%'}}>
          <Col span={4}>
              <p style={{paddingLeft:'45px',fontSize:'20px',fontWeight:'600', color:'#ff7f00'}}>Order item</p>
          </Col>
          <Col span={18}>
              <Steps current={4} /* Đặt current là bước hiện tại đang đạt đến */>
              <Step title="Đặt hàng" />
              <Step title="Xác nhận đơn hàng" />
              <Step title="Giao hàng" />
              <Step title="Hoàn thành" />
              </Steps>
          </Col>
        </Row>
      </div>
      <Table style={{paddingTop:'20px'}} showHeader={true} rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{y: 300}}  pagination={false } />
      <Row style={{ height:'200px', paddingTop:'30px'}} >
           {/* <Row style={{width:'100%', paddingTop:'30px', fontSize:'15px', fontWeight:'600'}}>
           </Row> */}
           <Row style={{width:'100%'}}>
           <Col style={{fontSize:'15px',lineHeight: '3.0', paddingTop:'20px', fontWeight:'450' }} span={6}>
                    <div>Order Code:</div>
                    <div>Delivery method:</div>
                    <div>Payment method:</div>
                </Col>
                <Col span={6} style={{ padding:'30pxx', fontSize:'15px',lineHeight: '3.0',  paddingTop:'20px', fontWeight:'450'  }}>
                    <div>OD1677834341635</div>
                    <div>Fast delivery</div>
                    <div>Payment on delivery </div>
                </Col>
                <Col span={6}></Col>
                <Col span={6}>
                    <Row>
                    <Col style={{fontSize:'15px',lineHeight: '3.0', fontWeight:'600'}}>
                        <div>Total Amout:</div>
                        <div>Shipping fee:</div>
                        <div>Prepaid mount:</div>
                        <div>Total payment:</div>
                    </Col>
                    <Col style={{ paddingLeft:'80px',fontSize:'15px',lineHeight: '3.0', fontWeight:'450'  }}>
                        <div>
                            <Row style={{}}>
                            <h3 style={{textDecorationLine: 'underline',fontWeight:'bold' }} >đ</h3>
                            <Col style={{paddingLeft:'5px',fontWeight:'bold'}} span={8}> 13,490,000</Col>
                            </Row>
                        </div>
                        <div>
                            <Row style={{}}>
                            <h3 style={{textDecorationLine: 'underline',fontWeight:'bold' }} >đ</h3>
                            <Col style={{paddingLeft:'5px',fontWeight:'bold'}} span={8}> 55,000</Col>
                            </Row>
                        </div>
                        <div>
                            <Row style={{}}>
                            <h3 style={{textDecorationLine: 'underline',fontWeight:'bold', color:'#ff7f00' }} >đ</h3>
                            <Col style={{paddingLeft:'5px',fontWeight:'bold', color:'#ff7f00'}} span={8}> 0</Col>
                            </Row>
                        </div>
                        <div>
                            <Row style={{}}>
                            <h3 style={{textDecorationLine: 'underline',fontWeight:'bold', color:'#ff7f00' }} >đ</h3>
                            <Col style={{paddingLeft:'5px', fontWeight:'bold', color:'#ff7f00'}} span={8}> 67,475,000</Col>
                            </Row>
                        </div>
                    </Col>
                    </Row>
                </Col>           
            </Row>
        </Row>
        <Row style={{paddingTop:"0px"}}>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6} style={{display:'block'}}>
                    <Row style={{width:'100%', paddingTop:'40px', fontSize:'20px', fontWeight:'600', paddingLeft:'30px'}}>
                    <Button style={{ width:'220px', height:'60px',fontSize:'18px', fontWeight:'500',borderRadius:'20px', background:'#ff7f00', color:'#fff'}}>Cancel Order</Button>
                    </Row>
            </Col>
        </Row>
    </HomeLayout>
  );
}
