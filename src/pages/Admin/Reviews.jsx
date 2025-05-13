import React, { useEffect, useState } from "react";
import {
  fetchReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../../apis/endpoints";

const AdminReviews = () => {
  return (
    <div className="lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-medium">
      <h1>Quản lý đánh giá</h1>
    </div>
  );
};

export default AdminReviews;
