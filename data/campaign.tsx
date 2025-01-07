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
  company_name: string;
  food_offering: string;
  campaign_address: string;
  key_message: string;
  package: packageType;
  total_nano_influencers: number;
  total_micro_influencers: number;
  total_photographers: number;
  total_content_creators: number;
  feedback: string;
  max_pax: number;
  booking_availabilty: string;
  availability_public_holiday: string;
  dateRange: {
    from: string,
    to: string
  };
  isHalal: boolean;
  current_bookings: number;
  slot_status: "Filled" | "Pending";
  is_result: "Pending" | "Completed";
  campaign_status: "Active" | "Cancelled" | "Completed";
}

export const dummyCampaignsData: Campaign[] = [
  {
    campaign_id: "C001",
    client_id: "CL001",
    campaign_name: "Summer Food Fest",
    company_name: "Happy Bites Co.",
    food_offering: "Summer Specials",
    campaign_address: "123 Food Street, Kuala Lumpur",
    key_message: "Savor the taste of summer!",
    package: "Gold Tier",
    total_nano_influencers: 5,
    total_micro_influencers: 3,
    total_photographers: 2,
    total_content_creators: 1,
    feedback: "Great response from customers!",
    max_pax: 50,
    booking_availabilty: "Available",
    availability_public_holiday: "Yes",
    dateRange: {
      from: "01/01/2024",
      to: "31/01/2024",
    },
    isHalal: true,
    current_bookings: 30,
    slot_status: "Pending",
    is_result: "Pending",
    campaign_status: "Active",
  },
  {
    campaign_id: "C002",
    client_id: "CL002",
    campaign_name: "Vegan Delight Campaign",
    company_name: "Green Plate Inc.",
    food_offering: "Vegan Delicacies",
    campaign_address: "456 Healthy Lane, Penang",
    key_message: "Go green, stay healthy!",
    package: "Bronze Tier",
    total_nano_influencers: 10,
    total_micro_influencers: 4,
    total_photographers: 1,
    total_content_creators: 2,
    feedback: "Positive feedback from influencers.",
    max_pax: 40,
    booking_availabilty: "Available",
    availability_public_holiday: "No",
    dateRange: {
      from: "15/02/2024",
      to: "15/03/2024",
    },
    isHalal: true,
    current_bookings: 20,
    slot_status: "Filled",
    is_result: "Pending",
    campaign_status: "Active",
  },
  {
    campaign_id: "C003",
    client_id: "CL003",
    campaign_name: "Sweet Treats Launch",
    company_name: "Sugar Bliss Bakery",
    food_offering: "Desserts and Pastries",
    campaign_address: "789 Dessert Avenue, Johor",
    key_message: "Indulge in sweetness!",
    package: "Silver Tier",
    total_nano_influencers: 3,
    total_micro_influencers: 2,
    total_photographers: 1,
    total_content_creators: 1,
    feedback: "Campaign delayed due to technical issues.",
    max_pax: 30,
    booking_availabilty: "Unavailable",
    availability_public_holiday: "Yes",
    dateRange: {
      from: "01/03/2024",
      to: "30/03/2024",
    },
    isHalal: true,
    current_bookings: 30,
    slot_status: "Filled",
    is_result: "Completed",
    campaign_status: "Completed",
  },
  {
    campaign_id: "C004",
    client_id: "CL004",
    campaign_name: "Spicy Feast Fiesta",
    company_name: "Hot & Spicy Corner",
    food_offering: "Spicy Food",
    campaign_address: "321 Chili Street, Malacca",
    key_message: "Turn up the heat!",
    package: "Gold Tier",
    total_nano_influencers: 7,
    total_micro_influencers: 5,
    total_photographers: 2,
    total_content_creators: 2,
    feedback: "Engagement has been excellent.",
    max_pax: 60,
    booking_availabilty: "Available",
    availability_public_holiday: "Yes",
    dateRange: {
      from: "10/04/2024",
      to: "30/04/2024",
    },
    isHalal: true,
    current_bookings: 45,
    slot_status: "Pending",
    is_result: "Pending",
    campaign_status: "Active",
  },
  {
    campaign_id: "C005",
    client_id: "CL005",
    campaign_name: "Family Meal Specials",
    company_name: "Dine Together",
    food_offering: "Family Combos",
    campaign_address: "222 Unity Boulevard, Sabah",
    key_message: "Food brings us closer.",
    package: "Silver Tier",
    total_nano_influencers: 6,
    total_micro_influencers: 4,
    total_photographers: 1,
    total_content_creators: 3,
    feedback: "Awaiting feedback from influencers.",
    max_pax: 70,
    booking_availabilty: "Available",
    availability_public_holiday: "No",
    dateRange: {
      from: "05/05/2024",
      to: "20/05/2024",
    },
    isHalal: true,
    current_bookings: 25,
    slot_status: "Pending",
    is_result: "Pending",
    campaign_status: "Active",
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
