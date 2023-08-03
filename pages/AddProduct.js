import HomeLayout from "@/components/HomeLayOut";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  InputNumber,
  Upload,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import fetchAPI from "@/utils/fetchAPI";
import { useRouter } from "next/router";

export default function AddProduct() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const router = useRouter();
  const { productID } = router.query;
  console.log(productID);
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
    const product = {
      name,
      description,
      originPrice,
      origin,
      price,
      brand,
      category,
      inStock,
      imageUrl: image,
    };
    console.log(product);
    fetchAPI(`http://localhost:8080/products`, "POST", product)
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

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originPrice, setOriginPrice] = useState(100000);
  const [price, setPrice] = useState(100000);
  const [brand, setBrand] = useState("");
  const [origin, setOrigin] = useState("");
  const [inStock, setInStock] = useState(0);
  const [category, setCategory] = useState("");
  const [cateList, setCateList] = useState([]);
  const [image, setImage] = useState();
  useEffect(() => {
    if (productID > 0) {
      fetchAPI(`http://localhost:8080/products/${productID}`, "GET")
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          if (data.code == 200) {
            const product = data.data;
            form.setFieldsValue({
              name: product.name,
              description: product.description,
              originPrice: product.originPrice,
              price: product.price,
              brand: product.brand,
              origin: product.origin,
              inStock: product.origin,
            });
            console.log(product);
            setName(product.name);
            setDescription(product.description);
            setOriginPrice(product.originPrice);
            setPrice(product.price);
            setBrand(product.brand);
            setOrigin(product.origin);
            setInStock(product.inStock);
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

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
            setImage(imageUrl);

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
    fetchAPI(`http://localhost:8080/categorys`, "GET")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          console.log(data);
          const ls = data.data.map((cate) => ({
            label: cate.name,
            value: cate.name,
          }));
          setCateList(ls);
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
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input your product description!",
              whitespace: true,
            },
          ]}
        >
          <TextArea
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item name="originPrice" label="Origin Price">
          <InputNumber
            addonBefore={selectBefore}
            addonAfter={selectAfter}
            value={originPrice}
            onChange={(value) => {
              setOriginPrice(value);
            }}
          />
        </Form.Item>
        <Form.Item name="price" label="Price">
          <InputNumber
            addonBefore={selectBefore}
            addonAfter={selectAfter}
            value={price}
            onChange={(value) => {
              setPrice(value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="brand"
          label="Brand"
          rules={[
            {
              required: true,
              message: "Please input your product brand!",
              whitespace: true,
            },
          ]}
        >
          <Input
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="origin"
          label="Origin"
          rules={[
            {
              required: true,
              message: "Please input your product origin",
              whitespace: true,
            },
          ]}
        >
          <Input
            value={origin}
            onChange={(e) => {
              setOrigin(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[
            {
              required: true,
              message: "Please input your product Category",
              whitespace: true,
            },
          ]}
        >
          <Select
            style={{
              width: 120,
            }}
            value={category}
            onChange={(e) => {
              setCategory(e);
            }}
            options={cateList}
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
        <Form.Item name="Product Image" label="Product Image">
          <Upload
            name="Product Image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="image"
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
