import { Influencer } from "./influencer";

export interface Campaign {
  id: string;
  campaign: string;
  name: string;
  location: string;
  description: string;
  tags: string[];
  influencers: Influencer[];
  activities_remaining: number;
  dateRange: {
    from: string,
    to: string
  };
  status: "Active" | "Cancelled" | "Completed"; // Enum of possible statuses.
}

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

export interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}

export const dummyCampaignsData: Campaign[] = [
  {
    id: "m5gr84i9",
    campaign: "80th Korean Independence Day",
    name: "SKT T1 Cafe & Arena",
    location: "Busan, Korea",
    description: "",
    tags: ["Cafe", "Independence Day", "Event", "Korean Culture"],
    influencers: [
      {
        name: "Faker",
      },
    ],
    activities_remaining: 10,
    dateRange: {
        from: "14/10/2024",
        to: "14/11/2024",
    },
    status: "Active",
  },
  {
    id: "3u1reuv4",
    campaign: "Summer Fiesta",
    name: "Honey Toast Cafe Akihabara",
    location: "Tokyo, Japan",
    description: "",
    tags: ["Cafe", "Summer", "Event", "Celebration"],
    influencers: [
      {
        name: "Atrioc",
      },
    ],
    activities_remaining: 10,
    dateRange: {
        from: "15/10/2024",
        to: "15/11/2024",
    },
    status: "Cancelled",
  },
  {
    id: "derv1ws0",
    campaign: "Children's Day",
    name: "St. Elmo Steak House",
    location: "Indiana, United States",
    description: "",
    tags: ["Restaurant", "Children's Day", "Family", "Event"],
    influencers: [
      {
        name: "Caedrel",
      },
    ],
    activities_remaining: 10,
    dateRange: {
        from: "16/10/2024",
        to: "16/11/2024",
    },
    status: "Active",
  },
  {
    id: "5kma53ae",
    campaign: "Go Green",
    name: "Real Food",
    location: "Kuala Lumpur, Malaysia",
    description: "",
    tags: ["Restaurant", "Sustainability", "Health", "Eco-Friendly"],
    influencers: [
      {
        name: "Sykkuno",
      },
    ],
    activities_remaining: 10,
    dateRange: {
        from: "17/10/2024",
        to: "17/11/2024",
    },
    status: "Active",
  },
  {
    id: "bhqecj4p",
    campaign: "PWD Awareness",
    name: "Stand Pie Me Cafe",
    location: "Petaling Jaya, Malaysia",
    description: "",
    tags: ["Cafe", "Awareness", "Disability", "Social Impact"],
    influencers: [
      {
        name: "xQc",
      },
    ],
    activities_remaining: 10,
    dateRange: {
        from: "18/10/2024",
        to: "18/11/2024",
    },
    status: "Completed",
  },
];

export const dummyCountries = [
  "All",
  "Japan",
  "Korea",
  "United States",
  "Malaysia",
];

export const status = ["All", "Active", "Cancelled", "Completed"];

export const types = ["All", "Cafe", "Restaurant"];

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
  "December",
];
