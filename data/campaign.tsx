import { getInfluencerWithPlatformsById, InfluencerWithPlatforms } from "./influencer";

export interface Services {
  id: string;
  platform: "Instagram" | "RED" | "TikTok" | "Google Review";
  assigned_influencer: string;
  assigned_date: string;
  due_date: string;
  status: "Active" | "Cancelled" | "Completed";
}

export type CampaignWithLocation = Campaign & { campaign_locations: CampaignLocations[] };

export type CampaignWithInfluencer = InfluencerCampaign & { campaign_influencers: InfluencerWithPlatforms }

export type campaignInfluencerBookingStatus = "No Slot" | "Pending Attendance" | "Attended";

export interface Campaign {
  campaign_id?: string;
  client_id: string;
  campaign_name: string;
  food_offering: string;
  key_message: string;
  total_nano_influencers: number;
  total_micro_influencers: number;
  total_photographer: number;
  total_content_creator: number;
  max_pax: number;
  start_date: Date;
  end_date: Date;
  isHalal: boolean;
  slot_status: "Filled" | "Pending";
  status: "Pending Result" | "Inactive" | "Completed";
}

export interface CampaignLocations {
  campaign_location_id?: string;
  campaign_id?: string;
  clients_location_id: string;
}

export interface InfluencerCampaign {
  influencer_campaign_id: string;
  campaign_id: string;
  influencer_id: string;
  full_name: string;
  pax_no: number;
  type: "Food Influencer" | "Photographer";
  is_due_date: string;
  photography_share_drive_link: string;
  review_Link: string;
  review_view_count: number;
  is_completed: boolean;
  campaign_feedback: string;
}

export interface InfluencerCampaignPostings {
  influencer_campaign_posting_id: string;
  influencer_campaign_id: string;
  account_id: string;
  post_url: string;
  is_run_ads: "Yes" | "No" | "Review";
  is_boost: boolean;
  total_boosting_duration: number;
  current_boosting_duration: number;
  before_view: number;
  before_likes: number;
  before_comments: number;
  before_saved: number;
  before_shares: number;
  current_view: number;
  current_likes: number;
  current_comments: number;
  current_saved: number;
  current_shares: number;
  last_modified_time: string;
}

export interface CampaignBookingAvailability {
  campaign_booking_availability_id: string;
  campaign_id: string;
  booking_availability_day: string;
  booking_availability_date: string;
  booking_availability_start_time: string;
  booking_availability_end_time: string;
  is_repeating: boolean;
  is_public_holiday: boolean;
}

export interface CampaignBookingSlot {
  campaing_booking_slot_id: string;
  campaign_booking_availability_id: string;
  influencer_campaign_id: string;
  booking_slot_date: string;
  booking_slot_start_time: string;
  booking_slot_end_time: string;
  status: "Pending" | "Completed" | "Cancelled";
}

export const dummyCampaignsData: Campaign[] = [
  {
    campaign_id: "C001",
    client_id: "CL001",
    campaign_name: "Summer Food Fest",
    food_offering: "Summer Specials",
    key_message: "Savor the taste of summer!",
    total_nano_influencers: 5,
    total_micro_influencers: 3,
    total_photographer: 2,
    total_content_creator: 1,
    max_pax: 50,
    start_date: new Date("2025-01-01"),
    end_date: new Date("2025-01-31"),
    isHalal: true,
    slot_status: "Filled",
    status: "Pending Result",
  },
  {
    campaign_id: "C002",
    client_id: "CL002",
    campaign_name: "Vegan Delight Campaign",
    food_offering: "Vegan Delicacies",
    key_message: "Go green, stay healthy!",
    total_nano_influencers: 10,
    total_micro_influencers: 4,
    total_photographer: 1,
    total_content_creator: 2,
    max_pax: 40,
    start_date: new Date("2025-02-15"),
    end_date: new Date("2025-03-15"),
    isHalal: true,
    slot_status: "Filled",
    status: "Pending Result",
  },
  {
    campaign_id: "C003",
    client_id: "CL003",
    campaign_name: "Sweet Treats Launch",
    food_offering: "Desserts and Pastries",
    key_message: "Indulge in sweetness!",
    total_nano_influencers: 3,
    total_micro_influencers: 2,
    total_photographer: 1,
    total_content_creator: 1,
    max_pax: 30,
    start_date: new Date("2025-03-01"),
    end_date: new Date("2025-03-30"),
    isHalal: true,
    slot_status: "Pending",
    status: "Completed",
  },
  {
    campaign_id: "C004",
    client_id: "CL004",
    campaign_name: "Spicy Feast Fiesta",
    food_offering: "Spicy Food",
    key_message: "Turn up the heat!",
    total_nano_influencers: 7,
    total_micro_influencers: 5,
    total_photographer: 2,
    total_content_creator: 2,
    max_pax: 60,
    start_date: new Date("2025-04-10"),
    end_date: new Date("2025-04-30"),
    isHalal: true,
    slot_status: "Pending",
    status: "Pending Result",
  },
  {
    campaign_id: "C005",
    client_id: "CL005",
    campaign_name: "Family Meal Specials",
    food_offering: "Family Combos",
    key_message: "Food brings us closer.",
    total_nano_influencers: 6,
    total_micro_influencers: 4,
    total_photographer: 1,
    total_content_creator: 3,
    max_pax: 70,
    start_date: new Date("2025-05-05"),
    end_date: new Date("2025-05-20"),
    isHalal: true,
    slot_status: "Pending",
    status: "Pending Result",
  },
];

