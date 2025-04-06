import NavigationText from "~/components/NavigationText/NavigationText";
import PhoneIcon from "~/assets/images/phone.png";
import MailIcon from "~/assets/images/mail.png";
import Input from "~/components/Input/Input";
import Button from "~/components/Button/Button";

const Contact = () => {
  return (
    <section>
      <NavigationText placeTo="Liên hệ" />
      <div className="px-28">
        <div className="py-[60px] flex justify-between">
          <div>
            <h3 className="text-[32px] font-semibold mb-[24px]">
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

          <div className="flex justify-center mb-12 basis-[60%]">
            <iframe
              className="rounded-2xl"
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
          <h3 className="text-[32px] font-semibold mb-[24px]">
            Liên hệ với chúng tôi
          </h3>
          <p className="text-[#555555] font-medium mb-[16px]">
            Email của bạn sẽ không được công khai. Các trường bắt buộc đã đánh
            dấu *
          </p>

          <form>
            <div className="flex items-center basis-[100%] gap-[20px] w-full">
              <Input
                name="name"
                content="Tên của bạn*"
                style="basis-[calc(50%-10px)]"
              />
              <Input
                name="email"
                content="Email*"
                style="basis-[calc(50%-10px)]"
              />
            </div>
            <Input
              name="comment"
              content="Nội dung"
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
