import React from "react";

const Dashboard = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      {/* Add widgets and stats for admin overview here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded shadow p-4">Total Courses</div>
        <div className="bg-white rounded shadow p-4">Total Users</div>
        <div className="bg-white rounded shadow p-4">Pending Orders</div>
        <div className="bg-white rounded shadow p-4">Recent Reviews</div>
      </div>
    </div>
  );
};

export default Dashboard;
