import { Image, Button } from "antd";
import { useRouter } from "next/router";
export default function ProductItem({ data }) {
  console.log(data);

  const router = useRouter();
  const handleOnclick = () => {
    router.push(
      {
        pathname: "/ProductDetail",
        query: data,
      },
      "/ProductDetail"
    );
  };
  return (
    <div className="flex flex-col gap-1 w-52 border pb-4 ">
      <Image
        className="mb-2 "
        src={"http://localhost:8080" + data?.imageUrl?.replace(".", "")}
      />
      <div className="flex flex-col gap-1 pl-4 ">
        <h4 className="font-semibold ">{data.name}</h4>
        <div className="font-medium ">
          ***** Đã bán {data.soldQuantity}*****
          <span className="border flex-grow"></span>
        </div>
        <span className="font-medium text-green-500 text-sm">
          Giá gốc: đ {data.originPrice}
        </span>
        <span className="font-medium text-yellow-500 mb-4">
          Giá bán: đ {data.price}
        </span>
        <div className="">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-500 w-24 flex justify-items-center items-center"
            onClick={handleOnclick}
          >
            View Detail
          </Button>
        </div>
      </div>
    </div>
  );
}
