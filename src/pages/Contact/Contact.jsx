import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createContact } from "~/apis/endpoints";
import MailIcon from "~/assets/images/mail.png";
import PhoneIcon from "~/assets/images/phone.png";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import NavigationText from "~/components/NavigationText/NavigationText";
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PHONE_RULE,
  PHONE_RULE_MESSAGE,
} from "~/utils/validators";

const Contact = () => {
  const user = useSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email,
    },
  });

  const onSubmit = (data) => {
    toast
      .promise(createContact(data), {
        pending: "Đang gửi liên hệ...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Gửi liên hệ thành công!!!");
          reset();
        }
      });
  };

  return (
    <section>
      <NavigationText placeTo="Liên hệ" />
      <div className="lg:px-28 md:px-24 sm:px-18 px-12">
        <div
          className="py-[60px] flex max-md:flex-wrap 
        max-md:gap-14 justify-between"
        >
          <div>
            <h3
              className="lg:text-[32px] md:text-[28px] text-[24px]
             font-semibold mb-[24px]"
            >
              Cần hỗ trợ trực tiếp?
            </h3>
            <p className="text-[#555555] font-medium mb-[16px]">
              Hãy thông qua các kênh liên lạc sau để được hỗ trợ sớm nhất.
            </p>

            <div className="flex items-center gap-5 my-[16px]">
              <div className="w-[56px] h-[56px] bg-[#f5f5f5] flex items-center justify-center rounded-md">
                <img src={PhoneIcon} className="w-[32px] h-[32px]" alt="" />
              </div>
              <div className="flex flex-col justify-between h-[56px]">
                <h4 className="text-[#555555]">Điện thoại</h4>
                <p className="font-semibold">(+84) 369332842</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-[56px] h-[56px] bg-[#f5f5f5] flex items-center justify-center rounded-md">
                <img src={MailIcon} className="w-[32px] h-[32px]" alt="" />
              </div>
              <div className="flex flex-col justify-between h-[56px]">
                <h4 className="text-[#555555]">Email</h4>
                <p className="font-semibold">fladev@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-12 basis-[60%] max-md:basis-[100%]">
            <iframe
              className="rounded-2xl max-md:w-full"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15677.598579955422!2d106.6401792!3d10.780672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1728490781938!5m2!1svi!2s"
              width={"100%"}
              height={450}
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="pb-[90px]">
          <h3
            className="lg:text-[32px] md:text-[28px] text-[24px]
           font-semibold mb-[24px]"
          >
            Liên hệ với chúng tôi
          </h3>
          <p className="text-[#555555] font-medium mb-[16px]">
            Email của bạn sẽ không được công khai. Các trường bắt buộc đã đánh
            dấu *
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className="flex max-sm:flex-wrap 
            items-center basis-[100%] gap-[20px] w-full"
            >
              <Input
                name="name"
                content="Tên của bạn*"
                {...register("name", {
                  required: FIELD_REQUIRED_MESSAGE,
                  minLength: {
                    value: 5,
                    message: "Tên tối thiểu 5 ký tự!",
                  },
                  maxLength: {
                    value: 50,
                    message: "Tên tối đa 50 ký tự!",
                  },
                })}
                error={errors?.name}
                style="basis-[calc(50%-10px)] max-sm:w-full"
              />
              <Input
                name="email"
                type="email"
                content="Email*"
                {...register("email", {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE,
                  },
                })}
                error={errors?.email}
                style="basis-[calc(50%-10px)] max-sm:w-full"
              />
            </div>
            <Input
              name="phone"
              content="Số điện thoại "
              {...register("phone", {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PHONE_RULE,
                  message: PHONE_RULE_MESSAGE,
                },
              })}
              error={errors?.phone}
              style="w-full"
            />
            <Input
              name="message"
              content="Nội dung"
              {...register("message", {
                required: FIELD_REQUIRED_MESSAGE,
                minLength: {
                  value: 10,
                  message: "Nội dung tối thiểu 10 ký tự!",
                },
                maxLength: {
                  value: 200,
                  message: "Nội dung tối đa 200 ký tự!!!",
                },
              })}
              error={errors?.message}
              style="w-full"
              type="textarea"
            />

            <div className="my-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 border-2 border-[#555555]"
              />
              <label
                htmlFor="remember"
                className="text-md text-[#555555] font-medium"
              >
                Ghi nhớ tên, email cho lần tiếp theo
              </label>
            </div>

            <Button
              title="Gửi ý kiến"
              style="w-[170px] font-light py-3 shadow-none mt-3"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
