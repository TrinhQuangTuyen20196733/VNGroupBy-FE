import HomeLayout from "@/components/HomeLayOut";
import { InputNumber, Spin, Alert } from "antd";
import QRCode from "qrcode.react";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import fetchAPI from "@/utils/fetchAPI";
export default function Wallet() {
  const [accept, setAccept] = useState(false);
  const [action, setAction] = useState("");
  const [balance, setBalance] = useState(0);
  const [money, setMoney] = useState(0);
  const [payment, setPayment] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [showwithdraw, setShowwithdraw] = useState(false);
  const [showToUp, setShowToUp] = useState(false);
  const handleOnclick = () => {
    if (money > 0) {
      setWithdraw(true);
      setAccept(true);
      if (action == "Withdraw") {
        fetchAPI(`http://localhost:8080/wallet/withdraw`, "POST", money)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.code == 200) {
              setBalance(balance - money);
              setAccept(false);
              setAction("");
              setPayment(false);
              setWithdraw(false);
              setShowwithdraw(true);
            } else {
              alert(data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      alert("Bạn chưa nhập số tiền muốn rút!");
    }
  };
  const handleMoneyChange = (value) => {
    setMoney(value);
  };
  const handleToup = () => {
    setShowwithdraw(false);
    setWithdraw(false);
    setAction("To up");
    setShowToUp(false);
  };
  const handleWithdraw = () => {
    setShowwithdraw(false);
    setWithdraw(false);
    setAction("Withdraw");
    setShowToUp(false);
  };
  const handlePayment = () => {
    if (money > 0) {
      fetchAPI(`http://localhost:8080/wallet/toup`, "POST", money)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.code == 200) {
            setBalance(balance + money);
            setAccept(false);
            setAction("");
            setPayment(false);

            setShowToUp(true);
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Bạn chưa nhập số tiền muốn chuyển!");
    }
  };
  useEffect(() => {
    fetchAPI(`http://localhost:8080/wallet/balance`, "GET")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setBalance(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [payment, withdraw]);

  return (
    <HomeLayout>
      <h2 className="font-semibold pt-8 pb-8">
        Wallet Balance:
        <span className="text-orange-700 ml-8">{balance} đ</span>
      </h2>

      <div className="flex">
        <div className="flex flex-col gap-4">
          <Button
            text
            hover
            height="40px"
            width="200px"
            className=" mt-3 rounded-xl border-orange-400 border-2 text-orange-700 font-semibold "
            onClick={handleToup}
          >
            To up
          </Button>
          <Button
            text
            hover
            height="40px"
            width="200px"
            className=" mt-3 rounded-xl border-orange-400 border-2 text-orange-700 font-semibold"
            onClick={handleWithdraw}
          >
            With draw
          </Button>
        </div>

        {action == "To up" || action == "Withdraw" ? (
          <div className="flex items-center justify-center gap-12 ml-24">
            <InputNumber
              className="mt-4 border-orange-700"
              addonBefore="+"
              addonAfter="đ"
              defaultValue={100000}
              size="large"
              bordered
              value={money}
              onChange={handleMoneyChange}
            />
            <Button
              text
              hover
              height="40px"
              width="100px"
              className=" mt-3 rounded-xl border-orange-400 border-2 text-orange-700 font-semibold"
              onClick={handleOnclick}
            >
              {action}
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {accept && action == "To up" ? (
        <div className="flex  flex-col items-center h-screen mt-32 ">
          <h2 className="font-semibold text-lg mb-8 text-blue-700">
            Vui lòng quét QRCode để thực hiện thanh toán tiền
          </h2>
          <QRCode value="https://www.example.com" size={250} />
          <Button
            text
            hover
            height="40px"
            width="200px"
            className=" mt-3 rounded-xl border-orange-400 border-2 text-orange-700 font-semibold mt-8 "
            onClick={handlePayment}
          >
            Đã thanh toán
          </Button>
        </div>
      ) : (
        <></>
      )}
      {showToUp ? (
        <div className="flex justify-center  h-screen ">
          <Alert
            message="Nạp tiền thành công!"
            description="Tiền đã được cộng vài tài khoản sử dụng của bạn!"
            type="success"
            className="mt-32 w-[50%] h-32 flex justify-center items-center "
          />
        </div>
      ) : (
        <></>
      )}
      {showwithdraw ? (
        <div className="flex justify-center  h-screen ">
          <Alert
            message="Rút tiền thành công!"
            description="Tiền đã được chuyển vào tài khoản của bạn"
            type="success"
            className="mt-32 w-[50%] h-32 flex justify-center items-center "
          />
        </div>
      ) : (
        <></>
      )}
    </HomeLayout>
  );
}
