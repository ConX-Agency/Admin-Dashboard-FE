"use client"

import { Campaign } from '@/data/campaign';
import { clientAddress } from '@/data/clients';
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';

const PublicRegisterCampaign = () => {

  const router = useRouter();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
    trigger,
    clearErrors,
    reset,
  } = useForm<Campaign>({
    mode: "onSubmit",
    defaultValues: {
      
    },
  });

  useEffect(() => {

  }, [])



  const handleSubmission = async (data: Campaign) => {

  }

  const onSubmit = async (data: Campaign) => {

    const campaign_id = crypto.randomUUID();
    const formattedCampaign = {
      ...data,
      campaign_id,
    };

    handleSubmission(formattedCampaign);
    reset();
  };

  return (
    <div className="flex items-center justify-start flex-col min-h-full h-[100vh - 40px] w-full px-4">
      <div className="text-left w-full mb-4">
        <h1 className="xxxs:text-xl sm:text-2xl md:text-4xl font-bold mb-1">Campaign Request Form</h1>
        <h2 className="xxxs:text-xs sm:text-sm leading-10">
          This is a campaign request form, please fill it up and click on the "Submit" button to proceed.
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input
            type="text"
            placeholder="Company Name"
            className={`xxxs:col-span-2 sm:col-span-4 lg:col-span-2 ${errors.campaign_name ? 'border-red-500' : ''}`}
            {...register("campaign_name", {
                required: { value: true, message: "Company Name is required." }
            })}
        />
      </form>
    </div>
  )
}

export default PublicRegisterCampaign