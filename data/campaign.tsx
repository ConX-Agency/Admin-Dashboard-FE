import { Client, clientAddress } from "./clients";
import { Influencer } from "./influencer";

export interface Services {
  id: string;
  platform: "Instagram" | "RED" | "TikTok" | "Google Review";
  assigned_influencer: string;
  assigned_date: string;
  due_date: string;
  status: "Active" | "Cancelled" | "Completed";
}

export type packageType = "Bronze Tier" | "Silver Tier" | "Gold Tier";

export interface Campaign {
  campaign_id: string;
  client_id: string;
  campaign_name: string;
  food_offering: string;
  key_message: string;
  total_nano_influencers: number;
  total_micro_influencers: number;
  total_photographer: number;
  total_content_creator: number;
  max_pax: number;
  dateRange: {
    from: string,
    to: string
  };
  isHalal: boolean;
  slot_status: "Filled" | "Pending";
  status: "Pending Result" | "Inactive" | "Completed";
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

export interface CampaignBookingSlot {
  campaing_booking_slot_id: string;
  campaign_booking_availability_id: string;
  influencer_campaign_id: string;
  booking_slot_date: string;
  booking_slot_start_time: string;
  booking_slot_end_time: string;
  status: "Pending" | "Completed" | "Cancelled";
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

export interface CampaignLocations {
  campaign_location_id: string;
  campaign_id: string;
  clients_location_id: string;
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
    dateRange: {
      from: "01/01/2024",
      to: "31/01/2024",
    },
    isHalal: true,
    slot_status: "Pending",
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
    dateRange: {
      from: "15/02/2024",
      to: "15/03/2024",
    },
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
    dateRange: {
      from: "01/03/2024",
      to: "30/03/2024",
    },
    isHalal: true,
    slot_status: "Filled",
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
    dateRange: {
      from: "10/04/2024",
      to: "30/04/2024",
    },
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
    dateRange: {
      from: "05/05/2024",
      to: "20/05/2024",
    },
    isHalal: true,
    slot_status: "Pending",
    status: "Pending Result",
  },
];


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
