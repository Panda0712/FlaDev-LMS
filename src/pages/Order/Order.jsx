import { useLocation } from "react-router-dom";
import OrderCheckout from "~/pages/Order/OrderCheckout";
import OrderComplete from "~/pages/Order/OrderComplete";
import OrderHistory from "~/pages/Order/OrderHistory";

const Order = () => {
  const location = useLocation();

  const isCheckout = location.pathname === "/order/checkout";
  const isComplete = location.pathname === "/order/complete";
  const isHistory = location.pathname === "/order/history";

  return (
    <section>
      {isCheckout && <OrderCheckout />}
      {isComplete && <OrderComplete />}
      {isHistory && <OrderHistory />}
    </section>
  );
};

export default Order;
