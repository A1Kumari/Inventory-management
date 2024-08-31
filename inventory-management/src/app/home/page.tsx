import React from "react";
import { useRouter } from "next/navigation"; // Ensure this is imported correctly
import Link from "next/link"; // Ensure Link is imported from 'next/link'

const HomePage = () => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login"); // Redirect to the login page
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple Navbar */}
      <nav className="w-full p-4 bg-gray-800 text-white flex justify-between items-center">
        <h1 className="text-lg font-bold">My App</h1>
        <button
          onClick={handleLoginRedirect}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Login
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-8">
          {/* Left Content */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
            <p className="mb-6 text-gray-700">
              Our platform provides the best tools to manage your projects
              efficiently. Please log in to access the dashboard and explore
              all the features.
            </p>
            <button
              onClick={handleLoginRedirect}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4 md:mt-0"
            >
              Login
            </button>
          </div>

          {/* Right Image/SVG */}
          <div className="w-full md:w-1/2">
            <img
              src="/path-to-your-image-or-svg.svg"
              alt="Welcome"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
