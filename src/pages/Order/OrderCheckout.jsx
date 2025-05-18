import { isArray } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { momoPaymentAPI, zaloPaymentAPI } from "~/apis/endpoints";
import Button from "~/components/Button/Button";
import CheckoutDetails from "~/pages/Order/CheckoutDetails/CheckoutDetails";
import CheckoutNote from "~/pages/Order/CheckoutNote/CheckoutNote";
import CheckoutPrice from "~/pages/Order/CheckoutPrice/CheckoutPrice";
import CheckoutRadio from "~/pages/Order/CheckoutRadio/CheckoutRadio";
import { PAYMENT_METHODS } from "~/utils/constants";

const OrderCheckout = () => {
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.MOMO);

  const orderData = JSON.parse(localStorage.getItem("order-data"));
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán!!!");
      return;
    }

    const paymentData = isArray(orderData)
      ? orderData.map((order) => ({ ...order, paymentMethod }))
      : { ...orderData, paymentMethod };
    if (paymentMethod === PAYMENT_METHODS.MOMO) {
      await handleMomoPayment(paymentData);
    } else {
      await handleZaloPayment(paymentData);
    }
  };

  const handleMomoPayment = async (bookingInfoData) => {
    const data = await momoPaymentAPI(bookingInfoData);

    const payUrl = data.data?.[0]?.payUrl || data.data?.payUrl;

    if (payUrl) {
      window.location.href = payUrl;
    } else toast.error("Không thể tạo đường dẫn thanh toán!!!");
  };

  const handleZaloPayment = async (bookingInfoData) => {
    const data = await zaloPaymentAPI(bookingInfoData);

    const order_url = data.data?.[0]?.order_url || data.data?.order_url;

    if (order_url) window.location.href = order_url;
    else toast.error("Không thể tạo đường dẫn thanh toán!!!");
  };

  useEffect(() => {
    if (!orderData) navigate("/");
  }, [navigate, orderData]);

  return (
    <section className="px-28 pt-[32px] pb-[90px]">
      <h3 className="text-[32px] font-semibold mb-5">Thanh toán</h3>

      <div className="relative flex gap-5 justify-between basis-[100%]">
        <div className="flex flex-col basis-[calc(60%-10px)]">
          <h6 className="text-[24px] font-semibold mb-4">
            Phương thức thanh toán:
          </h6>
          <CheckoutRadio
            paymentMethod={paymentMethod}
            handleChange={handleChange}
          />

          <CheckoutNote />
        </div>

        <div className="w-[1px] h-auto bg-slate-300" />

        <div className="flex flex-col basis-[calc(30%-10px)]">
          <h4 className="text-[24px] font-semibold mb-4">Chi tiết đơn hàng</h4>

          <CheckoutDetails courseInfo={orderData} />

          <CheckoutPrice courseInfo={orderData} />

          <Button
            onClick={handlePayment}
            title="Thanh toán"
            type="cart"
            style="mt-5"
          />
        </div>
      </div>
    </section>
  );
};

export default OrderCheckout;
