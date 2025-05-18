import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateVoucher } from "~/apis/endpoints";
import CompleteImg from "~/assets/images/complete.png";

const OrderComplete = () => {
  const [expiredTime, setExpiredTime] = useState(15);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setExpiredTime((expiredTime) => {
        if (expiredTime <= 1) {
          clearInterval(interval);
          localStorage.removeItem("order-data");
          navigate("/");
          return 0;
        }

        return expiredTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("order-data"));
    const voucher = JSON.parse(localStorage.getItem("voucher"));
    if (!orderData) navigate("/");
    if (voucher) {
      const updateData = {
        usedCount: voucher.usedCount + 1,
      };
      updateVoucher(voucher?.id, updateData);
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center py-[90px] px-[28px]">
      <img src={CompleteImg} className="w-[200px] h-[200px]" alt="" />
      <h2 className="text-[32px] font-bold my-4">Hoàn thành đơn hàng</h2>
      <p className="text-[24px] font-semibold">
        Hãy truy cập khóa học để tiến hành học nhé !!!
      </p>
      <p className="text-center mt-4">
        Bạn sẽ được điều hướng về trang chủ trong {expiredTime} giây!!!
      </p>
    </div>
  );
};

export default OrderComplete;
