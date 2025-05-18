import { Spin } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center my-24 justify-center">
      <Spin size="large" />
    </div>
  );
};

export default Loading;
