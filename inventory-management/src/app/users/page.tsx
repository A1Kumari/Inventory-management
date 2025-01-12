"use client";
import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-10-16",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Editor",
      status: "Inactive",
      lastLogin: "2024-09-25",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Viewer",
      status: "Active",
      lastLogin: "2024-10-15",
    },
  ]);

  const [newUser, setNewUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
    role: "Viewer",
    status: "Active",
    lastLogin: "",
  });

  const handleAddUser = () => {
    const updatedUsers = [
      ...users,
      { ...newUser, id: users.length + 1, lastLogin: "N/A" },
    ];
    setUsers(updatedUsers);
    setNewUser({ id: 0, name: "", email: "", role: "Viewer", status: "Active", lastLogin: "" }); // Reset the form
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Add New User */}
      <div className="mb-4">
        <h2 className="text-xl mb-2">Add New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border px-3 py-2 rounded mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border px-3 py-2 rounded mr-2"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="border px-3 py-2 rounded mr-2"
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
        <select
          value={newUser.status}
          onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
          className="border px-3 py-2 rounded mr-2"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </div>

      {/* Users Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">User ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Last Login</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} className="border px-4 py-2 text-center">
                No users found.
              </td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className={`border px-4 py-2 ${user.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                  {user.status}
                </td>
                <td className="border px-4 py-2">{user.lastLogin}</td>
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

export default UsersPage;
