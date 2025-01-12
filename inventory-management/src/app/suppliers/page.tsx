"use client";
import React, { useState } from "react";

interface Supplier {
  id: number;
  name: string;
  contact: string;
  products: string[];
  rating: number;
}

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 1, name: "ABC Healthcare", contact: "abc@healthcare.com", products: ["Product A", "Product B"], rating: 4.5 },
    { id: 2, name: "XYZ Supplies", contact: "xyz@supply.com", products: ["Product C"], rating: 4.0 },
    { id: 3, name: "MediCare", contact: "medicare@service.com", products: ["Product D", "Product E"], rating: 5.0 },
  ]);

  const [newSupplier, setNewSupplier] = useState<Supplier>({
    id: 0,
    name: "",
    contact: "",
    products: [],
    rating: 0,
  });

  const handleAddSupplier = () => {
    const updatedSuppliers = [
      ...suppliers,
      { ...newSupplier, id: suppliers.length + 1 },
    ];
    setSuppliers(updatedSuppliers);
    setNewSupplier({ id: 0, name: "", contact: "", products: [], rating: 0 }); // Reset the form
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Suppliers Management</h1>

      {/* Add New Supplier */}
      <div className="mb-4">
        <h2 className="text-xl mb-2">Add New Supplier</h2>
        <input
          type="text"
          placeholder="Supplier Name"
          value={newSupplier.name}
          onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
          className="border px-3 py-2 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={newSupplier.contact}
          onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
          className="border px-3 py-2 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Products (comma separated)"
          value={newSupplier.products.join(", ")}
          onChange={(e) => setNewSupplier({ ...newSupplier, products: e.target.value.split(",").map(p => p.trim()) })}
          className="border px-3 py-2 rounded mr-2"
        />
        <input
          type="number"
          placeholder="Rating (0-5)"
          value={newSupplier.rating}
          onChange={(e) => setNewSupplier({ ...newSupplier, rating: parseFloat(e.target.value) })}
          className="border px-3 py-2 rounded mr-2"
        />
        <button
          onClick={handleAddSupplier}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Supplier
        </button>
      </div>

      {/* Supplier Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Supplier ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Contact</th>
            <th className="border px-4 py-2">Products</th>
            <th className="border px-4 py-2">Rating</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length === 0 ? (
            <tr>
              <td colSpan={6} className="border px-4 py-2 text-center">
                No suppliers found.
              </td>
            </tr>
          ) : (
            suppliers.map(supplier => (
              <tr key={supplier.id}>
                <td className="border px-4 py-2">{supplier.id}</td>
                <td className="border px-4 py-2">{supplier.name}</td>
                <td className="border px-4 py-2">{supplier.contact}</td>
                <td className="border px-4 py-2">{supplier.products.join(", ")}</td>
                <td className="border px-4 py-2">{supplier.rating}</td>
                <td className="border px-4 py-2">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button className="text-red-500 hover:underline ml-2">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SuppliersPage;
