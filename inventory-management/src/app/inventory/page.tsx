"use client";
import React, { useState } from "react";

const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([
    { id: 1, name: "Aspirin", category: "Medication", quantity: 50, expiryDate: "2025-12-01" },
    { id: 2, name: "Bandage", category: "Supplies", quantity: 100, expiryDate: "2026-01-15" },
    { id: 3, name: "Stethoscope", category: "Equipment", quantity: 20, expiryDate: "N/A" },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: "",
    expiryDate: "",
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newItem.name || !newItem.category || !newItem.quantity || !newItem.expiryDate) {
      alert("Please fill in all fields.");
      return;
    }

    const newItemData = {
      id: items.length + 1, // Simple id generation
      ...newItem,
      quantity: Number(newItem.quantity),
    };

    setItems([...items, newItemData]);
    setNewItem({ name: "", category: "", quantity: "", expiryDate: "" });
    setIsModalOpen(false); // Close modal after adding
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by item name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border px-3 py-2 rounded"
        />
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Item Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Expiry Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 ? (
            <tr>
              <td colSpan={5} className="border px-4 py-2 text-center">
                No items found.
              </td>
            </tr>
          ) : (
            filteredItems.map(item => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.category}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">{item.expiryDate}</td>
                <td className="border px-4 py-2">
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(item.id)}
                  >
                    edit update Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add New Item
      </button>

      {/* Modal for adding new item */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md" style={{ width: "400px" }}>
            <h2 className="text-xl mb-4">Add New Item</h2>
            <form onSubmit={handleAddItem}>
              <div className="mb-4">
                <label className="block text-gray-700">Item Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  value={newItem.expiryDate}
                  onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-red-500 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
