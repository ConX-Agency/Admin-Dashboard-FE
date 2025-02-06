'use client';

import { Campaign } from '@/data/campaign';
import {
  Client,
  clientAddress,
  getAllCompanyNamesAndIds,
  getClientAddressesById,
} from '@/data/clients';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { capitalizeFirstLetter, handleValidation } from '@/lib/utils';
import { ChevronDown, Calendar as LucideCalendar } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const CampaignDetailsModal = ({
  campaignData,
  closeCampaignDetailsModal,
  campaignDetailsModalVisibility,
}: {
  campaignData: Campaign | null;
  closeCampaignDetailsModal: () => void;
  campaignDetailsModalVisibility: boolean;
}) => {
  const ClientID_Company = getAllCompanyNamesAndIds();
  const [clientID, setClientID] = useState<Client['client_id']>(ClientID_Company[0].client_id);
  const [company_name, setCompanyName] = useState<Client['company_name']>(
    ClientID_Company[0].company_name,
  );
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

  return (
    <>
      <Dialog open={campaignDetailsModalVisibility}>
        <DialogContent
          className="max-h-[550px] overflow-y-scroll xxxs:max-w-[300px] xxs:max-w-[340px] xs:max-w-[461px] sm:max-w-[556px] md:max-w-[738px] lg:max-w-[962px] xl:max-w-[1170px]"
          onEscapeKeyDown={closeCampaignDetailsModal}
          modalTopRightClose={closeCampaignDetailsModal}
        >
          <DialogHeader>
            <DialogTitle className="leading-7">{campaignData?.campaign_name}'s Details</DialogTitle>
            <Separator className="mb-0" />
          </DialogHeader>
          <div className="grid items-center gap-4 xxxs:grid-cols-2 sm:grid-cols-6">
            <div className='grid grid-cols-6 col-span-6 w-full'>
                <div className='bg-blue-500 col-span-1'>
                    test
                </div>
                <div className='bg-white col-span-5'>
                    test
                </div>
                <div className='bg-blue-500 col-span-1'>
                    test
                </div>
                <div className='bg-white col-span-5'>
                    test
                </div>
                <div className='bg-blue-500 col-span-1'>
                    test
                </div>
                <div className='bg-white col-span-5'>
                    test
                </div>
                <div className='bg-blue-500 col-span-1'>
                    test
                </div>
                <div className='bg-white col-span-5'>
                    test
                </div>
            </div>
          </div>
          <DialogFooter>
            <div className="mt-4 flex gap-2 xxxs:flex-col-reverse sm:flex-row">
              <Button
                type="button"
                onClick={closeCampaignDetailsModal}
                className="flex-shrink-0 transition-all duration-300 hover:bg-red-600 hover:text-white xxxs:bg-red-600 lg:bg-neutral-400"
              >
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CampaignDetailsModal;
