import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";
import fetchAPI from "@/utils/fetchAPI";
import { Breadcrumb } from "antd";
import CampaignItem from "./CampaignItem";
export default function Product({ cateCode }) {
  const [product, setProduct] = useState([]);
  const [campaign, setCampaign] = useState([]);
  const [isProductVisible, setIsProductVisible] = useState(true);
  const [isCampaignVisible, setIsCampaignVisible] = useState(false);

  // Hàm xử lý sự kiện khi người dùng nhấp vào "Home"
  const handleProductClick = () => {
    setIsProductVisible(true);
    setIsCampaignVisible(false);
  };

  // Hàm xử lý sự kiện khi người dùng nhấp vào "Campaifn"
  const handleCampaignClick = () => {
    setIsProductVisible(false);
    setIsCampaignVisible(true);
  };
  useEffect(() => {
    const apiParameter = {
      limit: 10,
      filter: {
        categoryCode: cateCode,
        orderBy: "soldQuantity",
      },
    };
    console.log(apiParameter);

    fetchAPI(`http://localhost:8080/products/GetItems`, "POST", apiParameter)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.data);
        if (data.code == 200) {
          setProduct(data.data);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const apiParameter = {
      limit: 10,
      filter: {
        categoryCode: cateCode,
        orderBy: "soldQuantity",
      },
    };
    console.log(apiParameter);

    fetchAPI(`http://localhost:8080/campaigns/GetItems`, "POST", apiParameter)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.data);
        if (data.code == 200) {
          setCampaign(data.data);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const render = () => {
    // return campaign.map((campaignItem, index) => (
    //   <CampaignItem key={index} data={campaignItem} />
    // ));
    return (
      <div>
        {/* Hiển thị Breadcrumb */}
        <Breadcrumb
          routes={[
            {
              path: "/product",
              breadcrumbName: "Product",
              onClick: handleProductClick,
            },
            {
              path: "/campaign",
              breadcrumbName: "Campaign",
              onClick: handleCampaignClick,
            },
          ]}
          className="text-base mb-12"
        />
        <div className="flex gap-8">
          {isProductVisible &&
            product.map((productItem, index) => (
              <ProductItem key={index} data={productItem} />
            ))}
          {isCampaignVisible &&
            campaign.map((campaignItem, index) => (
              <CampaignItem key={index} data={campaignItem} />
            ))}
        </div>
      </div>
    );
  };
  return <div>{render()}</div>;
}
