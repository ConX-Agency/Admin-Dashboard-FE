import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ManageClientContent from "@/components/clients/ManageClientContent";
import { Separator } from "@/components/ui/separator";
import React from "react";

const ManageClients = () => {
  return (
    <ProtectedRoute>
      <div className="flex flex-row justify-between flex-wrap xxxs:gap-2">
        <h1 className="text-3xl font-semibold items-center">Manage Clients</h1>
      </div>
      <Separator className="mt-0 mb-0" />
      <ManageClientContent />
    </ProtectedRoute>
  );
};

export default ManageClients;
