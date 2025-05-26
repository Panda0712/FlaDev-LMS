const CheckoutNote = () => {
  return (
    <div
      className="border-2 font-medium mt-10 md:text-[18px] 
    text-[16px] max-w-[400px] border-[#152c5b] pt-3 pb-5 px-4 rounded-sm"
    >
      <p>Lưu ý cho trường hợp hủy khóa học:</p>
      <p>
        &#34;Yêu cầu hủy của quý khách sẽ được ghi nhận xử lý và Thời gian quý
        khách sẽ được hoàn tiền theo quy định của ngân hàng phát hành thẻ như
        sau:
      </p>
      <p>
        - Thẻ nội địa/Ví điện tử/Tài khoản ngân hàng: từ 10 - 14 ngày làm việc.
      </p>
      <p>- Thẻ quốc tế: từ 8 - 17 ngày làm việc.</p>
      <p>**Ngày làm việc: Không bao gồm T7, CN, Lễ&#34;</p>
    </div>
  );
};

export default CheckoutNote;
