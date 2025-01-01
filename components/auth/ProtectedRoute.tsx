"use client"

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: any) => {
    const { token } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push('/auth/login'); // Redirect to login if not authenticated
        }
    }, [token, router]);

    if (!token) {
        router.push('/auth/login');
    }

    return children;
};

export default ProtectedRoute;
