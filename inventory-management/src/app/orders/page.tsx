"use client";
import React, { useState } from "react";

interface Order {
  id: number;
  customerName: string;
  date: string;
  status: string;
  totalAmount: number;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, customerName: "John Doe", date: "2024-10-01", status: "Shipped", totalAmount: 100 },
    { id: 2, customerName: "Jane Smith", date: "2024-10-05", status: "Pending", totalAmount: 250 },
    { id: 3, customerName: "Bob Johnson", date: "2024-10-10", status: "Delivered", totalAmount: 300 },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders Management</h1>

      {/* Order Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Customer Name</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Total Amount</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={6} className="border px-4 py-2 text-center">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map(order => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.customerName}</td>
                <td className="border px-4 py-2">{order.date}</td>
                <td className="border px-4 py-2">{order.status}</td>
                <td className="border px-4 py-2">${order.totalAmount}</td>
                <td className="border px-4 py-2">
                  <button className="text-blue-500 hover:underline">View</button>
                  <button className="text-red-500 hover:underline ml-2">Cancel</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
