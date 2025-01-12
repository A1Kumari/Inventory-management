"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HeroImg from "../../assets/heroImg.png";
import HeroImg1 from "../../assets/heroImg1.png"; // Ensure correct image path

const HomePage = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = !!localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus);
  }, []);

  const handleLoginRedirect = () => router.push("/login");
  const handleRegisterRedirect = () => router.push("/register");
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="w-full p-4 bg-gray-100 text-black flex justify-between items-center shadow-md">
        <h1 className="text-xl lg:text-3xl font-bold">
          Invi<span className="text-[#FFA521]">Tree</span>
        </h1>
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={handleLoginRedirect}
                className="btn-primary"
              >
                Login
              </button>
              <button
                onClick={handleRegisterRedirect}
                className="btn-primary"
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="mx-auto px-4 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text Content */}
          <div className="text-left">
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">
              If you are a <span className="text-[#FFA521]">small owner</span>,
              <br />
              this is the <span className="text-[#69C6F5]">platform</span> made for{" "}
              <span className="text-[#3E90FD]">you!</span>
            </h1>
            <p className="text-lg lg:text-xl font-light text-gray-600 mb-6">
              Manage your inventory, track sales, and grow your business with ease
              using <span className="text-[#FFA521] font-medium">InviTree</span>.
            </p>
            {!isLoggedIn && (
              <button onClick={handleLoginRedirect} className="btn-primary">
                Get Started Now
              </button>
            )}
          </div>

          {/* Right Side - Images */}
          <div className="relative flex justify-end items-center">
            {/* Floating Image */}
            <div className="absolute top-[-80px] left-[100px] animate-float">
              <Image
                src={HeroImg1} // Replace with the actual path
                alt="Floating Image"
                width={220}
                height={220}
              />
            </div>
            {/* Main Hero Image */}
            <Image
              src={HeroImg} // Replace with the actual path
              alt="Main Hero Image"
              width={550}
              height={550}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
