import ProtectedRoute from '@/components/auth/ProtectedRoute';
import CampaignDetails from '@/components/campaigns/details/CampaignDetailsContainer';
import React from 'react';

const page = () => {
  return (
    <ProtectedRoute>
      <CampaignDetails />
    </ProtectedRoute>
  )
};

export default page;
