"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    
    fetch("/api/orders/all")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const updateStatus = async (
  id: number,
  status: string
) => {
  const res = await fetch(`/api/orders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (res.ok) {
    setOrders((prev: any) =>
      prev.map((order: any) =>
        order.id === id
          ? { ...order, status }
          : order
      )
    );
  }
};

 const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";

    case "CONFIRMED":
      return "bg-blue-100 text-blue-800";

    case "SHIPPED":
      return "bg-purple-100 text-purple-800";

    case "DELIVERED":
      return "bg-green-100 text-green-800";

    case "CANCELLED":
      return "bg-red-100 text-red-800";

    default:
      return "bg-gray-100 text-gray-800";
  }
};

  return (
    <div>
        <div className="mb-6">
      <h1 className=" text-3xl font-bold text-neutral-900">
        Orders
      </h1>
      <p className="text-slate-600">Manage all orders</p>
</div>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full border-collapse">
          <thead className="bg-sky-600 text-white">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b text-center hover:bg-gray-200 text-neutral-900"
              >
                <td className="p-3">{order.id}</td>

                <td className="p-3">{order.fullName}</td>

                <td className="p-3">{order.product.name}</td>

                <td className="p-3">
                  ₹{order.product.price}
                </td>

                <td className="p-3">
                  {order.paymentMethod}
                </td>

                <td className="p-3">
<td className="p-3">
  <div className="flex items-center justify-center gap-3">

   <td className="p-3">
  <select
    value={order.status}
    onChange={(e) => updateStatus(order.id, e.target.value)}
    className={`rounded-full px-4 py-2 text-sm font-semibold cursor-pointer border-0 outline-none ${getStatusColor(
      order.status
    )}`}
  >
    <option value="PENDING">🟡 Pending</option>
    <option value="CONFIRMED">🔵 Confirmed</option>
    <option value="SHIPPED">🟣 Shipped</option>
    <option value="DELIVERED">🟢 Delivered</option>
    <option value="CANCELLED">🔴 Cancelled</option>
  </select>
</td>

  </div>
</td>
</td>

                <td className="p-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}