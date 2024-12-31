"use client"

import { LoginForm } from '@/components/auth/LoginForm'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()

    useEffect(() => {
        // Check if session-token and isLoggedIn exist in localStorage
        const sessionToken = localStorage.getItem('session-token')
        const isLoggedIn = localStorage.getItem('isLoggedIn')

        if (sessionToken && (isLoggedIn == "true")) {
            // Redirect to dashboard if both exist
            router.push('/')
        }
    }, [router])

    return (
        <LoginForm />
    )
}

export default page