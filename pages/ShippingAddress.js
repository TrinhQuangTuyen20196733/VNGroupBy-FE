import HomeLayout from "@/components/HomeLayOut";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import fetchAPI from "@/utils/fetchAPI";
export default function ShippingAddress() {
  const { Option } = Select;

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

  const [form] = Form.useForm();

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

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [id, setId] = useState(null);
  const handleOnclick = () => {
    const shippingAddress = {
      name: fullName,
      phoneNumber: phone,
      address,
      isPrivate,
    };
    fetchAPI(`http://localhost:8080/shipping_address`, "POST", shippingAddress)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          console.log(data.data);
          alert("Successfull");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchAPI(`http://localhost:8080/shipping_address/GetMe`, "GET")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          console.log(data.data);
          const shippingAddress = data.data;
          form.setFieldsValue({
            fullName: shippingAddress.name,
            address: shippingAddress.address,
            phone: shippingAddress.phoneNumber,
            isPrivate: shippingAddress.isPrivate,
          });
          setFullName(shippingAddress.name);
          setAddress(shippingAddress.address);
          setPhone(shippingAddress.phoneNumber);
          setIsPrivate(shippingAddress.isPrivate);
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
          name="fullName"
          label="FullName"
          rules={[
            {
              required: true,
              message: "Please input your full name!",
              whitespace: true,
            },
          ]}
        >
          <Input
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          tooltip="Where is your shop address?"
          rules={[
            {
              required: true,
              message: "Please input your shop address!",
              whitespace: true,
            },
          ]}
        >
          <Input
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item name="isPrivate" label="Is Private Address">
          <Select
            style={{
              width: 120,
            }}
            value={isPrivate}
            onChange={(e) => {
              setIsPrivate(e);
            }}
            options={[
              {
                label: "True",
                value: true,
              },
              {
                label: "False",
                value: false,
              },
            ]}
          />
        </Form.Item>

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
