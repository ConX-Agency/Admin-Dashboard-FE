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
  offering_account_type: string;
  offering_description: string;
  featured_food: string;
  maximum_pax: number;
}

export type packageType = "Bronze Tier" | "Silver Tier" | "Gold Tier";

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
  industry_account_type: string;
  tags: string[];
  offering: Offering;
  influencers: Influencer[];
  services: Services[];
  dateRange: {
    from: string,
    to: string
  };
  package: packageType;
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
    industry_account_type: "Food & Beverage",
    tags: ["Cafe", "Independence Day", "Event", "South Korean Culture"],
    offering: {
      offering_account_type: "Food Credit",
      offering_description: "10000₩ Food Credit",
      featured_food: "Limited Edition ZOFGK Coffee Art and Merch",
      maximum_pax: 2
    },
    influencers: [
      {
        influencer_id: "eb626727-ea74-4de7-87ab-db79039c5042",
        full_name: "Emily Carter",
        preferred_name: "Emmy",
        contact_number: "123-456-7890",
        alt_contact_number: "123-456-7891",
        email_address: "emmy.carter@example.com",
        address: {
            id: 1,
            address: "123 Maple Street",
            city: "Los Angeles",
            postcode: "90001",
            state: "California",
            country: "USA",
        },
        platforms: [
            {
                account_id: "insta_emily123",
                influencer_id: "eb626727-ea74-4de7-87ab-db79039c5042",
                social_media_url: "https://instagram.com/emily123",
                platform_name: "instagram",
                audience_focus_country: "USA",
                platform_focus: "Lifestyle",
                follower_count: 250000,
            },
            {
                account_id: "tiktok_emily123",
                influencer_id: "eb626727-ea74-4de7-87ab-db79039c5042",
                social_media_url: "https://tiktok.com/@emily123",
                platform_name: "tiktok",
                audience_focus_country: "USA",
                platform_focus: "UGC",
                follower_count: 500000,
            },
        ],
        total_follower_count: 750000,
        whatsapp_consent: true,
        whatsapp_invited: false,
        community_invited: true,
        invite_count: 3,
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
    package: "Bronze Tier",
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
    industry_account_type: "Food & Beverage",
    tags: ["Cafe", "Summer", "Event", "Celebration"],
    offering: {
      offering_account_type: "Food Credit",
      offering_description: "1000¥ Food Credit",
      featured_food: "Limited Edition One Piece Honey Toast Set",
      maximum_pax: 2
    },
    influencers: [
      {
        influencer_id: "1ba79f5d-e465-4287-85fd-c39b19dfcee1",
        full_name: "Daniel Kim",
        preferred_name: "Danny",
        contact_number: "234-567-8901",
        alt_contact_number: "234-567-8902",
        email_address: "danny.kim@example.com",
        address: {
            id: 2,
            address: "456 Oak Lane",
            city: "Toronto",
            postcode: "M4B 1B3",
            state: "Ontario",
            country: "Canada",
        },
        platforms: [
            {
                account_id: "yt_dannykim",
                influencer_id: "1ba79f5d-e465-4287-85fd-c39b19dfcee1",
                social_media_url: "https://youtube.com/dannykim",
                platform_name: "youtube",
                audience_focus_country: "Canada",
                platform_focus: "UGC",
                follower_count: 120000,
            },
        ],
        total_follower_count: 120000,
        whatsapp_consent: false,
        whatsapp_invited: true,
        community_invited: false,
        invite_count: 1,
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
    package: "Bronze Tier",
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
    industry_account_type: "Food & Beverage",
    tags: ["Restaurant", "Children's Day", "Family", "Event"],
    offering: {
      offering_account_type: "Food Credit",
      offering_description: "RM5 Food Credit",
      featured_food: "Children's Day Specials Beef Steak",
      maximum_pax: 5
    },
    influencers: [
      {
        influencer_id: "9d7c1722-18e7-4c99-94ed-a22f41f34e04",
        full_name: "Sophia Martinez",
        preferred_name: "Soph",
        contact_number: "345-678-9012",
        alt_contact_number: "345-678-9013",
        email_address: "soph.martinez@example.com",
        address: {
            id: 3,
            address: "789 Pine Road",
            city: "London",
            postcode: "E1 6AN",
            state: "England",
            country: "UK",
        },
        platforms: [
            {
                account_id: "insta_sophmart",
                influencer_id: "9d7c1722-18e7-4c99-94ed-a22f41f34e04",
                social_media_url: "https://instagram.com/sophmart",
                platform_name: "instagram",
                audience_focus_country: "UK",
                platform_focus: "Food",
                follower_count: 95000,
            },
            {
                account_id: "red_sophmart",
                influencer_id: "9d7c1722-18e7-4c99-94ed-a22f41f34e04",
                social_media_url: "https://red.com/sophmart",
                platform_name: "RED",
                audience_focus_country: "China",
                platform_focus: "Food",
                follower_count: 80000,
            },
        ],
        total_follower_count: 175000,
        whatsapp_consent: true,
        whatsapp_invited: true,
        community_invited: true,
        invite_count: 5,
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
    package: "Gold Tier",
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
    industry_account_type: "Food & Beverage",
    tags: ["Restaurant", "Sustainability", "Health", "Eco-Friendly"],
    offering: {
      offering_account_type: "Food Credit",
      offering_description: "RM10 Food Credit",
      featured_food: "Japanese-Malaysian Fusion Salmon & Chicken Fresh Salad",
      maximum_pax: 1
    },
    influencers: [
      {
        influencer_id: "c4ee145b-2781-4070-a00d-2862e19c2a4a",
        full_name: "Aarav Patel",
        preferred_name: "Aarav",
        contact_number: "456-789-0123",
        alt_contact_number: "456-789-0124",
        email_address: "aarav.patel@example.com",
        address: {
            id: 4,
            address: "321 Cedar Avenue",
            city: "Mumbai",
            postcode: "400001",
            state: "Maharashtra",
            country: "India",
        },
        platforms: [
            {
                account_id: "tiktok_aaravp",
                influencer_id: "c4ee145b-2781-4070-a00d-2862e19c2a4a",
                social_media_url: "https://tiktok.com/@aaravp",
                platform_name: "tiktok",
                audience_focus_country: "India",
                platform_focus: "UGC",
                follower_count: 300000,
            },
        ],
        total_follower_count: 300000,
        whatsapp_consent: true,
        whatsapp_invited: false,
        community_invited: false,
        invite_count: 2,
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
    package: "Gold Tier",
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
    industry_account_type: "Food & Beverage",
    tags: ["Cafe", "Awareness", "Disability", "Social Impact"],
    offering: {
      offering_account_type: "Food Credit",
      offering_description: "RM3 Food Credit",
      featured_food: "",
      maximum_pax: 1
    },
    influencers: [
      {
        influencer_id: "e8b7a78e-34e6-45b7-8bc4-c58fd88cc84a",
        full_name: "Hana Tanaka",
        preferred_name: "Hana",
        contact_number: "567-890-1234",
        alt_contact_number: "567-890-1235",
        email_address: "hana.tanaka@example.com",
        address: {
            id: 5,
            address: "654 Willow Lane",
            city: "Tokyo",
            postcode: "100-0001",
            state: "Tokyo",
            country: "Japan",
        },
        platforms: [
            {
                account_id: "yt_hanatanaka",
                influencer_id: "e8b7a78e-34e6-45b7-8bc4-c58fd88cc84a",
                social_media_url: "https://youtube.com/hanatanaka",
                platform_name: "youtube",
                audience_focus_country: "Japan",
                platform_focus: "Lifestyle",
                follower_count: 150000,
            },
            {
                account_id: "insta_hanatanaka",
                influencer_id: "e8b7a78e-34e6-45b7-8bc4-c58fd88cc84a",
                social_media_url: "https://instagram.com/hanatanaka",
                platform_name: "instagram",
                audience_focus_country: "Japan",
                platform_focus: "Food",
                follower_count: 45000,
            },
        ],
        total_follower_count: 195000,
        whatsapp_consent: true,
        whatsapp_invited: true,
        community_invited: true,
        invite_count: 4,
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
    package: "Silver Tier",
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

export const account_types = ["All", "Cafe", "Restaurant"];

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
