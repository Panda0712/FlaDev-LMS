import CompleteImg from "~/assets/images/complete.png";

const OrderComplete = () => {
  return (
    <div className="flex flex-col items-center justify-center py-[90px] px-[28px]">
      <img src={CompleteImg} className="w-[200px] h-[200px]" alt="" />
      <h2 className="text-[32px] font-bold my-4">Hoàn thành đơn hàng</h2>
      <p className="text-[24px] font-semibold">
        Bạn sẽ nhận được email xác nhận sớm
      </p>
    </div>
  );
};

export default OrderComplete;
