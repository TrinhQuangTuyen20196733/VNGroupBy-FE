import HomeLayout from "@/components/HomeLayOut";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import fetchAPI from "@/utils/fetchAPI";
export default function ShopInfo() {
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
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [merchandise, setMerchandise] = useState("");
  const [avatar, setAvatar] = useState("");
  const [id, setId] = useState(null);
  const handleOnclick = () => {
    const shopInfo = {
      id,
      name: shopName,
      address,
      merchandise,
      phoneNumber: phone,
      avatarUrl: avatar,
    };
    console.log(shopInfo);
    fetchAPI(`http://localhost:8080/shops`, "POST", shopInfo)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          alert("Successfully!");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      console.log("Đang load");
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        console.log("đã load xong");
        const formData = new FormData();
        formData.append("image", info.file.originFileObj);
        fetch("http://localhost:8080/upload/image", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              // Nhận URL ảnh từ response (chuỗi String)
              return response.text();
            } else {
              console.log("upload ảnh thất bại");
              throw new Error("Lỗi upload ảnh");
            }
          })
          .then((imageUrl) => {
            console.log("URL ảnh đã upload:", imageUrl);
            setAvatar(imageUrl);
            console.log("upload ảnh thành công");
          })
          .catch((error) => {
            console.error("Lỗi upload:", error);
          });
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  useEffect(() => {
    fetchAPI(`http://localhost:8080/shops/getInfo`, "GET")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          const shop = data.data;
          console.log(shop);

          form.setFieldsValue({
            shopName: shop.name,
            merchandise: shop.merchandise,
            phone: shop.phoneNumber,
            address: shop.address,
          });
          setShopName(shop.name);
          setAddress(shop.address);
          setMerchandise(shop.merchandise);
          setPhone(shop.phoneNumber);
          setId(shop.id);
          setImageUrl(
            "http://localhost:8080" + shop.avatarUrl.replace(".", "")
          );
        } else {
          console.log(ms.data);
        }
      })
      .catch((error) => {});
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
          name="shopName"
          label="ShopName"
          rules={[
            {
              required: true,
              message: "Please input your shop name!",
              whitespace: true,
            },
          ]}
        >
          <Input
            value={shopName}
            onChange={(e) => {
              setShopName(e.target.value);
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
          name="merchandise"
          label="Merchandise"
          tooltip="What is your shop merchandise?"
          rules={[
            {
              required: true,
              message: "Please input your shop merchandise!",
              whitespace: true,
            },
          ]}
        >
          <Input
            value={merchandise}
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
        <Form.Item name="avatar" label="Avatar">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
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
