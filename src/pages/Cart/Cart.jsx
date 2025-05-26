import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchOrders } from "~/apis/endpoints";
import Loading from "~/components/Loading/Loading";
import NavigationText from "~/components/NavigationText/NavigationText";
import useCart from "~/hooks/useCart";
import CartCard from "~/pages/Cart/CartCard/CartCard";
import CartDetails from "~/pages/Cart/CartDetails/CartDetails";

const Cart = () => {
  const [orders, setOrders] = useState([]);

  const { loading, setCarts, carts } = useCart();

  const handleGetOrders = () => {
    fetchOrders()
      .then((res) => {
        setOrders(res || []);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      });
  };

  useEffect(() => {
    handleGetOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <section>
      <NavigationText placeTo="Giỏ hàng" />
      <div className="lg:px-28 md:px-24 sm:px-18 px-12 pt-[32px] pb-[90px] relative">
        <h3 className="lg:text-[32px] md:text-[28px] text-[24px] font-semibold mb-1">
          Giỏ hàng
        </h3>
        <p className="mb-[24px] font-medium text-[#555555]">
          {carts?.length || 0} khóa học trong giỏ hàng
        </p>

        <div className="flex max-lg:flex-wrap justify-between gap-12">
          {carts?.length > 0 ? (
            <div className="flex flex-col gap-5 basis-[calc(70%-24px)] max-[957px]:basis-[100%]">
              {carts.map((cartItem, index) => (
                <CartCard key={index} setCarts={setCarts} cartItem={cartItem} />
              ))}
            </div>
          ) : (
            <h4 className="md:text-[24px] text-[20px] font-medium text-center">
              Chưa có khóa học nào trong giỏ hàng!
            </h4>
          )}

          <CartDetails carts={carts} orders={orders} />
        </div>
      </div>
    </section>
  );
};

export default Cart;