export const dummyCampaignLocationsData: CampaignLocations[] = [
  {
    campaign_location_id: "L001",
    campaign_id: "C001",
    clients_location_id: "CL001",
  },
  {
    campaign_location_id: "L002",
    campaign_id: "C002",
    clients_location_id: "CL002",
  },
];

export const dummyInfluencerCampaignsData: InfluencerCampaign[] = [
  {
    influencer_campaign_id: "IC001",
    campaign_id: "C001",
    influencer_id: "INF001",
    full_name: "John Doe",
    pax_no: 2,
    type: "Food Influencer",
    is_due_date: "No",
    photography_share_drive_link: "http://example.com/drive1",
    review_Link: "http://example.com/review1",
    review_view_count: 100,
    is_completed: false,
    campaign_feedback: "Great campaign!",
  },
  {
    influencer_campaign_id: "IC003",
    campaign_id: "C001",
    influencer_id: "INF003",
    full_name: "Jane Smith",
    pax_no: 3,
    type: "Photographer",
    is_due_date: "Yes",
    photography_share_drive_link: "http://example.com/drive2",
    review_Link: "http://example.com/review2",
    review_view_count: 200,
    is_completed: true,
    campaign_feedback: "Amazing experience!",
  },
];

export const dummyInfluencerCampaignPostingsData: InfluencerCampaignPostings[] = [
  {
    influencer_campaign_posting_id: "IP001",
    influencer_campaign_id: "IC001",
    account_id: "A001",
    post_url: "http://example.com/post1",
    is_run_ads: "Yes",
    is_boost: true,
    total_boosting_duration: 10,
    current_boosting_duration: 5,
    before_view: 1000,
    before_likes: 100,
    before_comments: 10,
    before_saved: 5,
    before_shares: 2,
    current_view: 1500,
    current_likes: 150,
    current_comments: 15,
    current_saved: 10,
    current_shares: 5,
    last_modified_time: "2025-01-15T10:00:00Z",
  },
  {
    influencer_campaign_posting_id: "IP002",
    influencer_campaign_id: "IC002",
    account_id: "A002",
    post_url: "http://example.com/post2",
    is_run_ads: "No",
    is_boost: false,
    total_boosting_duration: 0,
    current_boosting_duration: 0,
    before_view: 500,
    before_likes: 50,
    before_comments: 5,
    before_saved: 2,
    before_shares: 1,
    current_view: 700,
    current_likes: 70,
    current_comments: 7,
    current_saved: 3,
    current_shares: 2,
    last_modified_time: "2025-02-20T14:00:00Z",
  },
];

export const dummyCampaignBookingAvailabilityData: CampaignBookingAvailability[] = [
  {
    campaign_booking_availability_id: "BA001",
    campaign_id: "C001",
    booking_availability_day: "Monday",
    booking_availability_date: "2025-01-01",
    booking_availability_start_time: "09:00",
    booking_availability_end_time: "17:00",
    is_repeating: true,
    is_public_holiday: false,
  },
  {
    campaign_booking_availability_id: "BA002",
    campaign_id: "C002",
    booking_availability_day: "Tuesday",
    booking_availability_date: "2025-02-01",
    booking_availability_start_time: "10:00",
    booking_availability_end_time: "18:00",
    is_repeating: false,
    is_public_holiday: true,
  },
];

