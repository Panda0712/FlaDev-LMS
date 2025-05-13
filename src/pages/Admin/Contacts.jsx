import React, { useEffect, useState } from "react";
import {
  fetchContacts,
  createContact,
  deleteContact,
} from "../../apis/endpoints";

const AdminContacts = () => {
  return (
    <div>
      <h1 className="lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-medium">
        Quản lý liên hệ
      </h1>
    </div>
  );
};

export default AdminContacts;
