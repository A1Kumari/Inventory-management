"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HomePage from "./home/page"; // Path to Home page
import DashboardWrapper from "./dashboardWrapper"; // Path to DashboardWrapper

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const loginStatus = !!localStorage.getItem("isLoggedIn"); // Check login status
    setIsLoggedIn(loginStatus);

    if (!loginStatus && router.pathname !== "/") {
      // Redirect to home if not logged in and not on home page
      router.push("/");
    } else if (loginStatus && (router.pathname === "/" || router.pathname === "/login")) {
      // Redirect to dashboard if logged in and on home/login page
      router.push("/dashboard");
    }
  }, [router]);

  if (isLoggedIn === null) {
    // Show loading state while checking login status
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    // Render home page if not logged in
    return <HomePage />;
  }

  // Render dashboard wrapper with children if logged in
  return <DashboardWrapper>{children}</DashboardWrapper>;
};

export default ClientWrapper;
