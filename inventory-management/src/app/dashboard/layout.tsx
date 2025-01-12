"use client";

import Navbar from "@/app/(components)/Navbar";
import Sidebar from "@/app/(components)/Sidebar";
import StoreProvider from "@/app/redux";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <div className="flex bg-gray-50 text-gray-900 w-full min-h-screen">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content on the right */}
        <main className="flex flex-col w-full h-full py-7 px-9 bg-gray-50">
          <Navbar />
          {/* Render the child component, in this case, Dashboard page content */}
          {children}
        </main>
      </div>
    </StoreProvider>
  );
}
