'use client';

import Image from 'next/image';
import {
  Campaign,
  campaignInfluencerBookingStatus,
  CampaignWithInfluencer,
  getInfluencerCampaignsByCampaignId,
  InfluencerCampaign,
} from '@/data/campaign';
import {
  Client,
  clientAddress,
  getAllCompanyNamesAndIds,
  getClientAddressesById,
  getCompanyNameById,
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
import { ActionButton, Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  capitalizeFirstLetter,
  formatFollowerCount,
  formatInfluencerCategory,
  handleValidation,
} from '@/lib/utils';
import { ChevronDown, Calendar as LucideCalendar } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  IconCalendarCancel,
  IconCheck,
  IconClockHour2,
  IconClockHour2Filled,
  IconLoader,
  IconWorldOff,
} from '@tabler/icons-react';
import {
  getAllInfluencersWithPlatforms,
  getTotalFollowerCountByInfluencerId,
  InfluencerWithPlatforms,
} from '@/data/influencer';

const CampaignInfluencersModal = ({
  campaignData,
  closeCampaignInfluencersModal,
  campaignInfluencersModalVisibility,
}: {
  campaignData: Campaign | null;
  closeCampaignInfluencersModal: () => void;
  campaignInfluencersModalVisibility: boolean;
}) => {
  const [influencerList, setInfluencerList] = useState<InfluencerWithPlatforms[]>();
  const [influencerCategory, setInfluencerCategory] = useState<string>('All');
  const [campaignInfluencersData, setCampaignInfluencersData] =
    useState<CampaignWithInfluencer[]>();
  const [bookingAttendance, setBookingAttendance] = useState<campaignInfluencerBookingStatus>('Attended');
  const [initialCampaignInfluencers, setInitialCampaignInfluencers] =
    useState<CampaignWithInfluencer[]>();
  const [newCampaignInfluencers, setNewCampaignInfluencers] = useState<CampaignWithInfluencer[]>();

  useEffect(() => {
    setInfluencerList(getAllInfluencersWithPlatforms());
    setCampaignInfluencersData(getInfluencerCampaignsByCampaignId(campaignData?.campaign_id!));
    // Need to check for bookingattendance (No Slot / Pending Attendance / Attended).
  }, [campaignData]);

  useEffect(() => {
    console.log(campaignInfluencersData);
    setInitialCampaignInfluencers(campaignInfluencersData);
    setNewCampaignInfluencers(campaignInfluencersData);
  }, [campaignInfluencersData, influencerList]);

  const filterInfluencerListByType = (category: string) => {
    setInfluencerList(influencerList?.filter((influencer) => influencer.category === category));
  }

  // const addInfluencer = (influencer: InfluencerCampaign) => {
  //   setNewCampaignInfluencers((prev = []) => {
  //     if (!prev.some((item) => item.influencer_id === influencer.influencer_id)) {
  //       return [...prev, influencer];
  //     }
  //     return prev;
  //   });
  // };

  // const removeInfluencer = (influencer: InfluencerCampaign) => {
  //   setNewCampaignInfluencers((prev = []) => prev.filter((item) => item.influencer_id !== influencer.influencer_id));
  // };

  return (
    <>
      <Dialog open={campaignInfluencersModalVisibility}>
        <DialogContent
          className="max-h-[550px] overflow-y-scroll xxxs:max-w-[300px] xxs:max-w-[340px] xs:max-w-[461px] sm:max-w-[556px] md:max-w-[738px] lg:max-w-[962px] xl:max-w-[1170px]"
          onEscapeKeyDown={closeCampaignInfluencersModal}
          modalTopRightClose={closeCampaignInfluencersModal}
        >
          <DialogHeader>
            <DialogTitle className="leading-7">
              {campaignData?.campaign_name}'s Participating Influencers
            </DialogTitle>
            <Separator className="mb-0" />
          </DialogHeader>
          <div className='flex flex-row gap-2'>
            <Button>All</Button>
            <Button>Nano</Button>
            <Button>Micro</Button>
            <Button>Macro</Button>
          </div>
          <div className="grid w-full grid-cols-6 gap-4">
            {influencerList
              ?.slice()
              .sort((a, b) => {
                const aIsInCampaign = campaignInfluencersData?.some(
                  (campaignInfluencer) => campaignInfluencer.influencer_id === a.influencer_id,
                );
                const bIsInCampaign = campaignInfluencersData?.some(
                  (campaignInfluencer) => campaignInfluencer.influencer_id === b.influencer_id,
                );
                return (bIsInCampaign ? 1 : 0) - (aIsInCampaign ? 1 : 0);
              })
              .map((influencer) => {
                const influencerCampaign = campaignInfluencersData?.find(
                  (campaignInfluencer) =>
                    campaignInfluencer.influencer_id === influencer.influencer_id,
                );
                return (
                  <div
                    className="flex flex-row flex-wrap items-center justify-between rounded-md bg-neutral-100 p-4 dark:bg-neutral-900 xxxs:col-span-6 md:col-span-3"
                    key={influencer.influencer_id}
                  >
                    {/* Influencer Details */}
                    <div className="flex w-full flex-col">
                      <div className="flex flex-row justify-between">
                        <div className="mr-4 flex flex-row items-center">
                          <p className="xxxs:text-md font-[700] md:text-xl">
                            {influencer.full_name}
                          </p>
                          <div className="ml-2 h-max w-max rounded-full bg-neutral-700 px-2 py-[0.5] text-xs">
                            <span className="text-neutral-100">
                              {formatInfluencerCategory(
                                getTotalFollowerCountByInfluencerId(influencer.influencer_id),
                              )}
                            </span>
                          </div>
                        </div>
                        {/* Adding & Removing Influencer from Campaign */}
                        {influencerCampaign ? (
                          <ActionButton
                            label="delete"
                            icon="trash"
                            onClick={() => console.log("removing" + influencer.influencer_id)}
                            type="button"
                          />
                        ) : (
                          <ActionButton
                            label="add"
                            icon="plus"
                            onClick={() => console.log("adding" + influencer.influencer_id)}
                            type="button"
                          />
                        )}
                      </div>
                      {/* Platforms */}
                      <div className="ml-1 mt-1 flex flex-row items-center gap-2">
                        {influencer.platforms.map((platform) => (
                          <a
                            href={platform.social_media_url}
                            className="group"
                            key={platform.platform_name}
                          >
                            <Image
                              src={`/images/logo/${platform.platform_name}.svg`}
                              width={40}
                              height={40}
                              alt="platform-icon.svg"
                              className={`h-[25px] w-[25px] opacity-70 transition-all duration-300 group-hover:opacity-100 ${platform.platform_name === 'RED' ? 'rounded-[5px] bg-white' : ''}`}
                            />
                          </a>
                        ))}
                      </div>
                      <Separator className="my-3" />
                      {/* Booking Attendance & Task Completed */}
                      {influencerCampaign ? (
                        <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
                          <StatusBadge
                            icon={getBookingIcon(bookingAttendance)}
                            label="Booking Attendance"
                          />
                          <StatusBadge
                            icon={
                              influencerCampaign.is_completed ? (
                                <IconCheck className="text-neutral-950 dark:text-neutral-100 h-5 w-5 flex-shrink-0" />
                              ) : (
                                <IconClockHour2Filled className="text-neutral-950 dark:text-neutral-100 h-5 w-5 flex-shrink-0" />
                              )
                            }
                            label="Social Media Postings"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
                          <StatusBadge
                            icon={<IconWorldOff className="text-neutral-950 dark:text-neutral-100 h-5 w-5 flex-shrink-0" />}
                            label="Not Part of the Campaign yet."
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const getBookingIcon = (status: campaignInfluencerBookingStatus) => {
  const icons = {
    'No Slot': <IconCalendarCancel className="text-neutral-950 dark:text-neutral-100 h-5 w-5 flex-shrink-0" />,
    'Pending Attendance': <IconClockHour2Filled className="text-neutral-950 dark:text-neutral-100 h-5 w-5 flex-shrink-0" />,
    'Attended': <IconCheck className="text-neutral-950 dark:text-neutral-100 h-5 w-5 flex-shrink-0" />,
  };
  return icons[status] || null;
};

const StatusBadge = ({ icon, label }: any) => (
  <div className="flex flex-row items-center">
    <div className="rounded-full bg-neutral-300 p-1 dark:bg-neutral-950">{icon}</div>
    <span className="md:text-md ml-2 xxxs:text-sm">{label}</span>
  </div>
);

export default CampaignInfluencersModal;
