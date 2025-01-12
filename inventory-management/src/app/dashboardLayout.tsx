"use client";

import React, { useEffect } from "react";
import Navbar from "@/app/(components)/Navbar";
import Sidebar from "@/app/(components)/Sidebar";
import { useAppSelector } from "@/app/redux"; // Adjust path based on your redux setup

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <div
      >
   
      <main
        
      >
 <Navbar/>
        {children}
      </main>
      <Sidebar/>
    </div>
  );
};

export default DashboardLayout;
