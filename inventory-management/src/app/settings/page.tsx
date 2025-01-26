"use client";
import React, { useState } from "react";
import Image from "next/image";
import Profile from "../../assets/profile.png";

const SettingsPage = () => {
  const [profileSettings, setProfileSettings] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState("light");

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileSettings({ ...profileSettings, [e.target.name]: e.target.value });
  };

  return (
    <div className="settings-page container mx-auto p-6 flex flex-row items-start">
      {/* Left side profile image */}
      <div>
      <Image
              src={Profile}
              alt="Profile"
              className="w-48 h-48 rounded-full object-cover border"
            />
      </div>

      {/* Right side details */}
      <div className="w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

        {/* Profile Settings */}
        <section className="mb-8">
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
    </div>
  );
};

export default SettingsPage;
