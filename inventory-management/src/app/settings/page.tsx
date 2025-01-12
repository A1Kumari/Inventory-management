"use client";
import React, { useState } from "react";

const SettingsPage = () => {
  const [profileSettings, setProfileSettings] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState("light");

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileSettings({ ...profileSettings, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // Code to handle password change
  };

  return (
    <div className="settings-page container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      {/* Profile Settings */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Profile Settings</h2>
        <div className="mt-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={profileSettings.name}
            onChange={handleProfileChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={profileSettings.email}
            onChange={handleProfileChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={profileSettings.phone}
            onChange={handleProfileChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </section>

      {/* Password Change */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Change Password</h2>
        <div className="mt-4">
          <label className="block mb-2">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          onClick={handlePasswordChange}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Change Password
        </button>
      </section>

      {/* Notifications */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <div className="mt-4">
          <label className="block mb-2">Enable Notifications</label>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            className="mr-2"
          />
          {notificationsEnabled ? "On" : "Off"}
        </div>
      </section>

      {/* Theme Selection */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Theme</h2>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </section>
    </div>
  );
};

export default SettingsPage;
