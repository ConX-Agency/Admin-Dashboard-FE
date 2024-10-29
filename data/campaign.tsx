import { Influencer } from "./influencer";

export interface Services {
  type: "Instagram" | "RED Pos" | "TikTok" | "Google Review";
  task_description: string;
  assigned_influencer: string;
  assigned_date: string;
  due_date: string;
  status: "Active" | "Cancelled" | "Completed";
}

export interface Campaign {
  id: string;
  campaign: string;
  name: string;
  location: string;
  description: string;
  tags: string[];
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

export interface Offerings {
  
}

export const dummyCampaignsData: Campaign[] = [
  {
    id: "m5gr84i9",
    campaign: "80th Korean Independence Day",
    name: "SKT T1 Cafe & Arena",
    location: "Busan, Korea",
    description: "To celebrate Korea's 80th Independence Day with Faker!",
    tags: ["Cafe", "Independence Day", "Event", "Korean Culture"],
    influencers: [
      {
        name: "Faker",
      },
    ],
    services: [
      {
        type: "Instagram",
        task_description: "Post a story about the new autumn collection",
        assigned_influencer: "Alice Brown",
        assigned_date: "2024-10-01",
        due_date: "2024-10-05",
        status: "Active"
      },
      {
        type: "TikTok",
        task_description: "Create a fun, engaging video featuring our restaurant's signature dish",
        assigned_influencer: "John Doe",
        assigned_date: "2024-09-28",
        due_date: "2024-10-10",
        status: "Completed"
      },
      {
        type: "Google Review",
        task_description: "Leave a detailed review of the new branch opening experience",
        assigned_influencer: "Emma Wang",
        assigned_date: "2024-10-02",
        due_date: "2024-10-07",
        status: "Cancelled"
      },
      {
        type: "RED Pos",
        task_description: "Create a post on RED featuring our limited-time dessert menu",
        assigned_influencer: "Liam Smith",
        assigned_date: "2024-10-03",
        due_date: "2024-10-15",
        status: "Active"
      },
      {
        type: "Instagram",
        task_description: "Share a carousel post highlighting our seasonal specials",
        assigned_influencer: "Sophia Lee",
        assigned_date: "2024-09-30",
        due_date: "2024-10-12",
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
    campaign: "Summer Fiesta",
    name: "Honey Toast Cafe Akihabara",
    location: "Tokyo, Japan",
    description: "Time to chill out at Akihabara for the summers!",
    tags: ["Cafe", "Summer", "Event", "Celebration"],
    influencers: [
      {
        name: "Atrioc",
      },
    ],
    services: [
      {
        type: "Instagram",
        task_description: "Post a story about the new autumn collection",
        assigned_influencer: "Alice Brown",
        assigned_date: "2024-10-01",
        due_date: "2024-10-05",
        status: "Active"
      },
      {
        type: "TikTok",
        task_description: "Create a fun, engaging video featuring our restaurant's signature dish",
        assigned_influencer: "John Doe",
        assigned_date: "2024-09-28",
        due_date: "2024-10-10",
        status: "Completed"
      },
      {
        type: "Google Review",
        task_description: "Leave a detailed review of the new branch opening experience",
        assigned_influencer: "Emma Wang",
        assigned_date: "2024-10-02",
        due_date: "2024-10-07",
        status: "Cancelled"
      },
      {
        type: "RED Pos",
        task_description: "Create a post on RED featuring our limited-time dessert menu",
        assigned_influencer: "Liam Smith",
        assigned_date: "2024-10-03",
        due_date: "2024-10-15",
        status: "Active"
      },
      {
        type: "Instagram",
        task_description: "Share a carousel post highlighting our seasonal specials",
        assigned_influencer: "Sophia Lee",
        assigned_date: "2024-09-30",
        due_date: "2024-10-12",
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
    campaign: "Children's Day",
    name: "St. Elmo Steak House",
    location: "Indiana, United States",
    description: "Eat as much as you want for Children's Day!",
    tags: ["Restaurant", "Children's Day", "Family", "Event"],
    influencers: [
      {
        name: "Caedrel",
      },
    ],
    services: [
      {
        type: "Instagram",
        task_description: "Post a story about the new autumn collection",
        assigned_influencer: "Alice Brown",
        assigned_date: "2024-10-01",
        due_date: "2024-10-05",
        status: "Active"
      },
      {
        type: "TikTok",
        task_description: "Create a fun, engaging video featuring our restaurant's signature dish",
        assigned_influencer: "John Doe",
        assigned_date: "2024-09-28",
        due_date: "2024-10-10",
        status: "Completed"
      },
      {
        type: "Google Review",
        task_description: "Leave a detailed review of the new branch opening experience",
        assigned_influencer: "Emma Wang",
        assigned_date: "2024-10-02",
        due_date: "2024-10-07",
        status: "Cancelled"
      },
      {
        type: "RED Pos",
        task_description: "Create a post on RED featuring our limited-time dessert menu",
        assigned_influencer: "Liam Smith",
        assigned_date: "2024-10-03",
        due_date: "2024-10-15",
        status: "Active"
      },
      {
        type: "Instagram",
        task_description: "Share a carousel post highlighting our seasonal specials",
        assigned_influencer: "Sophia Lee",
        assigned_date: "2024-09-30",
        due_date: "2024-10-12",
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
    campaign: "Go Green",
    name: "Real Food",
    location: "Kuala Lumpur, Malaysia",
    description: "Have some real food for once and enjoy the green scenery!",
    tags: ["Restaurant", "Sustainability", "Health", "Eco-Friendly"],
    influencers: [
      {
        name: "Sykkuno",
      },
    ],
    services: [
      {
        type: "Instagram",
        task_description: "Post a story about the new autumn collection",
        assigned_influencer: "Alice Brown",
        assigned_date: "2024-10-01",
        due_date: "2024-10-05",
        status: "Active"
      },
      {
        type: "TikTok",
        task_description: "Create a fun, engaging video featuring our restaurant's signature dish",
        assigned_influencer: "John Doe",
        assigned_date: "2024-09-28",
        due_date: "2024-10-10",
        status: "Completed"
      },
      {
        type: "Google Review",
        task_description: "Leave a detailed review of the new branch opening experience",
        assigned_influencer: "Emma Wang",
        assigned_date: "2024-10-02",
        due_date: "2024-10-07",
        status: "Cancelled"
      },
      {
        type: "RED Pos",
        task_description: "Create a post on RED featuring our limited-time dessert menu",
        assigned_influencer: "Liam Smith",
        assigned_date: "2024-10-03",
        due_date: "2024-10-15",
        status: "Active"
      },
      {
        type: "Instagram",
        task_description: "Share a carousel post highlighting our seasonal specials",
        assigned_influencer: "Sophia Lee",
        assigned_date: "2024-09-30",
        due_date: "2024-10-12",
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
    campaign: "PWD Awareness",
    name: "Stand Pie Me Cafe",
    location: "Petaling Jaya, Malaysia",
    description: "Fill yourself up with our delicious pie while also contributing to social issues, a win-win!",
    tags: ["Cafe", "Awareness", "Disability", "Social Impact"],
    influencers: [
      {
        name: "xQc",
      },
    ],
    services: [
      {
        type: "Instagram",
        task_description: "Post a story about the new autumn collection",
        assigned_influencer: "Alice Brown",
        assigned_date: "2024-10-01",
        due_date: "2024-10-05",
        status: "Active"
      },
      {
        type: "TikTok",
        task_description: "Create a fun, engaging video featuring our restaurant's signature dish",
        assigned_influencer: "John Doe",
        assigned_date: "2024-09-28",
        due_date: "2024-10-10",
        status: "Completed"
      },
      {
        type: "Google Review",
        task_description: "Leave a detailed review of the new branch opening experience",
        assigned_influencer: "Emma Wang",
        assigned_date: "2024-10-02",
        due_date: "2024-10-07",
        status: "Cancelled"
      },
      {
        type: "RED Pos",
        task_description: "Create a post on RED featuring our limited-time dessert menu",
        assigned_influencer: "Liam Smith",
        assigned_date: "2024-10-03",
        due_date: "2024-10-15",
        status: "Active"
      },
      {
        type: "Instagram",
        task_description: "Share a carousel post highlighting our seasonal specials",
        assigned_influencer: "Sophia Lee",
        assigned_date: "2024-09-30",
        due_date: "2024-10-12",
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
  "December",
];
