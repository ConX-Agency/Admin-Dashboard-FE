'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: any) => {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      const ls_token = localStorage.getItem('token');
      const isLoggedIn = localStorage.getItem('isLoggedIn');

      if (!ls_token || !isLoggedIn) {
        router.push('/auth/login');
      }
    }
  }, [token]);

  if (!token) {
    return null; // Optionally, show a loading spinner here
  }

  return children;
};

export default ProtectedRoute;
