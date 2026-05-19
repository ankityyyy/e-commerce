
import React, { useEffect, useState } from "react";
import Title from "../components/Title.jsx";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import server from "../env.js";

function AdminDashboard() {

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);
  const COLORS = [
  "#60a5fa",
  "#34d399",
  "#fbbf24",
  "#f87171",
  "#a78bfa",
];

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const res = await fetch(`${server}/api/v1/ai/admin/dashboard`
          
        );

        const result = await res.json();

        setData(result);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

    fetchDashboard();

  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex items-center justify-center text-2xl">
        Loading Dashboard...
      </div>
    );
  }

 return (

  <div className="min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white p-[6px]">

    {/* TITLE */}

    <div className="mb-[12px]">

      <div className="inline-flex gap-2 items-center text-center text-[24px] md:text-[28px]">

        <div className="inline-flex gap-2 items-center text-center  text-[35px] md:text-[40px] ">
      <p className="text-blue-100">
        {"Admin"} <span className="text-[#a5faf7]">{"Dashboard"}</span>
      </p>
    </div>
      </div>

    </div>

    {/* TOP STATS */}

    <div className="flex flex-wrap gap-[12px]">

      <div className="bg-[#e9edf7] text-[#1e2d50] rounded-xl w-[205px] h-[100px] p-[10px] flex flex-col justify-between shadow-lg">

        <p className="text-[16px] px-[20px]  font-semibold">
          Today's Orders
        </p>

        <h1 className="text-[24px] font-bold text-center">
          {data?.stats?.todayOrders}
        </h1>

      </div>

      <div className="bg-[#e9edf7] text-[#1e2d50] rounded-xl w-[205px] h-[100px] p-[10px] flex flex-col justify-between shadow-lg">

        <p className="text-[16px] px-[20px] font-semibold">
          Today's Revenue
        </p>

        <h1 className="text-[20px] font-bold text-center">
          ₹ {data?.stats?.todayRevenue}
        </h1>

      </div>

      <div className="bg-[#e9edf7] text-[#1e2d50] rounded-xl w-[205px] h-[100px] p-[10px] flex flex-col justify-between shadow-lg">

        <p className="text-[16px] px-[20px]  font-semibold">
          Total Products
        </p>

        <h1 className="text-[24px] font-bold text-center">
          {data?.stats?.totalProducts}
        </h1>

      </div>

      <div className="bg-[#e9edf7] text-[#1e2d50] rounded-xl w-[205px] h-[100px] p-[10px] flex flex-col justify-between shadow-lg">

        <p className="text-[16px] px-[20px]  font-semibold">
          Total Users
        </p>

        <h1 className="text-[24px] font-bold text-center">
          {data?.stats?.totalUsers}
        </h1>

      </div>

      <div className="bg-[#e9edf7] text-[#1e2d50] rounded-xl w-[205px] h-[100px] p-[10px] flex flex-col justify-between shadow-lg">

        <p className="text-[16px] px-[20px]  font-semibold">
          Total Orders
        </p>

        <h1 className="text-[24px] font-bold text-center">
          {data?.stats?.totalOrders}
        </h1>

      </div>

    </div>

    {/* SALES GRAPH */}

    <div className="mt-[15px]  bg-gradient-to-l from-[#141414] to-[#0c2025]  rounded-xl p-[12px] border border-[#425a8c]">

      <h1 className="text-[18px] font-semibold mb-[10px]">
        Sales Last 7 Days
      </h1>

      <ResponsiveContainer width="100%" height={220}>

        <LineChart data={data?.salesGraph}>

          <XAxis dataKey="day" stroke="#ffffff" />

          <YAxis stroke="#ffffff" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#60a5fa"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

    {/* BOTTOM SECTION */}

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[12px] mt-[15px]">

      {/* PIE CHART */}

      <div className="lg:col-span-2  bg-gradient-to-l from-[#141414] to-[#0c2025]  rounded-xl p-[12px] border border-[#425a8c]">

        <h1 className="text-[18px] font-semibold mb-[10px]">
          Sales by Category
        </h1>

        <ResponsiveContainer width="100%" height={240}>

          <PieChart>

  <Pie
    data={data?.categoryGraph}
    dataKey="value"
    nameKey="name"
    outerRadius={70}
    label={({ name, percent }) =>
      `${name} ${(percent * 100).toFixed(0)}%`
    }
  >

    {data?.categoryGraph?.map((entry, index) => (

      <Cell
        key={index}
        fill={COLORS[index % COLORS.length]}
      />

    ))}

  </Pie>

  <Tooltip />

  <Legend />

</PieChart>

        </ResponsiveContainer>

      </div>

      {/* AI SECTION */}

      <div className="flex flex-col gap-[12px]">

        {/* AI SALES */}

        <div className="bg-[#e9edf7] text-[#1e2d50] rounded-xl p-[12px]">

          <h1 className="text-[18px] font-bold mb-[10px]">
            AI Sales Summary
          </h1>

          <div className="flex flex-col gap-[8px]">

            {data?.aiSalesSummary?.map((item, index) => (

              <div
                key={index}
                className="text-[13px]"
              >
                • {item}
              </div>

            ))}

          </div>

        </div>

        {/* AI PRODUCT */}

        <div className="bg-[#e9edf7] text-[#1e2d50] rounded-xl p-[12px]">

          <h1 className="text-[18px] font-bold mb-[10px]">
            AI Product Insights
          </h1>

          <div className="flex flex-col gap-[8px]">

            {data?.aiProductInsights?.map((item, index) => (

              <div
                key={index}
                className="text-[13px]"
              >
                • {item}
              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  </div>
);
}
export default AdminDashboard;