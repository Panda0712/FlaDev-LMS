import { Spin } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  createNewVoucherAPI,
  deleteVoucherAPI,
  getListVouchersAPI,
  getSearchHotelsAPI,
  updateVoucherAPI,
} from "~/apis";
import AdminTable from "~/components/AdminTable/AdminTable";
import Button from "~/components/Button/Button";
import DeleteConfirmationModal from "~/components/DeleteConfirmationModal/DeleteConfirmationModal";
import FormModal from "~/components/FormModal/FormModal";
import Input from "~/components/Input/Input";
import Pagination from "~/components/Pagination/Pagination";
import useVoucherTable from "~/hooks/useVoucherTable";
import { formatDateV2 } from "~/utils/formatters";
import { FIELD_REQUIRED_MESSAGE } from "~/utils/validators";

const VoucherManagement = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const {
    dataHotels: hotels,
    dataVouchers: vouchers,
    dataListHotelFields: listHotelFields,
    editing,
    loading,
    openModal,
    deleting,
    handleReset,
    currentPage,
    totalPages,
    currentSelectIndex,
    openOptions,
    toggleOpenModal,
    handleToggle,
    handleChangeListHotelFields,
    handlePageChange,
    onDeleting,
    onSubmit,
  } = useVoucherTable({
    setValue,
    reset,
    fetchDataFn: getListVouchersAPI,
    getDataFn: getSearchHotelsAPI,
    createDataFn: createNewVoucherAPI,
    updateDataFn: updateVoucherAPI,
    deleteDataFn: deleteVoucherAPI,
    countValue: getValues("usedCount"),
    dataKey: "vouchers",
    totalKey: "totalVouchers",
  });

  useEffect(() => {
    if (editing.edit && editing.data) {
      reset({
        name: editing.data.name || "",
        discount: editing.data.discount || 0,
        hotelIds: editing.data.hotelIds || null,
        code: editing.data.code || "",
        usageLimit: editing.data.usageLimit || 1,
        usedCount: editing.data.usedCount || 0,
        minOrderValue: editing.data.minOrderValue || 0,
        expiredAt: formatDateV2(editing.data.expiredAt) || null,
      });
    } else {
      reset({
        name: "",
        discount: 0,
        hotelIds: null,
        code: "",
        usageLimit: 1,
        usedCount: 0,
        minOrderValue: 0,
        expiredAt: null,
      });
    }
  }, [editing, reset]);

  const headerList = [
    {
      label: "Tên",
      width: "w-[150px]",
    },
    {
      label: "Khuyến mãi",
    },
    {
      label: "Mã voucher",
    },
    {
      label: "Giới hạn",
    },
    {
      label: "Đã sử dụng",
    },
    {
      label: "Giá tối thiểu",
    },
    {
      label: "Thời hạn",
    },
    {
      label: "",
      width: "w-[100px]",
    },
  ];

  const tHeadStyle =
    "font-medium border border-gray-200 px-4 py-2 md:text-[18px] sm:text-[16px] text-[14px] break-words whitespace-normal";
  const optionStyle =
    "py-[12px] px-[16px] transition hover:bg-slate-100 cursor-pointer";

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="flex flex-col max-[900px]:overflow-auto min-h-screen">
      <DeleteConfirmationModal
        isOpen={openModal}
        onClose={handleReset}
        onConfirm={onDeleting}
        title="Xóa voucher"
        message="Bạn có chắc chắn muốn xóa voucher không? Sau khi xóa không thể hoàn tác!"
        confirmButtonText="Xóa"
        cancelButtonText="Trở lại"
        modalStyle="w-[450px]"
      />

      <FormModal
        isOpen={openModal && !deleting.delete}
        onClose={handleReset}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        title={editing.edit ? "Chỉnh sửa voucher" : "Thêm voucher mới"}
        submitButtonText={editing.edit ? "Chỉnh sửa" : "Thêm voucher"}
        modalStyle="w-[450px]"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-medium">
            Tên voucher
          </label>
          <Input
            name="name"
            content="Nhập tên voucher"
            {...register("name", {
              required: FIELD_REQUIRED_MESSAGE,
              minLength: {
                value: 5,
                message: "Voucher tối thiểu 5 ký tự",
              },
              maxLength: {
                value: 50,
                message: "Voucher tối đa 50 ký tự",
              },
            })}
            error={errors?.name}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="discount" className="font-medium">
            Giảm giá (%)
          </label>
          <Input
            name="discount"
            type="number"
            content="Nhập giảm giá"
            {...register("discount", {
              required: FIELD_REQUIRED_MESSAGE,
              min: {
                value: 0,
                message: "Giảm giá không được âm",
              },
              max: {
                value: 100,
                message: "Giảm giá không được quá 100%",
              },
            })}
            error={errors?.discount}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="hotelIds" className="font-medium">
            Áp dụng cho các phòng
          </label>
          <Input
            name="hotelIds"
            disabled
            content="Danh sách phòng (lựa chọn các phòng tương ứng ở menu bên dưới)"
            type="textarea"
            style="pt-3"
            {...register("hotelIds", {
              required: FIELD_REQUIRED_MESSAGE,
              minLength: {
                value: 24,
                message: "Danh sách tối thiểu 24 ký tự",
              },
              maxLength: {
                value: 350,
                message: "Danh sách tối đa 350 ký tự",
              },
            })}
            error={errors?.hotelIds}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="hotelIds" className="font-medium">
            Lựa chọn phòng
          </label>
          <select
            value={listHotelFields[currentSelectIndex]}
            onChange={handleChangeListHotelFields}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {hotels?.map((hotel, index) => (
              <option key={hotel?._id} index={index} value={hotel?._id}>
                {hotel?.title}{" "}
                {listHotelFields.includes(hotel?._id) ? "✔️" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="code" className="font-medium">
            Mã voucher
          </label>
          <Input
            name="code"
            content="Nhập mã voucher"
            type="textarea"
            style="pt-3"
            {...register("code", {
              required: FIELD_REQUIRED_MESSAGE,
              minLength: {
                value: 5,
                message: "Voucher tối thiểu 5 ký tự",
              },
              maxLength: {
                value: 10,
                message: "Voucher tối đa 10 ký tự",
              },
            })}
            error={errors?.code}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="usageLimit" className="font-medium">
            Giới hạn sử dụng
          </label>
          <Input
            name="usageLimit"
            content="Nhập giới hạn sử dụng"
            type="number"
            {...register("usageLimit", {
              required: FIELD_REQUIRED_MESSAGE,
              min: {
                value: 1,
                message: "Giới hạn sử dụng không được âm",
              },
            })}
            error={errors?.usageLimit}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="minOrderValue" className="font-medium">
            Giá áp dụng tối thiểu
          </label>
          <Input
            name="minOrderValue"
            content="Nhập giá áp dụng tối thiểu"
            type="number"
            {...register("minOrderValue", {
              required: FIELD_REQUIRED_MESSAGE,
              min: {
                value: 0,
                message: "Giá áp dụng tối thiểu không được âm",
              },
            })}
            error={errors?.minOrderValue}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="expiredAt" className="font-medium">
            Thời hạn
          </label>
          <Input
            name="expiredAt"
            content="Nhập thời hạn"
            type="date"
            {...register("expiredAt", {
              required: FIELD_REQUIRED_MESSAGE,
              min: {
                value: new Date(),
                message: "Thời hạn không được quá hiện tại",
              },
            })}
            error={errors?.expiredAt}
          />
        </div>
      </FormModal>

      <div className="flex sm:flex-nowrap flex-wrap gap-5 items-center justify-between">
        <h3 className="lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-medium">
          Quản lý voucher
        </h3>
        <Button
          title="Thêm voucher mới"
          style="md:text-[16px] text-[14px]"
          onClick={toggleOpenModal}
        />
      </div>

      <AdminTable
        headers={headerList}
        data={vouchers}
        renderRow={(voucher) => (
          <>
            <td className={`${tHeadStyle}`}>{voucher?.name}</td>
            <td className={`${tHeadStyle}`}>{voucher?.discount}</td>
            <td className={`${tHeadStyle}`}>{voucher?.code}</td>
            <td className={`${tHeadStyle}`}>{voucher?.usageLimit}</td>
            <td className={`${tHeadStyle}`}>{voucher?.usedCount}</td>
            <td className={`${tHeadStyle}`}>{voucher?.minOrderValue}</td>
            <td className={`${tHeadStyle}`}>
              {formatDateV2(voucher?.expiredAt)}
            </td>
          </>
        )}
        openOptions={openOptions}
        handleToggleOptions={(idx) => handleToggle("options", idx)}
        optionItems={[
          {
            label: "Xem thông tin",
            onClick: () => {},
          },
          {
            label: "Chỉnh sửa",
            onClick: (voucher) => handleToggle("edit", voucher),
          },
          {
            label: "Xóa voucher",
            onClick: (voucher) => handleToggle("delete", voucher?._id),
          },
        ]}
        tHeadStyle={tHeadStyle}
        optionStyle={optionStyle}
        responsiveStyle="max-[900px]:min-w-[1100px]"
      />

      {totalPages > 1 && (
        <Pagination
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default VoucherManagement;
