import Loading from "~/components/Loading/Loading";
import NavigationText from "~/components/NavigationText/NavigationText";
import useCart from "~/hooks/useCart";
import CartCard from "~/pages/Cart/CartCard/CartCard";
import CartDetails from "~/pages/Cart/CartDetails/CartDetails";

const Cart = () => {
  const { loading, setCarts, carts } = useCart();

  if (loading) return <Loading />;

  return (
    <section>
      <NavigationText placeTo="Giỏ hàng" />
      <div className="px-28 pt-[32px] pb-[90px] relative">
        <h3 className="text-[32px] font-semibold mb-1">Giỏ hàng</h3>
        <p className="mb-[24px] font-medium text-[#555555]">
          {carts?.length || 0} khóa học trong giỏ hàng
        </p>

        <div className="flex justify-between gap-12">
          {carts?.length > 0 ? (
            <div className="flex flex-col gap-5 basis-[calc(70%-24px)]">
              {carts.map((cartItem, index) => (
                <CartCard key={index} setCarts={setCarts} cartItem={cartItem} />
              ))}
            </div>
          ) : (
            <h4 className="text-[24px] font-medium text-center">
              Chưa có khóa học nào trong giỏ hàng!
            </h4>
          )}

          <CartDetails carts={carts} />
        </div>
      </div>
    </section>
  );
};

export default Cart;
