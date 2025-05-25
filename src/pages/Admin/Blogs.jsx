/* eslint-disable react-hooks/exhaustive-deps */
import { Spin } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AdminTable from "~/components/AdminTable/AdminTable";
import DeleteConfirmationModal from "~/components/DeleteConfirmationModal/DeleteConfirmationModal";
import FormModal from "~/components/FormModal/FormModal";
import Input from "~/components/Input/Input";
import InputV2 from "~/components/InputV2/InputV2";
import RichTextEditor from "~/components/RichTextEditor/RichTextEditor";
import useBlogTable from "~/hooks/useBlogTable";
import {
  createBlog,
  deleteBlog,
  fetchBlogs,
  updateBlog,
} from "../../apis/endpoints";

const AdminBlogs = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const {
    openModal,
    editing,
    deleting,
    loading,
    openOptions,
    totalPages,
    currentBookings,
    currentPage,
    image,
    onSubmit,
    paginate,
    toggleOpenModal,
    handleReset,
    handleToggle,
    handleDeleteBlog,
    handleImageChange,
    setImage,
  } = useBlogTable({
    fetchDataFn: fetchBlogs,
    createDataFn: createBlog,
    updateDataFn: updateBlog,
    deleteDataFn: deleteBlog,
    imageKey: "blog-covers",
    currentImageFormData: getValues("coverImage") || null,
    resetFn: reset,
  });

  useEffect(() => {
    if (editing.edit && editing.data) {
      reset({
        title: editing.data.title || "",
        summary: editing.data.summary || "",
        content: editing.data.content || "",
        coverImage: editing.data.coverImage || null,
        tags: editing.data.tags?.map((u) => u).join(", ") || "",
      });

      setImage(editing.data.coverImage || null);
    } else {
      reset({
        title: "",
        summary: "",
        content: "",
        coverImage: null,
        tags: "",
      });

      setImage(null);
    }
  }, [editing, reset]);

  const headerList = [
    {
      label: "Hình ảnh",
      width: "w-[200px]",
    },
    { label: "Tiêu đề", width: "w-[180px]" },
    { label: "Tóm tắt" },
    { label: "Tác giả", width: "w-[120px]" },
    { label: "Tags", width: "w-[180px]" },
    { label: "Ngày tạo" },
    { label: "", width: "w-[100px]" },
  ];

  const tHeadStyle =
    "font-medium border border-gray-200 px-4 py-2 md:text-[18px] sm:text-[16px] text-[14px] break-words whitespace-normal";
  const optionStyle =
    "py-[12px] px-[16px] transition hover:bg-slate-100 cursor-pointer";

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="flex flex-col max-[900px]:overflow-auto min-h-screen">
      <DeleteConfirmationModal
        isOpen={deleting.delete}
        onClose={handleReset}
        onConfirm={handleDeleteBlog}
        title="Xóa bài viết"
        message="Bạn có chắc chắn muốn xóa bài viết không? Sau khi xóa không thể hoàn tác!"
        confirmButtonText="Xóa"
        cancelButtonText="Trở lại"
        modalStyle="w-[450px]"
      />

      <FormModal
        isOpen={openModal && !deleting.delete}
        onClose={handleReset}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        title={editing.edit ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
        submitButtonText={editing.edit ? "Chỉnh sửa" : "Thêm mới"}
        modalStyle="w-[500px]"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="font-medium">
            Tiêu đề
          </label>
          <Input
            name="title"
            content="Nhập tiêu đề bài viết"
            {...register("title", { required: "Vui lòng nhập tiêu đề" })}
            error={errors?.title}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="summary" className="font-medium">
            Tóm tắt
          </label>
          <Input
            name="summary"
            content="Nhập tóm tắt bài viết"
            {...register("summary")}
            error={errors?.summary}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="content" className="font-medium">
            Nội dung
          </label>
          <RichTextEditor
            value={getValues("content")}
            onChange={(value) => {
              reset({
                ...getValues(),
                content: value,
              });
            }}
            placeholder="Nhập nội dung bài viết..."
            error={errors?.content}
          />
          <input
            type="hidden"
            {...register("content", { required: "Vui lòng nhập nội dung" })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tags" className="font-medium">
            Tags (phân cách bằng dấu phẩy)
          </label>
          <Input
            name="tags"
            content="Ví dụ: react, javascript, frontend"
            {...register("tags")}
            error={errors?.tags}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="coverImage" className="font-medium">
            Ảnh bìa
          </label>
          <InputV2
            type="file"
            image={image}
            handleImageChange={handleImageChange}
          />
        </div>
      </FormModal>

      <div className="flex sm:flex-nowrap flex-wrap gap-5 items-center justify-between">
        <h3 className="lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-medium">
          Quản lý bài viết
        </h3>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow text-[14px]"
          onClick={toggleOpenModal}
        >
          Thêm bài viết mới
        </button>
      </div>

      {currentBookings?.length ? (
        <AdminTable
          headers={headerList}
          data={currentBookings}
          renderRow={(blog) => (
            <>
              <td className={`${tHeadStyle}`}>
                <img
                  src={blog?.coverImage}
                  className="object-cover md:w-[200px] md:h-[150px] sm:w-[150px] sm:h-[100px] 
                  w-[120px] h-[80px] mx-auto rounded-sm"
                  alt=""
                />
              </td>
              <td className={tHeadStyle}>{blog?.title}</td>
              <td className={tHeadStyle}>{blog?.summary}</td>
              <td className={tHeadStyle}>{blog?.author}</td>
              <td className={tHeadStyle}>
                {Array.isArray(blog?.tags) ? blog.tags.join(", ") : ""}
              </td>
              <td className={tHeadStyle}>
                {blog?.created_at
                  ? new Date(blog.created_at).toLocaleDateString()
                  : ""}
              </td>
            </>
          )}
          openOptions={openOptions}
          handleToggleOptions={(idx) => handleToggle("options", idx)}
          optionItems={[
            {
              label: "Xem chi tiết",
              onClick: (blog) => navigate(`/admin/blogs/${blog?.id}`),
            },
            {
              label: "Chỉnh sửa",
              onClick: (blog) => handleToggle("edit", blog),
            },
            {
              label: "Xóa bài viết",
              onClick: (blog) => handleToggle("delete", blog?.id),
            },
          ]}
          tHeadStyle={tHeadStyle}
          optionStyle={optionStyle}
          responsiveStyle="max-[900px]:min-w-[1200px]"
        />
      ) : (
        <div className="flex my-12 items-center justify-center">
          <h2>Hiện chưa có bài viết nào!!!</h2>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center my-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded-md border text-[14px] ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border-blue-600"
              }`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
