import ProtectedRoute from '@/components/auth/ProtectedRoute'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>page</ProtectedRoute>
  )
}

export default page