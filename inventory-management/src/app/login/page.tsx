"use client"; // This tells Next.js that this is a Client Component
import styles from "./page.module.css"; // Import the CSS file as a module

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Use Next.js's useRouter instead of useNavigate

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Next.js router

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Ensure fields are filled
      if (!email || !password) {
        setError('Please provide both email and password');
        return;
      }

      // Make the API request to the backend login route
      const res = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
      }, {
        withCredentials: true // Ensure that cookies (like JWT) are sent
      });

      console.log('Login response:', res.data); // Debugging response

      // If login is successful, navigate to the next page (or dashboard)
      if (res.status === 200) {
        router.push('/dashboard'); // Adjust to your route
      }
    } catch (error: any) {
      console.error('Login error:', error); // Debugging error
      // Handle various error responses
      if (error.response) {
        setError(error.response.data.message || 'Invalid email or password');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className={styles['login-container']}>
  <h1>Login</h1>
  {error && <p className={styles['error-message']}>{error}</p>}
  <form onSubmit={handleLogin}>
    <div className={styles['form-group']}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div className={styles['form-group']}>
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <button type="submit" className={styles['btn-login']}>
      Login
    </button>
  </form>
</div>

  );
};

export default LoginPage;
