import HomeLayout from "@/components/HomeLayOut";
import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import React, { use, useEffect, useState, useLayoutEffect } from "react";
import fetchAPI from "@/utils/fetchAPI";
const { Option } = Select;
const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};

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
const App = () => {
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
  const [emailValue, setEmailValue] = useState(""); // Khởi tạo state cho giá trị email
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [role, setRole] = useState("");
  const [id, setId] = useState(0);
  const [password, setPassword] = useState("");
  console.log(birthday);
  const handleOnclick = () => {
    const updateAccount = {
      id,
      name,
      email: emailValue,
      phoneNumber: phone,
      gender,
      birthDay: birthday,
      role,
      address,
      password,
    };
    fetchAPI(`http://localhost:8080/users`, "PUT", updateAccount)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          alert("Bạn đã cập nhật thành công tài khoản");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleDateChange = (date, dateString) => {
    // Hàm này sẽ được gọi mỗi khi giá trị ngày thay đổi
    setBirthday(date);
  };
  useLayoutEffect(() => {
    fetchAPI(`http://localhost:8080/users/getInfo`, "GET")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        const user = data.data;
        console.log(user);
        form.setFieldsValue({
          name: user.name,
          email: user.email,
          gender: user.gender,
          phone: user.phoneNumber,
          address: user.address,
        });

        setName(user.name);
        setBirthday(user.birthDay);
        setEmailValue(user.email);
        setGender(user.gender);
        setAddress(user.address);
        setPhone(user.phoneNumber);
        setRole(user.role);
        setId(user.id);
        setPassword(user.password);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  return (
    <HomeLayout>
      <h2 className="font-semibold text-lg mb-8">
        Cập nhật thông tin tài khoản
      </h2>
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
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            values={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your name!",
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
          name="address"
          label="Address"
          tooltip="Where do you live?"
          rules={[
            {
              required: true,
              message: "Please input your address!",
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

        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: "Please select gender!",
            },
          ]}
        >
          <Select
            placeholder="select your gender"
            value={gender}
            onChange={(value) => {
              setGender(value);
            }}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item name="birthday" label="DatePicker" {...config}>
          <DatePicker
            value={birthday}
            onChange={handleDateChange}
            format="YYYY-MM-DD" // Định dạng ngày hiển thị trên DatePicker
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
            Register
          </Button>
        </Form.Item>
      </Form>
    </HomeLayout>
  );
};
export default App;
