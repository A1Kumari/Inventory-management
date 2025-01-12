"use client";
import React, { useState } from "react";
import { Line } from "react-chartjs-2"; // Import Line component
import { Chart, registerables } from "chart.js"; // Import Chart and registerables

// Register all necessary components
Chart.register(...registerables); // Registering all components

const InventoryProductsPage = () => {
  // Your existing state and logic
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([
    { id: 1, name: "Paracetamol", category: "Medication", price: 10, stock: 100 },
    { id: 2, name: "Gauze", category: "Supplies", price: 5, stock: 200 },
    { id: 3, name: "Thermometer", category: "Equipment", price: 25, stock: 50 },
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sample data for the graph
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Stock Levels",
        data: [100, 200, 150, 300, 250, 400], // Sample stock data
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory & Products Management</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* Chart Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Inventory Stock Levels</h2>
        <Line data={chartData} />
      </div>

      {/* Product Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Stock</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan={5} className="border px-4 py-2 text-center">
                No products found.
              </td>
            </tr>
          ) : (
            filteredProducts.map(product => (
              <tr key={product.id}>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">{product.stock}</td>
                <td className="border px-4 py-2">
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryProductsPage;
