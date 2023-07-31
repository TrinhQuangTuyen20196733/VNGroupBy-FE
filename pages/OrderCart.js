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
         <div style={{fontSize:'25px', color:'#ff7f00'}}  >
            Addres to receive goods
        </div>
      <Row>
      <Col span={12} style={{width:'100%', height:'150px'}}>
       <div style={{paddingTop:'15px'}}>
            <Col style={{fontWeight:'800',fontSize:'15px'}}>Nguyễn Minh Quân </Col>
            <Col style={{fontWeight:'800', fontSize:'15px'}}>033 444 2029</Col>
            <Col style={{fontSize:'15px', fontWeight: '600'}}>Thuong Thuy, Phu Phuong, Tay Ho, Ha Noi</Col>
       </div>
      </Col>
      <Col span={12}>
       <div style={{paddingTop:'15px', }}>
            <Col style={{fontWeight:'800',fontSize:'15px'}}>Nguyễn Minh Quân </Col>
            <Col style={{fontSize:'15px', fontWeight: '600'}}>Thuong Thuy, Phu Phuong, Tay Ho, Ha Noi</Col>
       </div>
      </Col>
      </Row>
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
      <Row style={{ height:'200px'}} >
           <Row style={{width:'100%', paddingTop:'30px', fontSize:'15px', fontWeight:'600'}}>
           {/* <Col style={{color:'#808080',fontSize:'15px',lineHeight: '2.0'}} span={8}>
                    <div>Category:</div>
                    <div>Origin:</div>
                    <div>Brand:</div>
                    <div>Sent from:</div>
                    <div>Warehouses:</div>
                </Col>
                <Col style={{fontSize:'15px',lineHeight: '2.0', fontWeight:'450'  }}>
                    <div>Phones & accessories </div>
                    <div>Viet Nam</div>
                    <div>Apple</div>
                    <div>Ha Noi</div>
                    <div>149</div>
                </Col> */}
           </Row>
           <Row style={{width:'100%'}}>
           <Col style={{color:'#808080',fontSize:'15px',lineHeight: '3.0'}} span={6}>
                    <div>Category:</div>
                    <div>Origin:</div>
                    <div>Brand:</div>
                    <div>Sent from:</div>
                    <div>Warehouses:</div>
                </Col>
                <Col span={6} style={{ padding:'30pxx', fontSize:'15px',lineHeight: '3.0', fontWeight:'450'  }}>
                    <div>Phones & accessories </div>
                    <div>Viet Nam</div>
                    <div>Apple</div>
                    <div>Ha Noi</div>
                    <div>149</div>
                </Col>
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
                        <div>
                            <Row style={{}}>
                            <h3 style={{textDecorationLine: 'underline',fontWeight:'bold', color:'#ff7f00' }} >đ</h3>
                            <Col style={{paddingLeft:'5px',fontWeight:'bold', color:'#ff7f00'}} span={8}> 67,475,000</Col>
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
        <Row style={{paddingTop:"70px"}}>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6} style={{display:'block'}}>
                    <Row style={{width:'100%', paddingTop:'70px', fontSize:'20px', fontWeight:'600'}}>
                    <Button style={{width:'220px', height:'60px',fontSize:'18px', fontWeight:'500',borderRadius:'20px', background:'#ff7f00', color:'#fff'}}>Puchase</Button>
                    </Row>
            </Col>
        </Row>
    </HomeLayout>
  );
}
