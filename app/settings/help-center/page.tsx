import ProtectedRoute from '@/components/auth/ProtectedRoute'
import React from 'react'

const HelpCenter = () => {
  return (
    <ProtectedRoute>Help Center test</ProtectedRoute>
  )
}

export default HelpCenter