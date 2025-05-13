import React, { useEffect, useState } from "react";
import {
  fetchModules,
  createModule,
  updateModule,
  deleteModule,
} from "../../apis/endpoints";

const AdminModules = () => {
  return (
    <div>
      <h1 className="lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-medium">
        Quản lý Module
      </h1>
    </div>
  );
};

export default AdminModules;
