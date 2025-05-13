import React, { useEffect, useState } from "react";
import {
  fetchVouchers,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} from "../../apis/endpoints";

const AdminVouchers = () => {
  return (
    <div className="lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-medium">
      <h1>Quản lý Voucher</h1>
    </div>
  );
};

export default AdminVouchers;
