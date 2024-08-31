"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HomePage from './home/page';

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
      router.push('/dashboard'); // Redirect to the dashboard if logged in
    }
  }, [router]);

  return (
    <>
      {/* Render HomePage by default, login check will redirect if necessary */}
      <HomePage />
    </>
  );
};

export default ClientWrapper;
