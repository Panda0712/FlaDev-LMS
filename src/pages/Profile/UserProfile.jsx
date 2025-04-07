import { useState } from "react";
import { toast } from "react-toastify";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import { singleFileValidator } from "~/utils/validators";

const UserProfile = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const error = singleFileValidator(event.target?.files[0]);
    if (error) {
      toast.error(error);
      return;
    }

    // handle the preview image for the file input
    const file = event.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }

    // change avatar logic
    // let reqData = new FormData();
    // reqData.append("avatar", event.target?.files[0]);
    // how to console log formData values
    // for (const value of reqData.values()) {
    //   console.log(value);
    // }

    // toast
    //   .promise(dispatch(updateUserAPI(reqData)), {
    //     pending: "Đang cập nhật hình ảnh...",
    //   })
    //   .then((res) => {
    //     if (!res.error) {
    //       toast.success("Cập nhật hình ảnh thành công!!!");
    //     }

    //     event.target.value = "";
    //     setImage(null);
    //   });
  };

  return (
    <form className="flex flex-col gap-[24px] w-full">
      <div className="rounded-[16px] border p-[16px] border-slate-200">
        <div className="flex flex-col mb-4">
          <label htmlFor="name">Họ tên</label>
          <Input name="name" content="Nhập họ tên" style="text-[#94a3b8]" />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="phone">Số điện thoại</label>
          <Input
            name="phone"
            content="Nhập số điện thoại"
            style="text-[#94a3b8]"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="description">Mô tả</label>
          <Input
            name="description"
            content="Nội dung"
            type="textarea"
            style="text-[#94a3b8]"
          />
        </div>
      </div>
      <div className="rounded-[16px] border p-[16px] border-slate-200">
        <div>
          <h3 className="text-[18px] font-semibold mb-4">Hình ảnh</h3>
          <Input
            type="file-secondary"
            image={image}
            handleImageChange={handleImageChange}
          />
          <div className="flex items-end gap-3 mt-5">
            <div className="flex flex-col w-xl">
              <label htmlFor="image" className="text-[18px] font-semibold">
                Thêm / Chỉnh sửa hình ảnh
              </label>
              <Input name="image" content="Tiêu đề" style="text-[#94a3b8]" />
            </div>
            <Button
              title="Tải ảnh"
              style="mb-2 h-[50px] min-w-[141px] font-light rounded-xl border-1"
              type="secondary"
            />
          </div>
          <Button title="Lưu hình ảnh" type="cart" style="mt-4 mb-2" />
        </div>
      </div>
      <div className="rounded-[16px] border p-[16px] border-slate-200">
        <h3 className="text-[18px] font-semibold mb-4">Liên kết</h3>

        <div className="flex flex-col mb-4">
          <label htmlFor="website">Website</label>
          <Input
            name="website"
            content="Đường dẫn website"
            style="text-[#94a3b8]"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="facebook">Facebook</label>
          <Input
            name="facebook"
            content="Link Facebook"
            style="text-[#94a3b8]"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="instagram">Instagram</label>
          <Input
            name="instagram"
            content="Link Instagram"
            style="text-[#94a3b8]"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="twitter">Twitter</label>
          <Input name="twitter" content="Link Twitter" style="text-[#94a3b8]" />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" title="Cập nhật thông tin" type="cart" />
      </div>
    </form>
  );
};

export default UserProfile;
