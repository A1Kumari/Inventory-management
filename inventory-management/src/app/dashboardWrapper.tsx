"use client";

import React from "react";
import StoreProvider from "@/app/redux"; // Ensure you have a default export for StoreProvider
import DashboardLayout from "./dashboardLayout"; // Correct path for dashboard layout

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
