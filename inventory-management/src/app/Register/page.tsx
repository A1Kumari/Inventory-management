"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa"; // Import Font Awesome home icon
import styles from "./page.module.css";
import HeroImg1 from "../../assets/heroImg.png";
import Image from "next/image";
import DirectionalComponent from "../(components)/uiComponent";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Updated handleInputChange to support both input and textarea elements
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const { name, email, password, confirmPassword} = formData;

    if (!name || !email || !password || !confirmPassword ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/login");
      } else {
        setErrorMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during registration.");
    }
  };

  return (
    <div className={styles["register-page"]}>
      <div
        className={styles["home-icon-container"]}
        onClick={() => router.push("/")}
      >
        <FaHome className={styles["home-icon"]} />
        <span className={styles["home-text"]}>Home</span>
      </div>
      
      {/* Left Side: Register Form */}
      <div className={styles["form-container"]}>
        <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">Register</h1>
        {errorMessage && <p className={styles["error-message"]}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" className={styles["btn-register"]}>
            Register
          </button><br/>
          <a href="/login" style={{ color: 'blue' }}>Login if you already have an account</a>

        </form>
      </div>


      {/* Left Side: Main Content */}
      <DirectionalComponent direction="right"/>

    </div>
  );
};

export default RegisterPage;
