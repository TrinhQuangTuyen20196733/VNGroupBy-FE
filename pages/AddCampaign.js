import HomeLayout from "@/components/HomeLayOut";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  Image,
} from "antd";
import { useEffect, useState } from "react";
import fetchAPI from "@/utils/fetchAPI";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import moment from "moment";

export default function AddProduct() {
  const router = useRouter();
  const { Option } = Select;
  const [form] = Form.useForm();
  const { campaignID } = router.query;
  console.log(campaignID);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const selectBefore = (
    <Select defaultValue="add" style={{ width: 60 }}>
      <Option value="add">+</Option>
      <Option value="minus">-</Option>
    </Select>
  );
  const selectAfter = (
    <Select defaultValue="USD" style={{ width: 60 }}>
      <Option value="VND">đ</Option>
      <Option value="USD">$</Option>
    </Select>
  );

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const handleOnclick = () => {
    const campaign = {
      name,
      productName,
      inStock,
      deposit,
      levels: priceLevels,
      startTime,
      endTime,
      currentPrice: originPrice,
    };
    console.log(campaign);
    fetchAPI(`http://localhost:8080/campaigns`, "POST", campaign)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          alert("Thêm mới chiến dịch thành công!");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [productName, setProductName] = useState("");
  const [originPrice, setOriginPrice] = useState(0);
  const [deposit, setDeposit] = useState(1000000);
  const [inStock, setInStock] = useState(0);
  const [productOption, setProductOption] = useState([]);
  const [productImage, setProductImage] = useState("");
  const [productList, setProductList] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [priceAmount, setPriceAmount] = useState(0);
  const [priceLevels, setPriceLevels] = useState([]);
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const renderPriceLevel = () => {
    const inputs = [];
    for (let i = 0; i < priceAmount; i++) {
      inputs.push(
        <div className="flex ml-32 gap-12 mt-8 " key={i}>
          <Form.Item name="quantity" label="Quantity">
            <InputNumber
              value={deposit}
              onChange={(value) => handleQuantityChange(index, value)}
              className="ml-4"
            />
          </Form.Item>
          <div className="flex gap-4">
            <Form.Item name="price" label="Price">
              <InputNumber
                value={deposit}
                onChange={(value) => handlePriceChange(index, value)}
              />
            </Form.Item>
            <DeleteOutlined
              className="mt-2 text-blue-500 hover:text-red-500 hover:cursor-pointer"
              onClick={() => handleDeleteClick(index)}
            />
          </div>
        </div>
      );
    }
    return <div>{inputs}</div>;
  };
  const handleQuantityChange = (index, value) => {
    const newPriceLevels = [...priceLevels];
    newPriceLevels[index].quantity = value;
    setPriceLevels(newPriceLevels);
  };

  const handlePriceChange = (index, value) => {
    const newPriceLevels = [...priceLevels];
    newPriceLevels[index].price = value;
    setPriceLevels(newPriceLevels);
  };

  const handleDeleteClick = (index) => {
    const newPriceLevels = [...priceLevels];
    newPriceLevels.splice(index, 1);
    setPriceLevels(newPriceLevels);
  };

  const handleAddClick = () => {
    setPriceLevels([...priceLevels, { quantity: null, price: null }]);
  };
  useEffect(() => {
    if (campaignID > 0) {
      fetchAPI(`http://localhost:8080/campaigns/${campaignID}`, "GET")
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          if (data.code == 200) {
            const campaign = data.data;
            form.setFieldsValue({
              name: campaign.name,
              productName: campaign.productName,
              originPrice: campaign.currentPrice,
              deposit: campaign.deposit,
              startTime: campaign.startTime,
              endTime: campaign.endTime,
              inStock: campaign.inStock,
              priceLevels: campaign.levels,
            });
            console.log(campaign);
            setName(campaign.name);
            setProductName(campaign.productName);
            setOriginPrice(campaign.currentPrice);
            setDeposit(campaign.deposit);
            setStartTime(campaign.startTime);
            setEndTime(campaign.endTime);
            setInStock(campaign.inStock);
            const initialEndTime = moment(
              campaign.endTime,
              "YYYY-MM-DDTHH:mm:ss.SSSZ"
            );
            const initialStartTime = moment(
              campaign.startTime,
              "YYYY-MM-DDTHH:mm:ss.SSSZ"
            );
            setDateRange([initialStartTime, initialEndTime]);
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    fetchAPI(`http://localhost:8080/products/GetItems`, "POST")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          console.log(data);
          setProductList(data.data);
          const ls = data.data.map((item) => ({
            label: item.name,
            value: item.name,
          }));
          setProductOption(ls);
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
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        values={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
        className="mt-16"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your product name!",
              whitespace: true,
            },
          ]}
        >
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="productName"
          label="ProductName"
          rules={[
            {
              required: true,
              message: "Please input your product name!",
              whitespace: true,
            },
          ]}
        >
          <Select
            size="middle"
            value={productName}
            onChange={(value) => {
              setProductName(value);
              const product = productList.filter((item) => item.name == value);
              setProductImage(
                "http://localhost:8080" + product[0].imageUrl.replace(".", "")
              );
              setOriginPrice(product[0].originPrice);
            }}
            style={{
              width: 200,
            }}
            options={productOption}
          />
        </Form.Item>
        <Form.Item name="productImage" label="Product Image">
          <Image width={200} src={productImage} />
        </Form.Item>
        <Form.Item name="originPrice" label="Origin Price">
          <span className="text-orange-500">{originPrice} đ</span>
        </Form.Item>

        <Form.Item name="deposit" label="Deposit">
          <InputNumber
            value={deposit}
            onChange={(value) => {
              setDeposit(value);
            }}
          />
        </Form.Item>

        <Form.Item name="time" label="Time">
          <DatePicker.RangePicker
            value={dateRange}
            onChange={(value) => {
              if (value && value.length === 2) {
                const startDate = value[0].format("YYYY-MM-DD");
                const endDate = value[1].format("YYYY-MM-DD");
                setDateRange(value);
                setStartTime(startDate);
                setEndTime(endDate);
              } else {
                setDateRange([]);
              }
            }}
            format="YYYY-MM-DD"
          />
        </Form.Item>
        <Form.Item name="inStock" label="InStock">
          <InputNumber
            addonBefore={selectBefore}
            addonAfter={selectAfter}
            value={inStock}
            onChange={(value) => {
              setInStock(value);
            }}
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-orange-500 flex items-center jutify-items-center"
            onClick={handleAddClick}
          >
            <PlusCircleOutlined /> Add Price Level
          </Button>
        </Form.Item>

        {/* {renderPriceLevel()} */}
        {priceLevels.map((priceLevel, index) => (
          <div className="flex ml-32 gap-12 mt-8 " key={index}>
            <Form.Item name={`quantity-${index}`} label="Quantity">
              <InputNumber
                value={priceLevel.quantity}
                onChange={(value) => handleQuantityChange(index, value)}
                className="ml-4"
              />
            </Form.Item>
            <div className="flex gap-4">
              <Form.Item name={`price-${index}`} label="Price">
                <InputNumber
                  value={priceLevel.price}
                  onChange={(value) => handlePriceChange(index, value)}
                />
              </Form.Item>
              <DeleteOutlined
                className="mt-2 text-blue-500 hover:text-red-500 hover:cursor-pointer"
                onClick={() => handleDeleteClick(index)}
              />
            </div>
          </div>
        ))}

        <Form.Item {...tailFormItemLayout}></Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-500"
            onClick={handleOnclick}
          >
            Save Or Update
          </Button>
        </Form.Item>
      </Form>
    </HomeLayout>
  );
}
