import HomeLayout from "@/components/HomeLayOut";
import { Button, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import fetchAPI from "@/utils/fetchAPI";

export default function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleOnclick = () => {
    const updatePassword = {
      currentPassword,
      newPassword,
    };
    fetchAPI(`http://localhost:8080/users/updatePass`, "PUT", updatePassword)
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

  return (
    <HomeLayout>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        className="mt-28"
      >
        <Form.Item
          label="Current password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your current password!",
            },
          ]}
        >
          <Input
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newpassword"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
          ]}
        >
          <Input.Password
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["newpassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your new password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newpassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-500"
            onClick={handleOnclick}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </HomeLayout>
  );
}
