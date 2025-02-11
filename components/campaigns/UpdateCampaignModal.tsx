'use client';

import {
  Campaign,
  CampaignLocations,
  CampaignWithLocation,
  getLocationsByCampaignId,
} from '@/data/campaign';
import {
  Client,
  clientAddress,
  getAllCompanyNamesAndIds,
  getClientAddressesByClientLocationId,
  getClientAddressesById,
} from '@/data/clients';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { capitalizeFirstLetter, handleValidation } from '@/lib/utils';
import { ChevronDown, Calendar as LucideCalendar } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

const UpdateCampaignModal = ({
  campaignData,
  closeUpdateModal,
  handleUpdate,
  updateModalVisibility,
}: {
  campaignData: Campaign | null;
  closeUpdateModal: () => void;
  handleUpdate: (data: CampaignWithLocation, initial_locations: CampaignLocations[]) => void;
  updateModalVisibility: boolean;
}) => {
  const ClientID_Company = getAllCompanyNamesAndIds();
  const [clientID, setClientID] = useState<Client['client_id']>(ClientID_Company[0].client_id);
  const [company_name, setCompanyName] = useState<Client['company_name']>(ClientID_Company[0].company_name);
  const [searchCompanyName, setSearchCompanyName] = useState<string>('');

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().setMonth(new Date().getMonth() + 1)),
  );

  const [isHalal, setIsHalal] = useState(false);
  const [slotStatus, setSlotStatus] = useState<Campaign['slot_status']>('Pending');
  const [status, setStatus] = useState<Campaign['status']>('Pending Result');

  const [chosenClientAddresses, setChosenClientAddresses] = useState<clientAddress[]>([]);
  const [clientAddresses, setClientAddresses] = useState<clientAddress[]>([]);
  const [initialLocations, setInitialLocations] = useState<CampaignLocations[]>([]);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    clearErrors,
    reset,
    trigger,
  } = useForm<CampaignWithLocation>({
    mode: 'onSubmit',
  });

  // Location Handling
  const handleCampaignAddressesInitialization = () => {

    // Set Client ID and Addresses
    setClientID(campaignData?.client_id!);
    setClientAddresses(getClientAddressesById(campaignData?.client_id!) || []);

    // Get client's existing selected locations by campaign_id 
    // (initialLocations did not work because state management is asynchronous, can use UseEffect)
    const locations = getLocationsByCampaignId(campaignData?.campaign_id!);
    setInitialLocations(locations);

    // Get client's existing selected addresses by client_location_id
    const addresses = locations
      .map((loc) => getClientAddressesByClientLocationId(loc.clients_location_id || ''))
      .flat();
    setChosenClientAddresses(addresses);
  };

  const addLocation = (location: clientAddress) => {
    setChosenClientAddresses((prevAddresses) => [...prevAddresses, location]);
  };

  const removeLocation = (location: clientAddress) => {
    setChosenClientAddresses((prevAddresses) =>
      prevAddresses.filter((addr) => addr.clients_location_id !== location.clients_location_id),
    );
  };

  const handleLocationSubmissionFormat = (campaign_id: string) => {
    const formattedCampaignLocations: CampaignLocations[] = chosenClientAddresses
      .filter((address) => address.clients_location_id !== undefined)
      .map((address) => {
        // Get existing location's campaign_location_id.
        const existingLocation = initialLocations.find(
          (loc) => loc.clients_location_id === address.clients_location_id,
        );

        return {
          campaign_location_id: existingLocation ? existingLocation.campaign_location_id : '',
          campaign_id: campaign_id,
          clients_location_id: address.clients_location_id!,
        };
      });

    return formattedCampaignLocations;
  };

  // Validation
  const handleCampaignAddressesValidation = () => {
    if (chosenClientAddresses.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please select at least one address.',
        variant: 'destructive',
        duration: 3000,
      });
      return false;
    }

    return true;
  };

  // Submission
  const onSubmit = async (data: CampaignWithLocation) => {
    // Stop Form Submission when Validation Fails.
    const isValid = handleCampaignAddressesValidation();
    if (!isValid) return;

    // Set Values for remaining fields
    data.client_id = clientID;
    data.start_date = startDate;
    data.end_date = endDate;
    data.isHalal = isHalal;
    data.slot_status = slotStatus;
    data.status = status;
    data.campaign_locations = handleLocationSubmissionFormat(data.campaign_id!);

    handleUpdate(data, initialLocations);
    closeUpdateModal();
    reset();
  };

  // UseEffects
  useEffect(() => {
    clearErrors();
    if (campaignData) {
      reset({
        campaign_id: campaignData?.campaign_id || '',
        client_id: campaignData?.client_id || '',
        campaign_name: campaignData?.campaign_name || '',
        food_offering: campaignData?.food_offering || '',
        key_message: campaignData?.key_message || '',
        total_nano_influencers: campaignData?.total_nano_influencers || 0,
        total_micro_influencers: campaignData?.total_micro_influencers || 0,
        total_photographer: campaignData?.total_photographer || 0,
        total_content_creator: campaignData?.total_content_creator || 0,
        max_pax: campaignData?.max_pax || 0,
        start_date: campaignData?.start_date || new Date(),
        end_date: campaignData?.end_date || new Date(),
        isHalal: campaignData?.isHalal || false,
        slot_status: campaignData?.slot_status || 'Pending',
        status: campaignData?.status || 'Pending Result',
        campaign_locations: getLocationsByCampaignId(campaignData?.campaign_id || ''),
      });
      handleCampaignAddressesInitialization();
      setStartDate(campaignData?.start_date ? new Date(campaignData.start_date) : new Date());
      setEndDate(campaignData?.end_date ? new Date(campaignData.end_date) : new Date());
      setIsHalal(campaignData.isHalal);
      setSlotStatus(campaignData.slot_status);
      setStatus(campaignData.status);
      setCompanyName(campaignData
        ? ClientID_Company.find((client) => client.client_id === campaignData.client_id)
          ?.company_name || ''
        : ClientID_Company[0].company_name);
    } else {
      setClientID(ClientID_Company[0].client_id);
      setClientAddresses(getClientAddressesById(ClientID_Company[0].client_id) || []);
    }
  }, [campaignData, reset, updateModalVisibility]); // Add campaignData as a dependency to trigger useEffect when it changes

  return (
    <>
      <Dialog open={updateModalVisibility}>
        <DialogContent
          className="max-h-[550px] overflow-y-scroll xxxs:max-w-[300px] xxs:max-w-[340px] xs:max-w-[461px] sm:max-w-[556px] md:max-w-[738px] lg:max-w-[962px] xl:max-w-[1170px]"
          onEscapeKeyDown={closeUpdateModal}
          modalTopRightClose={closeUpdateModal}
        >
          <DialogHeader>
            <DialogTitle className='leading-7'>Update New Campaign</DialogTitle>
            <DialogDescription>
              This is a campaign request form, please fill it up and click on the "Submit" button to
              proceed.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 grid items-center gap-4 xxxs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
              {/* Client ID - Company Name */}
              <div className="flex flex-col col-span-2">
                <Label htmlFor="company_name" className="mb-1 text-xs ml-1 text-neutral-500">
                  Company Name
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between border px-3">
                      {capitalizeFirstLetter(company_name)}
                      <ChevronDown className="ml-2 h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full px-2 pt-3 max-h-[220px] overflow-y-scroll" align="start">
                    <Input
                      type="text"
                      placeholder="Search Company Name"
                      className="w-full p-2 border-b border-gray-300 mb-2"
                      value={searchCompanyName}
                      onChange={(e) => setSearchCompanyName(e.target.value)}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    {ClientID_Company.filter((client) =>
                      client.company_name.toLowerCase().includes(searchCompanyName.toLowerCase())
                    ).map((client) => (
                      <DropdownMenuItem
                        key={client.client_id}
                        tabIndex={-1}
                        onClick={() => {
                          setClientID(client.client_id);
                          setClientAddresses(getClientAddressesById(client.client_id)!);
                          if (clientID !== client.client_id) { //if client_id is not the same reset chosenClientAddresses.
                            setChosenClientAddresses([]);
                          }
                          setCompanyName(client.company_name);
                        }}
                        className="cursor-pointer"
                      >
                        {capitalizeFirstLetter(client.company_name)}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Campaign Name */}
              <div className="flex flex-col xxxs:col-span-2 sm:col-span-4">
                <Label htmlFor="campaign_name" className="mb-1 text-xs ml-1 text-neutral-500">
                  Campaign Name
                </Label>
                <Input
                  type="text"
                  placeholder="Campaign Name"
                  className={`${errors.campaign_name ? 'border-red-500' : ''}`}
                  {...register('campaign_name', {
                    required: {
                      value: true,
                      message: 'Campaign Name is required.',
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: 'Campaign Name must contain only alphabets and spaces.',
                    },
                  })}
                />
              </div>

              <div className='xxxs:hidden lg:block lg:col-span-2'></div>

              {/* Start Date */}
              <div className="flex flex-col col-span-2">
                <Label htmlFor="start_date" className="mb-1 text-xs ml-1 text-neutral-500">
                  Start Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center justify-between p-2"
                    >
                      <span>
                        {startDate.toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </span>
                      <LucideCalendar className="ml-1 h-[20px] w-[20px]" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(startDate)}
                      onSelect={(date) => date && setStartDate(date)}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* End Date */}
              <div className="flex flex-col col-span-2">
                <Label htmlFor="end_date" className="mb-1 text-xs ml-1 text-neutral-500">
                  End Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center justify-between p-2"
                    >
                      <span>
                        {endDate.toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </span>
                      <LucideCalendar className="ml-1 h-[20px] w-[20px]" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(endDate)}
                      onSelect={(date) => date && setEndDate(date)}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* IsHalal */}
              <div className="flex flex-col col-span-2">
                <Label htmlFor="ishalal" className="mb-1 text-xs ml-1 text-neutral-500">
                  Halal Status
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between border px-3"
                    >
                      {isHalal ? 'Is Halal' : 'Not Halal'}
                      <ChevronDown className="ml-2 h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full" align="start">
                    {['Is Halal', 'Not Halal'].map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onClick={() => setIsHalal(option === 'Is Halal')}
                        className="cursor-pointer"
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Max Pax */}
              <div className="flex flex-col col-span-2">
                <Label htmlFor="max_pax" className="mb-1 text-xs ml-1 text-neutral-500">
                  Max Pax
                </Label>
                <Input
                  type="text"
                  placeholder="Max Pax"
                  className={`${errors.max_pax ? 'border-red-500' : ''}`}
                  {...register('max_pax', {
                    required: {
                      value: true,
                      message: 'Max Pax is required.',
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Max Pax must contain only numbers.',
                    },
                    min: {
                      value: 1,
                      message: 'Max Pax must be at least 1.',
                    },
                    max: {
                      value: 10,
                      message: 'Max Pax must be at most 10.',
                    },
                  })}
                />
              </div>

              {/* Total Nano Influencers */}
              <div className="flex flex-col col-span-2">
                <Label htmlFor="total_micro_influencers" className="mb-1 text-xs ml-1 text-neutral-500">
                  Total Nano Influencers
                </Label>
                <Input
                  type="text"
                  placeholder="Total Micro Influencers"
                  className={`${errors.total_micro_influencers ? 'border-red-500' : ''}`}
                  {...register('total_micro_influencers', {
                    required: {
                      value: true,
                      message: 'Total Micro Influencers is required.',
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Total Micro Influencers must contain only numbers.',
                    },
                    min: {
                      value: 1,
                      message: 'Total Micro Influencers must be at least 1.',
                    },
                    max: {
                      value: 10,
                      message: 'Total Micro Influencers must be at most 10.',
                    },
                  })}
                />
              </div>

              {/* Total Micro Influencers */}
              <div className="flex flex-col col-span-2">
                <Label htmlFor="total_nano_influencers" className="mb-1 text-xs ml-1 text-neutral-500">
                  Total Micro Influencers
                </Label>
                <Input
                  type="text"
                  placeholder="Total Nano Influencers"
                  className={`${errors.total_nano_influencers ? 'border-red-500' : ''}`}
                  {...register('total_nano_influencers', {
                    required: {
                      value: true,
                      message: 'Total Nano Influencers is required.',
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Total Nano Influencers must contain only numbers.',
                    },
                    min: {
                      value: 1,
                      message: 'Total Nano Influencers must be at least 1.',
                    },
                    max: {
                      value: 10,
                      message: 'Total Nano Influencers must be at most 10.',
                    },
                  })}
                />
              </div>

              {/* Total Content Creator */}
              <div className="flex flex-col col-span-2">
                <Label htmlFor="total_content_creator" className="mb-1 text-xs ml-1 text-neutral-500">
                  Total Content Creator
                </Label>
                <Input
                  type="text"
                  placeholder="Total Content Creator"
                  className={`${errors.total_content_creator ? 'border-red-500' : ''}`}
                  {...register('total_content_creator', {
                    required: {
                      value: true,
                      message: 'Total Content Creator is required.',
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Total Content Creator must contain only numbers.',
                    },
                    min: {
                      value: 1,
                      message: 'Total Content Creator must be at least 1.',
                    },
                    max: {
                      value: 10,
                      message: 'Total Content Creator must be at most 10.',
                    },
                  })}
                />
              </div>

              {/* Total Photographer */}
              <div className="flex flex-col col-span-2">
                <Label htmlFor="total_photographer" className="mb-1 text-xs ml-1 text-neutral-500">
                  Total Photographer
                </Label>
                <Input
                  type="text"
                  placeholder="Total Photographers"
                  className={`${errors.total_photographer ? 'border-red-500' : ''}`}
                  {...register('total_photographer', {
                    required: {
                      value: true,
                      message: 'Total Photographer is required.',
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Total Photographer must contain only numbers.',
                    },
                    min: {
                      value: 1,
                      message: 'Total Photographer must be at least 1.',
                    },
                    max: {
                      value: 10,
                      message: 'Total Photographer must be at most 10.',
                    },
                  })}
                />
              </div>

              {/* Food Offerings */}
              <div className="flex flex-col xxxs:col-span-2 sm:col-span-4 lg:col-span-8">
                <Label htmlFor="food_offering" className="mb-1 text-xs ml-1 text-neutral-500">
                  Food Offerings
                </Label>
                <Textarea
                  placeholder="Food Offerings"
                  className={`min-h-[88px] resize-none ${errors.food_offering ? 'border-red-500' : ''}`}
                  {...register('food_offering', {
                    required: {
                      value: true,
                      message: 'Food Offerings is required.',
                    },
                  })}
                />
              </div>

              {/* Key Messages */}
              <div className="flex flex-col xxxs:col-span-2 sm:col-span-4 lg:col-span-8">
                <Label htmlFor="key_message" className="mb-1 text-xs ml-1">
                  Key Messages
                </Label>
                <Textarea
                  placeholder="Key Messages"
                  className={`min-h-[88px] resize-none ${errors.key_message ? 'border-red-500' : ''}`}
                  {...register('key_message', {
                    required: {
                      value: true,
                      message: 'Key Messages is required.',
                    },
                  })}
                />
              </div>

              {/* Slot Status */}
              <div className="flex flex-col xxxs:col-span-2">
                <Label htmlFor="slot_status" className="mb-1 text-xs ml-1 text-neutral-500">
                  Slot Status
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between border px-3"
                    >
                      {slotStatus}
                      <ChevronDown className="ml-2 h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full" align="start">
                    {['Filled', 'Pending'].map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onClick={() => setSlotStatus(option as typeof slotStatus)}
                        className="cursor-pointer"
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Status */}
              <div className="flex flex-col xxxs:col-span-2">
                <Label htmlFor="status" className="mb-1 text-xs ml-1 text-neutral-500">
                  Status
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between border px-3"
                    >
                      {status}
                      <ChevronDown className="ml-2 h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full" align="start">
                    {['Pending Result', 'Inactive', 'Completed'].map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onClick={() => setStatus(option as typeof status)}
                        className="cursor-pointer"
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Separator className="mb-3 mt-5" />
            <div className="grid items-center gap-4 xxxs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
              <h2 className="text-md xxxs:col-span-2 sm:col-span-4 lg:col-span-8 font-bold">Campaign Applicable Addresses</h2>
              {clientAddresses.map((address) => (
                <div
                  key={address.clients_location_id}
                  className="col-span-2 flex items-center gap-2 rounded-md border p-2 px-3"
                >
                  <Checkbox
                    checked={chosenClientAddresses.some(
                      (addr) => addr.clients_location_id === address.clients_location_id,
                    )}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        addLocation(address);
                      } else {
                        removeLocation(address);
                      }
                    }}
                  />
                  <span className="ml-2 text-wrap text-sm">
                    {`${address.address}, ${address.postcode}, ${address.city}, ${address.state}, ${address.country}`}
                  </span>
                </div>
              ))}
            </div>
            <DialogFooter>
              <div className="mt-4 flex gap-2 xxxs:flex-col-reverse sm:flex-row">
                <Button
                  type="button"
                  onClick={closeUpdateModal}
                  className="flex-shrink-0 transition-all duration-300 hover:bg-red-600 hover:text-white xxxs:bg-red-600 lg:bg-neutral-400"
                >
                  Cancel
                </Button>
                <Button type="submit" onClick={() => handleValidation(trigger, errors)}>
                  Save
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateCampaignModal;
