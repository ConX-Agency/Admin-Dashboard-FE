import AdminRegistrationForm from '@/components/auth/AdminRegistrationForm'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
      <AdminRegistrationForm />
    </ProtectedRoute>
  )
}

export default page