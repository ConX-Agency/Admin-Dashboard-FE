import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const ManageInfluencersBookings = () => {
  return (
    <ProtectedRoute>
      <div className="flex flex-row justify-between flex-wrap xxxs:gap-2">
        <h1 className="text-3xl font-semibold items-center">Manage Influencers' Bookings</h1>
      </div>
      <Separator className="mt-0 mb-3" />
    </ProtectedRoute>
  )
}

export default ManageInfluencersBookings