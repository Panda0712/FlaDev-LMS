import { PAYMENT_METHODS } from "~/utils/constants";

const CheckoutRadio = ({ paymentMethod, handleChange }) => {
  return (
    <div className="flex flex-col gap-3 mt-4 mb-5">
      <div className="flex items-center gap-2">
        <input
          type="radio"
          name="payment"
          value={PAYMENT_METHODS.MOMO}
          checked={paymentMethod === PAYMENT_METHODS.MOMO}
          onChange={handleChange}
        />
        <span className="text-[18px] font-medium">Ví Momo</span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="radio"
          name="payment"
          value={PAYMENT_METHODS.ZALOPAY}
          checked={paymentMethod === PAYMENT_METHODS.ZALOPAY}
          onChange={handleChange}
        />
        <span className="text-[18px] font-medium">Ví ZaloPay</span>
      </div>
    </div>
  );
};

export default CheckoutRadio;
