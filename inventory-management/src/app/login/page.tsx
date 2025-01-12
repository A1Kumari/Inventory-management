"use client";
import styles from "./page.module.css";
import HeroImg1 from "../../assets/heroImg.png";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa"; // Import Font Awesome home icon

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        setError("Please provide both email and password");
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/api/users/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        router.push("/dashboard");
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message || "Invalid email or password");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className={styles["login-page"]}>
      {/* Home Icon */}
      <div className={styles["home-icon-container"]} onClick={() => router.push("/")}>
        <FaHome className={styles["home-icon"]} />
        <span className={styles["home-text"]}>Home</span>
      </div>

      {/* Left Side: Main Content */}
      <div className={styles["content-container"]}>
        <div className={styles["dots-pattern"]}>
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
            <Image
              src={HeroImg1} // Replace with the actual path
              alt="Floating Image"
              width={220}
              height={220}
            />
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className={styles["form-container"]}>
        <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">Log In</h1>
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
          <button type="submit" className={styles["btn-login"]}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
