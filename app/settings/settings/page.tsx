import ProtectedRoute from '@/components/auth/ProtectedRoute'
import React from 'react'

const Settings = () => {
  return (
    <ProtectedRoute>Settings test</ProtectedRoute>
  )
}

export default Settings