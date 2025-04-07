import { useLocation } from "react-router-dom";
import OrderCheckout from "~/pages/Order/OrderCheckout";
import OrderComplete from "~/pages/Order/OrderComplete";

const Order = () => {
  const location = useLocation();

  const isCheckout = location.pathname === "/order/checkout";
  const isComplete = location.pathname === "/order/complete";

  return (
    <section>
      {isCheckout && <OrderCheckout />}
      {isComplete && <OrderComplete />}
    </section>
  );
};

export default Order;
