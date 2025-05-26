import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchUserProfile,
  updateUserProfile,
  uploadUserImage,
} from "~/apis/endpoints";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import Loading from "~/components/Loading/Loading";
import { singleFileValidator } from "~/utils/validators";

const UserProfile = () => {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, getValues } = useForm();

  const currentUser = useSelector((state) => state.auth.user);
  const imageRef = useRef(null);

  const handleImageChange = (event) => {
    const error = singleFileValidator(event.target?.files[0]);
    if (error) {
      toast.error(error);
      return;
    }

    const file = event.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }

    let reqData = new FormData();
    reqData.append("avatar", event.target?.files[0]);
    imageRef.current = reqData;
  };

  const handleUpdateImage = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Vui lòng chọn ảnh trước khi lưu!!!");
      return;
    }

    const formImageData = imageRef.current;
    if (!formImageData) {
      return;
    }

    let imagePath = null;
    if (formImageData) {
      imagePath = await toast.promise(uploadUserImage(formImageData), {
        pending: "Đang lưu hình ảnh...",
        success: "Lưu ảnh thành công!!!",
        error: "Lưu ảnh thất bại!!!",
      });
    }

    const currentImageFormData = getValues("avatar");
    if (imagePath || currentImageFormData) {
      const apiData = {
        avatar: imagePath ? imagePath.secure_url : currentImageFormData,
      };
      toast
        .promise(updateUserProfile(currentUser?.id, apiData), {
          pending: "Đang cập nhật hình ảnh",
        })
        .then((res) => {
          if (!res.error) {
            toast.success("Cập nhật hình ảnh thành công!!!");
            imageRef.current = null;
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error?.message);
        });
    }
  };

  const onSubmit = async (data) => {
    const isDataDifferent =
      user?.fullName === data?.fullName &&
      user?.phone === data?.phone &&
      user?.description === data?.description &&
      !imageRef.current &&
      user?.socialLink?.website === data?.website &&
      user?.socialLink?.facebook === data?.facebook &&
      user?.socialLink?.instagram === data?.instagram &&
      user?.socialLink?.twitter === data?.twitter;

    if (isDataDifferent) return;

    const formImageData = imageRef.current;

    let imagePath = null;
    if (formImageData) {
      imagePath = await toast.promise(uploadUserImage(formImageData), {
        pending: "Đang lưu hình ảnh...",
        success: "Lưu ảnh thành công!!!",
        error: "Lưu ảnh thất bại!!!",
      });
    }

    const currentImageFormData = getValues("avatar");
    const apiData = {
      ...data,
      avatar: imagePath ? imagePath.secure_url : currentImageFormData,
      socialLink: {
        website: data?.website || null,
        facebook: data?.facebook || null,
        instagram: data?.instagram || null,
        twitter: data?.twitter || null,
      },
    };

    toast
      .promise(updateUserProfile(currentUser?.id, apiData), {
        pending: "Đang cập nhật thông tin",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Cập nhật thông tin thành công!!!");
          imageRef.current = null;
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      });
  };

  useEffect(() => {
    if (user) {
      reset({
        fullName: user?.fullName || "",
        phone: user?.phone || "",
        description: user?.description || "",
        avatar: user?.avatar || null,
        website: user?.socialLink?.website || null,
        facebook: user?.socialLink?.facebook || null,
        instagram: user?.socialLink?.instagram || null,
        twitter: user?.socialLink?.twitter || null,
      });
      setImage(user?.avatar || null);
    } else {
      reset({
        fullName: "",
        phone: "",
        description: "",
        avatar: null,
        website: user?.socialLink?.website || null,
        facebook: user?.socialLink?.facebook || null,
        instagram: user?.socialLink?.instagram || null,
        twitter: user?.socialLink?.twitter || null,
      });
      setImage(null);
    }
  }, [user, reset]);

  useEffect(() => {
    setLoading(true);
    fetchUserProfile()
      .then((res) => {
        const userProfiles = res || [];
        const currentUserProfile = userProfiles?.find(
          (user) => user?.id === currentUser?.id
        );
        setUser(currentUserProfile || null);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      })
      .finally(() => setLoading(false));
  }, [currentUser?.id]);

  if (loading) return <Loading />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[24px] w-full"
    >
      <div className="rounded-[16px] border p-[16px] border-slate-200">
        <div className="flex flex-col mb-4">
          <label htmlFor="fullName">Họ tên</label>
          <Input
            name="name"
            content="Nhập họ tên"
            {...register("fullName")}
            style="text-[#94a3b8]"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="phone">Số điện thoại</label>
          <Input
            name="phone"
            {...register("phone")}
            content="Nhập số điện thoại"
            style="text-[#94a3b8]"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="description">Mô tả</label>
          <Input
            name="description"
            {...register("description")}
            content="Nội dung"
            type="textarea"
            style="text-[#94a3b8]"
          />
        </div>
      </div>
      <div className="rounded-[16px] border p-[16px] border-slate-200">
        <div>
          <h3 className="md:text-[18px] text-[16px] font-semibold mb-4">
            Hình ảnh
          </h3>
          <Input
            type="file-secondary"
            image={image}
            handleImageChange={handleImageChange}
          />
          <Button
            onClick={handleUpdateImage}
            title="Lưu hình ảnh"
            type="cart"
            style="mt-4 mb-2"
          />
        </div>
      </div>
      <div className="rounded-[16px] border p-[16px] border-slate-200">
        <h3 className="md:text-[18px] text-[16px] font-semibold mb-4">
          Liên kết
        </h3>

        <div className="flex flex-col mb-4">
          <label htmlFor="website">Website</label>
          <Input
            name="website"
            {...register("website")}
            content="Đường dẫn website"
            style="text-[#94a3b8]"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="facebook">Facebook</label>
          <Input
            name="facebook"
            {...register("facebook")}
            content="Link Facebook"
            style="text-[#94a3b8]"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="instagram">Instagram</label>
          <Input
            name="instagram"
            {...register("instagram")}
            content="Link Instagram"
            style="text-[#94a3b8]"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="twitter">Twitter</label>
          <Input
            name="twitter"
            {...register("twitter")}
            content="Link Twitter"
            style="text-[#94a3b8]"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" title="Cập nhật thông tin" />
      </div>
    </form>
  );
};

export default UserProfile;
