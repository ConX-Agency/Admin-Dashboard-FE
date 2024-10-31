import PendingServicesContent from '@/components/campaigns/PendingServicesContent'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const PendingServices = () => {
  return (
    <>
      <div className="flex flex-row justify-between flex-wrap xxxs:gap-2">
        <h1 className="text-3xl font-semibold items-center">Pending Services</h1>
      </div>
      <Separator className="mt-0 mb-3" />
      <PendingServicesContent />
    </>
  )
}

export default PendingServices