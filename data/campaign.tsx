import { Influencer } from "./influencer";

export interface Services {
  platform: "Instagram" | "RED" | "TikTok" | "Google Review";
  assigned_influencer: string;
  assigned_date: string;
  due_date: string;
  status: "Active" | "Cancelled" | "Completed";
}

export interface Offering {
  offering_type: string;
  offering_description: string;
  featured_food: string;
  maximum_pax: number;
}

export interface Campaign {
  id: string;
  campaign_name: string;
  campaign_description: string;
  campaign_key_messages: string;
  organizer: string;
  location: string;
  tags: string[];
  offering: Offering;
  influencers: Influencer[];
  services: Services[];
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


export const dummyCampaignsData: Campaign[] = [
  {
    id: "m5gr84i9",
    campaign_name: "80th Korean Independence Day",
    campaign_description: "T1 to celebrate the 80th Korea's Independence Day occasion.",
    campaign_key_messages: "Celebrate Korea's 80th Independece Day with the T1's ZOFGK members and get a chance to meet Faker!",
    organizer: "SKT T1 Cafe & Arena",
    location: "Busan, Korea",
    tags: ["Cafe", "Independence Day", "Event", "Korean Culture"],
    offering: {
      offering_type: "Food Credit",
      offering_description: "10000₩ Food Credit",
      featured_food: "Limited Edition One Piece Honey Toast Set",
      maximum_pax: 2
    },
    influencers: [
      {
        name: "Faker",
      },
    ],
    services: [
      {
        platform: "Instagram",
        assigned_influencer: "Alice Brown",
        assigned_date: "15/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        platform: "TikTok",
        assigned_influencer: "John Doe",
        assigned_date: "16/10/2024",
        due_date: "14/11/2024",
        status: "Completed"
      },
      {
        platform: "Google Review",
        assigned_influencer: "Emma Wang",
        assigned_date: "17/10/2024",
        due_date: "14/11/2024",
        status: "Cancelled"
      },
      {
        platform: "RED",
        assigned_influencer: "Liam Smith",
        assigned_date: "18/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        platform: "Instagram",
        assigned_influencer: "Sophia Lee",
        assigned_date: "19/10/2024",
        due_date: "14/11/2024",
        status: "Completed"
      }
    ],
    dateRange: {
      from: "14/10/2024",
      to: "14/11/2024",
    },
    status: "Active",
  },
  {
    id: "3u1reuv4",
    campaign_name: "One Piece Summer Fiesta",
    campaign_description: "A collaboration with One Piece to celebrate the summers.",
    campaign_key_messages: "Time to chill out during the summers with One Piece!",
    organizer: "Honey Toast Cafe Akihabara",
    location: "Tokyo, Japan",
    tags: ["Cafe", "Summer", "Event", "Celebration"],
    offering: {
      offering_type: "Food Credit",
      offering_description: "1000¥ Food Credit",
      featured_food: "Limited Edition One Piece Honey Toast Set",
      maximum_pax: 2
    },
    influencers: [
      {
        name: "Atrioc",
      },
    ],
    services: [
      {
        platform: "Instagram",
        assigned_influencer: "Alice Brown",
        assigned_date: "15/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        platform: "TikTok",
        assigned_influencer: "John Doe",
        assigned_date: "16/10/2024",
        due_date: "14/11/2024",
        status: "Completed"
      },
      {
        platform: "Google Review",
        assigned_influencer: "Emma Wang",
        assigned_date: "17/10/2024",
        due_date: "14/11/2024",
        status: "Cancelled"
      },
      {
        platform: "RED",
        assigned_influencer: "Liam Smith",
        assigned_date: "18/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        platform: "Instagram",
        assigned_influencer: "Sophia Lee",
        assigned_date: "19/10/2024",
        due_date: "14/11/2024",
        status: "Completed"
      }
    ],
    dateRange: {
      from: "15/10/2024",
      to: "15/11/2024",
    },
    status: "Cancelled",
  },
  {
    id: "derv1ws0",
    campaign_name: "Children's Day",
    campaign_description: "To allow parents to celebrate children's day with their children.",
    campaign_key_messages: "Eat as much as you want for Children's Day!",
    organizer: "St. Elmo Steak House",
    location: "Indiana, United States",
    tags: ["Restaurant", "Children's Day", "Family", "Event"],
    offering: {
      offering_type: "Food Credit",
      offering_description: "RM5 Food Credit",
      featured_food: "Children's Day Specials Beef Steak",
      maximum_pax: 5
    },
    influencers: [
      {
        name: "Caedrel",
      },
    ],
    services: [
      {
        platform: "Instagram",
        assigned_influencer: "Alice Brown",
        assigned_date: "15/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        platform: "TikTok",
        assigned_influencer: "John Doe",
        assigned_date: "16/10/2024",
        due_date: "14/11/2024",
        status: "Completed"
      },
      {
        platform: "Google Review",
        assigned_influencer: "Emma Wang",
        assigned_date: "17/10/2024",
        due_date: "14/11/2024",
        status: "Cancelled"
      },
      {
        platform: "RED",
        assigned_influencer: "Liam Smith",
        assigned_date: "18/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        platform: "Instagram",
        assigned_influencer: "Sophia Lee",
        assigned_date: "19/10/2024",
        due_date: "14/11/2024",
        status: "Completed"
      }
    ],
    dateRange: {
      from: "16/10/2024",
      to: "16/11/2024",
    },
    status: "Active",
  },
  {
    id: "5kma53ae",
    campaign_name: "Go Green",
    campaign_description: "Have some real food for once and enjoy the green scenery!",
    campaign_key_messages: "Have some real food for once and enjoy the green scenery!",
    organizer: "Real Food",
    location: "Kuala Lumpur, Malaysia",
    tags: ["Restaurant", "Sustainability", "Health", "Eco-Friendly"],
    offering: {
      offering_type: "Food Credit",
      offering_description: "RM10 Food Credit",
      featured_food: "Japanese-Malaysian Fusion Salmon & Chicken Fresh Salad",
      maximum_pax: 1
    },
    influencers: [
      {
        name: "Sykkuno",
      },
    ],
    services: [
      {
        platform: "Instagram",
        assigned_influencer: "Alice Brown",
        assigned_date: "15/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        platform: "TikTok",
        assigned_influencer: "John Doe",
        assigned_date: "16/10/2024",
        due_date: "14/11/2024",
        status: "Completed"
      },
      {
        platform: "Google Review",
        assigned_influencer: "Emma Wang",
        assigned_date: "17/10/2024",
        due_date: "14/11/2024",
        status: "Cancelled"
      },
      {
        platform: "RED",
        assigned_influencer: "Liam Smith",
        assigned_date: "18/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        platform: "Instagram",
        assigned_influencer: "Sophia Lee",
        assigned_date: "19/10/2024",
        due_date: "14/11/2024",
        status: "Completed"
      }
    ],
    dateRange: {
      from: "17/10/2024",
      to: "17/11/2024",
    },
    status: "Active",
  },
  {
    id: "bhqecj4p",
    campaign_name: "PWD Awareness",
    campaign_description: "A campaign to promote awareness for Person with Disabilities (PWD) and their capabilities to contribute to society",
    campaign_key_messages: "Fill yourself up with our delicious pie while also contributing to social issues, a win-win!",
    organizer: "Stand Pie Me Cafe",
    location: "Petaling Jaya, Malaysia",
    tags: ["Cafe", "Awareness", "Disability", "Social Impact"],
    offering: {
      offering_type: "Food Credit",
      offering_description: "RM3 Food Credit",
      featured_food: "",
      maximum_pax: 1
    },
    influencers: [
      {
        name: "xQc",
      },
    ],
    services: [
      {
        platform: "Instagram",
        assigned_influencer: "Alice Brown",
        assigned_date: "15/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        platform: "TikTok",
        assigned_influencer: "John Doe",
        assigned_date: "16/10/2024",
        due_date: "14/11/2024",
        status: "Completed"
      },
      {
        platform: "Google Review",
        assigned_influencer: "Emma Wang",
        assigned_date: "17/10/2024",
        due_date: "14/11/2024",
        status: "Cancelled"
      },
      {
        platform: "RED",
        assigned_influencer: "Liam Smith",
        assigned_date: "18/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        platform: "Instagram",
        assigned_influencer: "Sophia Lee",
        assigned_date: "19/10/2024",
        due_date: "14/11/2024",
        status: "Completed"
      }
    ],
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
  "December"
];
