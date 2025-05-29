/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCart, updateVoucher } from "~/apis/endpoints";
import CompleteImg from "~/assets/images/complete.png";
import useCart from "~/hooks/useCart";
import { resetCart } from "~/redux/cartSlice";

const OrderComplete = () => {
  const [expiredTime, setExpiredTime] = useState(15);

  const { carts, setCarts } = useCart();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartRedux = useSelector((state) => state.cart.cart);

  const handleDeleteCart = (carts) => {
    const deletePromises = carts.map((cart) => deleteCart(cart?.id));

    toast
      .promise(Promise.all(deletePromises), {
        pending: "",
      })
      .then(() => {
        dispatch(resetCart());
        setCarts([]);
        localStorage.removeItem("is-cart");
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setExpiredTime((expiredTime) => {
        if (expiredTime <= 1) {
          clearInterval(interval);
          localStorage.removeItem("order-data");
          localStorage.removeItem("voucher");
          localStorage.removeItem("is-cart");
          return 0;
        }

        return expiredTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (expiredTime === 0) {
      navigate("/");
    }
  }, [expiredTime, navigate]);

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("order-data"));
    const voucher = JSON.parse(localStorage.getItem("voucher"));

    if (!orderData) navigate("/");
    if (voucher) {
      const updateData = {
        usedCount: voucher.usedCount + 1,
      };
      updateVoucher(voucher?.id, updateData);
      localStorage.removeItem("voucher");
    }
    localStorage.removeItem("order-data");
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isCart = JSON.parse(localStorage.getItem("is-cart"));
      if (!!isCart && (cartRedux.length > 0 || carts?.length > 0)) {
        Promise.all([handleDeleteCart(cartRedux), handleDeleteCart(carts)]);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [cartRedux]);

  return (
    <div
      className="flex flex-col items-center justify-center 
    py-[90px] md:px-[28px] sm:px-[24px] px-[20px]"
    >
      <img src={CompleteImg} className="w-[200px] h-[200px]" alt="" />
      <h2 className="lg:text-[32px] md:text-[28px] text-[24px] font-bold my-4">
        Hoàn thành đơn hàng
      </h2>
      <p className="md:text-[24px] text-[20px] font-semibold">
        Hãy truy cập khóa học để tiến hành học nhé !!!
      </p>
      <p className="text-center mt-4">
        Bạn sẽ được điều hướng về trang chủ trong {expiredTime} giây!!!
      </p>
    </div>
  );
};

export default OrderComplete;
