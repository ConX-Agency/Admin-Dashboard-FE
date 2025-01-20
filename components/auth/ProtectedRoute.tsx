'use client';

import { useRouter } from 'next/navigation';
import { useConx } from '@/context/ConxContext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: any) => {
  const { token } = useConx();
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
