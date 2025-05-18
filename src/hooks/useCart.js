/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchCart } from "~/apis/endpoints";
import { updateCart } from "~/redux/cartSlice";

const useCart = () => {
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState([]);

  const dispatch = useDispatch();

  const handleGetCarts = () => {
    setLoading(true);
    fetchCart()
      .then((res) => {
        setCarts(res || []);
        dispatch(updateCart(res || []));
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleGetCarts();
  }, []);

  return { loading, carts, setCarts };
};

export default useCart;
