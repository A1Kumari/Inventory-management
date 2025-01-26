"use client";

import styles from "./page.module.css";
import HeroImg1 from "../../assets/heroImg.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import DirectionalComponent from "../(components)/uiComponent";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // To handle loading state
  const router = useRouter();

  const LOGIN_API_ENDPOINT = "http://localhost:5000/api/users/login";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    if (!email || !password) {
      setError("Please provide both email and password");
      return;
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please provide a valid email address");
      return;
    }
  
    try {
      setIsLoading(true); // Start loading state
  
      const payload = { email, password };
      console.log("Sending payload to backend:", payload); // Log the payload
  
      const res = await axios.post(
        LOGIN_API_ENDPOINT,
        payload,
        { withCredentials: true }
      );
  
      if (res.status === 200) {
        console.log("Login successful:", res.data);
        router.push("/dashboard");
      } else {
        console.error("Unexpected response:", res);
        setError("Unexpected error. Please try again later.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
  
        if (error.response) {
          console.error("Response data:", error.response.data);
          setError(error.response.data.message || "Invalid email or password");
        } else if (error.request) {
          setError("Unable to reach the server. Please try again later.");
        } else {
          setError("An error occurred. Please try again.");
        }
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false); // End loading state
    }
  };
  


  return (
    <div className={styles["login-page"]}>
      {/* Home Icon */}
      <div
        className={styles["home-icon-container"]}
        onClick={() => router.push("/")}
      >
        <FaHome className={styles["home-icon"]} />
        <span className={styles["home-text"]}>Home</span>
      </div>

      {/* Left Side: Main Content */}
      <DirectionalComponent
        direction="left"
      />

      {/* Right Side: Login Form */}
      <div className={styles["form-container"]}>
        <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">
          Log In
        </h1>
        <p className={styles["subtitle"]}>Access your account</p>
        {error && <p className={styles["error-message"]}>{error}</p>}

        <form onSubmit={handleLogin}>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className={styles["btn-login"]}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button><br/>
          <a href="/register" style={{ color: 'blue' }}>Register if not having a account</a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
