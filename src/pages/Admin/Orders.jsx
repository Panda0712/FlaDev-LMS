import React, { useEffect, useState } from "react";
import {
  fetchOrders,
  // fetchOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../../apis/endpoints";

const AdminOrders = () => {
  return (
    <div>
      <h1 className="lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-medium">
        Quản lý đặt khóa học
      </h1>
    </div>
  );
};

export default AdminOrders;
