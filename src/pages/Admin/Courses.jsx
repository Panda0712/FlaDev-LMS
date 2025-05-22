/* eslint-disable react-hooks/exhaustive-deps */
import { Spin, Tooltip } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AdminTable from "~/components/AdminTable/AdminTable";
import DeleteConfirmationModal from "~/components/DeleteConfirmationModal/DeleteConfirmationModal";
import FormModal from "~/components/FormModal/FormModal";
import Input from "~/components/Input/Input";
import InputV2 from "~/components/InputV2/InputV2";
import useCourseTable from "~/hooks/useCourseTable";
import { formatVND } from "~/utils/formatters";
import {
  createCourse,
  deleteCourse,
  fetchCourses,
  updateCourse,
} from "../../apis/endpoints";

const AdminCourses = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const {
    openModal,
    editing,
    deleting,
    loading,
    openOptions,
    totalPages,
    currentCourses,
    currentPage,
    modules,
    lessons,
    video,
    image,
    uniqueCategories,
    setImage,
    handleImageChange,
    handleVideoChange,
    onSubmit,
    paginate,
    toggleOpenModal,
    handleReset,
    handleToggle,
    handleDeleteCourse,
    addModule,
    updateModule,
    removeModule,
    addLesson,
    updateLesson,
    removeLesson,
    setModules,
    setLessons,
  } = useCourseTable({
    fetchDataFn: fetchCourses,
    createDataFn: createCourse,
    updateDataFn: updateCourse,
    deleteDataFn: deleteCourse,
    imageKey: "course-thumbnails",
    videoKey: "course-videos",
    currentImageFormData: getValues("thumbnail") || null,
    resetFn: reset,
  });

  useEffect(() => {
    if (editing.edit && editing.data) {
      reset({
        name: editing.data.name || "",
        thumbnail: editing.data.thumbnail || null,
        instructorRole: editing.data.instructorRole || "",
        instructorDescription: editing.data.instructorDescription || "",
        description: editing.data.description || "",
        category: editing.data.category || "",
        duration: editing.data.duration || 0,
        price: editing.data.price || "",
        discount: editing.data.discount || "",
        courseModules: editing.data.courseModules || [],
      });
      setModules(editing.data.courseModules || []);
      setLessons(
        (editing.data.courseModules || []).reduce((acc, mod, idx) => {
          acc[idx] = mod.lessons || [];
          return acc;
        }, {})
      );
      setImage(editing.data.thumbnail || null);
    } else {
      reset({
        name: "",
        thumbnail: null,
        instructorRole: "",
        instructorDescription: "",
        description: "",
        category: "",
        duration: "",
        price: "",
        discount: 0,
        courseModules: [],
      });
      setModules([]);
      setLessons({});
      setImage(null);
    }
  }, [editing, reset]);

  const headerList = [
    { label: "Ảnh", width: "w-[180px]" },
    { label: "Tên khoá học", width: "w-[180px]" },
    { label: "Mô tả", width: "w-[250px]" },
    { label: "Thời lượng", width: "w-[110px]" },
    { label: "Giá", width: "w-[120px]" },
    { label: "Giảm giá", width: "w-[100px]" },
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

  if (currentCourses.length === 0)
    return (
      <div className="flex items-center justify-center">
        <h2>Hiện chưa có khóa học nào!!!</h2>
      </div>
    );

  return (
    <div className="flex flex-col max-[900px]:overflow-auto min-h-screen">
      <DeleteConfirmationModal
        isOpen={deleting.delete}
        onClose={handleReset}
        onConfirm={handleDeleteCourse}
        title="Xóa khoá học"
        message="Bạn có chắc chắn muốn xóa khoá học không? Sau khi xóa không thể hoàn tác!"
        confirmButtonText="Xóa"
        cancelButtonText="Trở lại"
        modalStyle="w-[450px]"
      />

      <FormModal
        isOpen={openModal && !deleting.delete}
        onClose={handleReset}
        handleSubmit={handleSubmit}
        onSubmit={handleSubmit(onSubmit)}
        title={editing.edit ? "Chỉnh sửa khoá học" : "Thêm khoá học mới"}
        submitButtonText={editing.edit ? "Chỉnh sửa" : "Thêm mới"}
        modalStyle="w-[600px]"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-medium">
            Tên khoá học
          </label>
          <Input
            name="name"
            content="Nhập tên khoá học"
            {...register("name", { required: "Vui lòng nhập tên khoá học" })}
            error={errors?.name}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="thumbnail" className="font-medium">
            Ảnh bìa
          </label>
          <InputV2
            type="file"
            image={image}
            handleImageChange={handleImageChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="font-medium">
            Mô tả
          </label>
          <Input
            name="description"
            content="Nhập mô tả khoá học"
            type="textarea"
            style="pt-3"
            {...register("description")}
            error={errors?.description}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="font-medium">
            Danh mục
          </label>
          <Input
            name="category"
            content="Nhập danh mục khoá học"
            style="pt-3"
            {...register("category")}
            error={errors?.category}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="categoryList" className="font-medium">
            Các danh mục hiện có
          </label>
          <select id="categoryList" className="p-2 border border-slate-300">
            {uniqueCategories?.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="instructorRole" className="font-medium">
            Vị trí giảng viên
          </label>
          <Input
            name="instructorRole"
            content="Nhập vị trí giảng viên"
            type="textarea"
            style="pt-3"
            {...register("instructorRole")}
            error={errors?.instructorRole}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="instructorDescription" className="font-medium">
            Mô tả giảng viên
          </label>
          <Input
            name="instructorDescription"
            content="Nhập mô tả giảng viên"
            type="textarea"
            style="pt-3"
            {...register("instructorDescription")}
            error={errors?.instructorDescription}
          />
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-1 w-1/2">
            <label htmlFor="duration" className="font-medium">
              Thời lượng (giờ)
            </label>
            <Input
              name="duration"
              content="Nhập thời lượng"
              type="number"
              {...register("duration", {
                required: "Vui lòng nhập thời lượng",
              })}
              error={errors?.duration}
            />
          </div>

          <div className="flex flex-col gap-1 w-1/2">
            <label htmlFor="price" className="font-medium">
              Giá (VNĐ)
            </label>
            <Input
              name="price"
              content="Nhập giá khoá học"
              type="number"
              {...register("price", { required: "Vui lòng nhập giá" })}
              error={errors?.price}
            />
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-1 w-1/2">
            <label htmlFor="discount" className="font-medium">
              Giảm giá (%)
            </label>
            <Input
              name="discount"
              content="Nhập phần trăm giảm giá"
              type="number"
              {...register("discount")}
              error={errors?.discount}
            />
          </div>
        </div>
        {/* Modules động */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Danh sách Modules</span>
            <button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
              onClick={() =>
                addModule({ title: "", description: "", duration: "" })
              }
            >
              Thêm Module
            </button>
          </div>
          {modules.length === 0 && (
            <div className="text-gray-500 text-sm">Chưa có module nào</div>
          )}
          {modules.map((mod, idx) => (
            <div key={idx} className="border rounded p-3 mb-2 bg-gray-50">
              <div className="flex flex-col gap-2 mb-2">
                <Input
                  name={`module-title-${idx}`}
                  content="Tên module"
                  value={mod.title}
                  onChange={(e) =>
                    updateModule(idx, { ...mod, title: e.target.value })
                  }
                  error={null}
                />
                <Input
                  name={`module-duration-${idx}`}
                  content="Thời lượng (giờ)"
                  type="number"
                  value={mod.duration}
                  onChange={(e) =>
                    updateModule(idx, { ...mod, duration: e.target.value })
                  }
                  error={null}
                />
                <Input
                  name={`module-desc-${idx}`}
                  content="Mô tả module"
                  type="textarea"
                  value={mod.description}
                  onChange={(e) =>
                    updateModule(idx, { ...mod, description: e.target.value })
                  }
                  error={null}
                />
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white px-2 rounded text-xs h-8 mt-5"
                  onClick={() => removeModule(idx)}
                >
                  Xoá
                </button>
              </div>
              {/* Lessons động cho module này */}
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">Lessons</span>
                  <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-0.5 rounded text-xs"
                    onClick={() => {
                      addLesson(idx, { name: "", video_url: "" });
                    }}
                  >
                    Thêm Lesson
                  </button>
                </div>
                {(lessons[idx] || []).length === 0 && (
                  <div className="text-gray-400 text-xs">
                    Chưa có lesson nào
                  </div>
                )}
                {(lessons[idx] || []).map((lesson, lidx) => {
                  const videoKey = `${idx}-${lidx}`;
                  const currentVideo = video[videoKey] || null;

                  return (
                    <div key={lidx} className="flex flex-col gap-2 mb-1">
                      <Input
                        name={`lesson-name-${idx}-${lidx}`}
                        content="Tên lesson"
                        value={lesson.name}
                        onChange={(e) =>
                          updateLesson(idx, lidx, {
                            ...lesson,
                            name: e.target.value,
                          })
                        }
                        error={null}
                      />
                      <InputV2
                        key={`video-input-${idx}-${lidx}-${!!currentVideo}`}
                        type="video"
                        video={currentVideo || lesson?.video_url || null}
                        handleVideoChange={(event) =>
                          handleVideoChange(event, idx, lidx)
                        }
                        inputId={`video_input_${idx}_${lidx}`}
                      />
                      <button
                        type="button"
                        className="bg-red-400 hover:bg-red-500 text-white px-2 rounded text-xs h-8"
                        onClick={() => removeLesson(idx, lidx)}
                      >
                        Xoá
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </FormModal>

      <div className="flex sm:flex-nowrap flex-wrap gap-5 items-center justify-between">
        <h3 className="lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-medium">
          Quản lý khoá học
        </h3>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow text-[14px]"
          onClick={toggleOpenModal}
        >
          Thêm khoá học mới
        </button>
      </div>

      {currentCourses?.length ? (
        <AdminTable
          headers={headerList}
          data={currentCourses}
          renderRow={(course) => (
            <>
              <td className={`${tHeadStyle}`}>
                <img
                  src={course?.thumbnail}
                  className="object-cover md:w-[200px] md:h-[150px] sm:w-[150px] sm:h-[100px] 
                  w-[120px] h-[80px] mx-auto rounded-sm"
                  alt=""
                />
              </td>
              <td className={tHeadStyle}>{course?.name}</td>
              <td className={`${tHeadStyle}`}>
                <Tooltip title={course?.description} placement="topLeft">
                  <div>
                    {course?.description?.length > 150
                      ? course?.description?.slice(0, 150) + "..."
                      : course?.description}
                  </div>
                </Tooltip>
              </td>
              <td className={tHeadStyle}>{course?.duration}</td>
              <td className={tHeadStyle}>{formatVND(course?.price)}đ</td>
              <td className={tHeadStyle}>{course?.discount}</td>
            </>
          )}
          openOptions={openOptions}
          handleToggleOptions={(idx) => handleToggle("options", idx)}
          optionItems={[
            {
              label: "Chỉnh sửa",
              onClick: (course) => handleToggle("edit", course),
            },
            {
              label: "Xoá khoá học",
              onClick: (course) => handleToggle("delete", course?.id),
            },
          ]}
          tHeadStyle={tHeadStyle}
          optionStyle={optionStyle}
          responsiveStyle="max-[900px]:min-w-[900px]"
        />
      ) : (
        <div className="flex my-12 items-center justify-center">
          <h2>Hiện chưa có khóa học nào!!!</h2>
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

export default AdminCourses;
