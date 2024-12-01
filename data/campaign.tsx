import { Influencer } from "./influencer";

export interface Services {
  id: string;
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
  campaign_image: string;
  campaign_max_influencer: number;
  campaign_min_influencer: number;
  organizer: string;
  location: string;
  industry_type: string;
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
    campaign_name: "80th South Korean Independence Day",
    campaign_description: ` In celebration of South Korea's 80th Independence Day, SKT T1 Cafe & Arena invites fans and influencers to join a 
      vibrant cultural event in Busan, honoring the history and heritage of South Korea. This special occasion brings 
      together the thrill of esports with a tribute to national pride, featuring appearances by the two-time World Champion, 
      ZOFGK. Attendees will be treated to exclusive themed food and beverages, including the Limited Edition ZOFGK Coffee Art and 
      Merch, while influencers are offered a 10,000₩ food credit to share their experiences. With a festive atmosphere set 
      against the scenic backdrop of Busan, the event promises memorable moments for fans and influencers alike, fostering a deeper 
      ppreciation of South Korean culture and unity.`,
    campaign_key_messages: "Celebrate South Korea's 80th Independece Day with the 2x Worlds Champion, ZOFGK!",
    campaign_image: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    campaign_min_influencer: 5,
    campaign_max_influencer: 10,
    organizer: "SKT T1 Cafe & Arena",
    location: "Busan, South Korea",
    industry_type: "Food & Beverage",
    tags: ["Cafe", "Independence Day", "Event", "South Korean Culture"],
    offering: {
      offering_type: "Food Credit",
      offering_description: "10000₩ Food Credit",
      featured_food: "Limited Edition ZOFGK Coffee Art and Merch",
      maximum_pax: 2
    },
    influencers: [
      {
        name: "Faker",
      },
    ],
    services: [
      {
        id: 'm5gr84l9',
        platform: "Instagram",
        assigned_influencer: "Alice Brown",
        assigned_date: "15/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        id: 'm5gr84k8',
        platform: "TikTok",
        assigned_influencer: "John Doe",
        assigned_date: "16/10/2024",
        due_date: "14/11/2024",
        status: "Completed"
      },
      {
        id: 'm5gr84i7',
        platform: "Google Review",
        assigned_influencer: "Emma Wang",
        assigned_date: "17/10/2024",
        due_date: "14/11/2024",
        status: "Cancelled"
      },
      {
        id: 'm5gr84i6',
        platform: "RED",
        assigned_influencer: "Liam Smith",
        assigned_date: "18/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        id: 'm5gr84i5',
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
    campaign_image: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    campaign_min_influencer: 5,
    campaign_max_influencer: 10,
    organizer: "Honey Toast Cafe Akihabara",
    location: "Tokyo, Japan",
    industry_type: "Food & Beverage",
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
        id: 'm5gr84i4',
        platform: "Instagram",
        assigned_influencer: "Alice Brown",
        assigned_date: "15/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        id: 'm5gr84i3',
        platform: "TikTok",
        assigned_influencer: "John Doe",
        assigned_date: "16/10/2024",
        due_date: "14/11/2024",
        status: "Completed"
      },
      {
        id: 'm5gr84i2',
        platform: "Google Review",
        assigned_influencer: "Emma Wang",
        assigned_date: "17/10/2024",
        due_date: "14/11/2024",
        status: "Cancelled"
      },
      {
        id: 'm5gr84i1',
        platform: "RED",
        assigned_influencer: "Liam Smith",
        assigned_date: "18/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        id: 'm5gr84i0',
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
    campaign_image: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    campaign_min_influencer: 5,
    campaign_max_influencer: 10,
    organizer: "St. Elmo Steak House",
    location: "Indiana, United States",
    industry_type: "Food & Beverage",
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
        id: 'm5gr8499',
        platform: "Instagram",
        assigned_influencer: "Alice Brown",
        assigned_date: "15/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        id: 'm5gr8489',
        platform: "TikTok",
        assigned_influencer: "John Doe",
        assigned_date: "16/10/2024",
        due_date: "14/11/2024",
        status: "Completed"
      },
      {
        id: 'm5gr8479',
        platform: "Google Review",
        assigned_influencer: "Emma Wang",
        assigned_date: "17/10/2024",
        due_date: "14/11/2024",
        status: "Cancelled"
      },
      {
        id: 'm5gr8469',
        platform: "RED",
        assigned_influencer: "Liam Smith",
        assigned_date: "18/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        id: 'm5gr8459',
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
    campaign_image: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    campaign_min_influencer: 5,
    campaign_max_influencer: 10,
    organizer: "Real Food",
    location: "Kuala Lumpur, Malaysia",
    industry_type: "Food & Beverage",
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
        id: 'm5gr8449',
        platform: "Instagram",
        assigned_influencer: "Alice Brown",
        assigned_date: "15/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        id: 'm5gr8439',
        platform: "TikTok",
        assigned_influencer: "John Doe",
        assigned_date: "16/10/2024",
        due_date: "14/11/2024",
        status: "Completed"
      },
      {
        id: 'm5gr8429',
        platform: "Google Review",
        assigned_influencer: "Emma Wang",
        assigned_date: "17/10/2024",
        due_date: "14/11/2024",
        status: "Cancelled"
      },
      {
        id: 'm5gr8419',
        platform: "RED",
        assigned_influencer: "Liam Smith",
        assigned_date: "18/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        id: 'm5gr8409',
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
    campaign_image: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    campaign_min_influencer: 5,
    campaign_max_influencer: 10,
    organizer: "Stand Pie Me Cafe",
    location: "Petaling Jaya, Malaysia",
    industry_type: "Food & Beverage",
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
        id: 'm5gr8399',
        platform: "Instagram",
        assigned_influencer: "Alice Brown",
        assigned_date: "15/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        id: 'm5gr8299',
        platform: "TikTok",
        assigned_influencer: "John Doe",
        assigned_date: "16/10/2024",
        due_date: "14/11/2024",
        status: "Completed"
      },
      {
        id: 'm5gr8199',
        platform: "Google Review",
        assigned_influencer: "Emma Wang",
        assigned_date: "17/10/2024",
        due_date: "14/11/2024",
        status: "Cancelled"
      },
      {
        id: 'm5gr8099',
        platform: "RED",
        assigned_influencer: "Liam Smith",
        assigned_date: "18/10/2024",
        due_date: "14/11/2024",
        status: "Active"
      },
      {
        id: 'm5gr7999',
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
  "South Korea",
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
