"use client"

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: any) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!token || !isLoggedIn) {
        // if (!user) {
            router.push('/auth/login'); // Redirect to login if not authenticated
        }
    }, [user]);

    if (!user) {
        return null; // Optionally, show a loading spinner here
    }

    return children;
};

export default ProtectedRoute;