export const dummyCampaignBookingSlotsData: CampaignBookingSlot[] = [
  {
    campaing_booking_slot_id: "BS001",
    campaign_booking_availability_id: "BA001",
    influencer_campaign_id: "IC001",
    booking_slot_date: "2025-02-10",
    booking_slot_start_time: "10:00",
    booking_slot_end_time: "12:00",
    status: "Pending",
  },
  {
    campaing_booking_slot_id: "BS002",
    campaign_booking_availability_id: "BA002",
    influencer_campaign_id: "IC002",
    booking_slot_date: "2025-02-15",
    booking_slot_start_time: "14:00",
    booking_slot_end_time: "16:00",
    status: "Completed",
  },
];

export const getBookingAvailabilitiesByCampaign = (campaignId: string) => {
  return dummyCampaignBookingAvailabilityData.filter(
    availability => availability.campaign_id === campaignId
  );
};

export const getBookingSlotsByCampaign = (campaignId: string) => {
  const availabilities = getBookingAvailabilitiesByCampaign(campaignId);
  const availabilityIds = availabilities.map(a => a.campaign_booking_availability_id);

  return dummyCampaignBookingSlotsData.filter(slot =>
    availabilityIds.includes(slot.campaign_booking_availability_id)
  );
};

export const getTotalBookedSlotsByCampaign = (campaignId: string) => {
  const bookingSlots = getBookingSlotsByCampaign(campaignId);
  return bookingSlots.length;
};

export const getLocationsByCampaignId = (campaignId: string) => {
  return dummyCampaignLocationsData.filter(
    location => location.campaign_id === campaignId
  );
};

export const getInfluencerCampaignsByCampaignId = (campaignId: string): CampaignWithInfluencer[] => {
  return dummyInfluencerCampaignsData
    .filter(influencerCampaign => influencerCampaign.campaign_id === campaignId)
    .map(influencerCampaign => ({
      ...influencerCampaign,
      campaign_influencers: getInfluencerWithPlatformsById(influencerCampaign.influencer_id) as InfluencerWithPlatforms
    }));
};

export interface IconWithToolTipProps {
  IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  popoverText: string;
}

export interface FiltersProps {
  onFilterChange: (filteredData: Campaign[]) => void;
}

export interface CampaignCardsProps {
  campaigns: Campaign[];
}

export interface campaign_dateRange {
  from: Date | undefined;
  to?: Date | undefined;
}

export const monthRanges: { [key: string]: { from: Date; to: Date } } = {
  January: { from: new Date(new Date().getFullYear(), 0, 1), to: new Date(new Date().getFullYear(), 0, 31) },
  February: { from: new Date(new Date().getFullYear(), 1, 1), to: new Date(new Date().getFullYear(), 1, 29) },
  March: { from: new Date(new Date().getFullYear(), 2, 1), to: new Date(new Date().getFullYear(), 2, 31) },
  April: { from: new Date(new Date().getFullYear(), 3, 1), to: new Date(new Date().getFullYear(), 3, 30) },
  May: { from: new Date(new Date().getFullYear(), 4, 1), to: new Date(new Date().getFullYear(), 4, 31) },
  June: { from: new Date(new Date().getFullYear(), 5, 1), to: new Date(new Date().getFullYear(), 5, 30) },
  July: { from: new Date(new Date().getFullYear(), 6, 1), to: new Date(new Date().getFullYear(), 6, 31) },
  August: { from: new Date(new Date().getFullYear(), 7, 1), to: new Date(new Date().getFullYear(), 7, 31) },
  September: { from: new Date(new Date().getFullYear(), 8, 1), to: new Date(new Date().getFullYear(), 8, 30) },
  October: { from: new Date(new Date().getFullYear(), 9, 1), to: new Date(new Date().getFullYear(), 9, 31) },
  November: { from: new Date(new Date().getFullYear(), 10, 1), to: new Date(new Date().getFullYear(), 10, 30) },
  December: { from: new Date(new Date().getFullYear(), 11, 1), to: new Date(new Date().getFullYear(), 11, 31) },
};

export const dummyCountries = [
  "All",
  "Japan",
  "South Korea",
  "United States",
  "Malaysia",
];

export const status = ["All", "Active", "Cancelled", "Completed"];

export const months = [
  "All",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
