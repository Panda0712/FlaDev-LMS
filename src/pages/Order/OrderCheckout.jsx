import { CirclePercent } from "lucide-react";
import { useState } from "react";
import ExampleAvatar from "~/assets/images/example-avatar-2.png";
import Button from "~/components/Button/Button";
import CheckoutDetails from "~/pages/Order/CheckoutDetails/CheckoutDetails";
import CheckoutNote from "~/pages/Order/CheckoutNote/CheckoutNote";
import CheckoutPrice from "~/pages/Order/CheckoutPrice/CheckoutPrice";
import CheckoutRadio from "~/pages/Order/CheckoutRadio/CheckoutRadio";
import { PAYMENT_METHODS } from "~/utils/constants";

const courseInfo = {
  thumbnail:
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZdgcqM3lVd1LrdxnV-0NAsHPJO3hGXhTIIvWDenmqOJJ5Y80A1z_x8tSqcim-ht-21Oum43KXU0QgEGFelh9jZOpJpHwhRvwaJW7Jt5t0yMvGeqlEbcGkYYu7W17gS8XdXr8yjH-U0mOCd3BMOTKncpI9B8i0ZB83gJhzq0spVVqqgtVTmhd71jau/s320-rw/4406786_4821_2.jpg",
  instructor: "John Smilga",
  instructorRole: "Software Engineer",
  instructorDescription:
    "This course is meticulously crafted to provide you with a foundational understanding of the principles, methodologies, and tools that drive exceptional user experiences in the digital landscape.",
  courseName: "MERN Stack Course 2023 - MongoDB, Express, React and NodeJS",
  description:
    "This course is meticulously crafted to provide you with a foundational understanding of the principles, methodologies, and tools that drive exceptional user experiences in the digital landscape.",
  duration: "20.5 hours",
  students: 19387,
  price: 1949000,
  discount: 0,
  courseModule: [
    { title: "Introduction to UX Design", lessons: 5, duration: "1 hour" },
    { title: "Basics of User-Centered Design", lessons: 5, duration: "1 hour" },
    { title: "Elements of User Experience", lessons: 5, duration: "1 hour" },
    { title: "Visual Design Principles", lessons: 5, duration: "1 hour" },
  ],
  reviews: [
    {
      avatar: ExampleAvatar,
      name: "John Doe",
      reviewedAt: "22/3/2024",
      rating: 5,
      content:
        "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    },
    {
      avatar: ExampleAvatar,
      name: "John Doe",
      reviewedAt: "22/3/2024",
      rating: 5,
      content:
        "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    },
    {
      avatar: ExampleAvatar,
      name: "John Doe",
      reviewedAt: "22/3/2024",
      rating: 5,
      content:
        "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    },
  ],
};

const OrderCheckout = () => {
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.CASH);

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

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

          <CheckoutDetails courseInfo={courseInfo} />

          <div className="my-4 w-full h-[48px] rounded-[8px] border border-slate-300 flex items-center gap-2 px-[16px]">
            <CirclePercent size={24} />
            <p className="text-[18px] mt-[1.5px] font-medium">
              Thêm mã giảm giá
            </p>
          </div>

          <CheckoutPrice />

          <Button title="Tiếp tục mua hàng" type="cart" style="mt-5" />
        </div>
      </div>
    </section>
  );
};

export default OrderCheckout;
