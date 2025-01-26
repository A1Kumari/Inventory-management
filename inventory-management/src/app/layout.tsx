"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Define public routes
  const publicRoutes = ["/", "/login", "/register"];
  const isPublicRoute = publicRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        {isPublicRoute ? (
          children
        ) : (
          <DashboardWrapper>{children}</DashboardWrapper>
        )}
      </body>
    </html>
  );
}
