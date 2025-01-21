export interface SocialMediaPlatform {
  account_id?: string;
  influencer_id?: string;
  social_media_url: string;
  platform_name: 'instagram' | 'tiktok' | 'youtube' | 'RED';
  account_type: "Food Influencer" | "Photographer";
  platform_focus: 'UGC' | 'Food' | 'Lifestyle';
  follower_count: number;
}

export interface Influencer {
  influencer_id: string;
  full_name: string;
  preferred_name: string;
  contact_number: string;
  alt_contact_number: string;
  email_address: string;
  country: string;
  state: string;
  city: string;
  postcode: string;
  address: string;
  platforms: SocialMediaPlatform[];
  total_follower_count: number;
  multiple_countries?: boolean;
  additional_country: boolean;
  industry: "Food & Beverage";
  whatsapp_consent: boolean;
  whatsapp_invited?: boolean;
  community_invited?: boolean;
  invite_count: number;
  is_membership: boolean;
  rate: string;
  tnc_consent?: boolean;
  category: "Undecided" | "Micro" | "Nano" | "Macro";
  status: 'Active' | 'Pending Approval' | 'Blacklisted' | 'Cancelled';
}

export const dummyInfluencerData: Influencer[] = [
  {
    influencer_id: 'eb626727-ea74-4de7-87ab-db79039c5042',
    full_name: 'Emily Carter',
    preferred_name: 'Emmy',
    contact_number: '+11234567890',
    alt_contact_number: '+11234567891',
    email_address: 'emmy.carter@example.com',

    address: '123 Maple Street',
    city: 'Los Angeles',
    postcode: '90001',
    state: 'California',
    country: 'United States',
    platforms: [
      {
        social_media_url: 'https://instagram.com/emily123',
        platform_name: 'instagram',
        account_type: 'Food Influencer',
        platform_focus: 'Lifestyle',
        follower_count: 250000,
      },
      {
        social_media_url: 'https://tiktok.com/@emily123',
        platform_name: 'tiktok',
        account_type: 'Food Influencer',
        platform_focus: 'UGC',
        follower_count: 500000,
      },
    ],
    total_follower_count: 750000,
    whatsapp_consent: true,
    whatsapp_invited: false,
    community_invited: true,
    invite_count: 3,
    multiple_countries: false,
    additional_country: false,
    is_membership: false,
    rate: '0',
    category: 'Micro',
    status: 'Active',
    industry: 'Food & Beverage',
  },
  {
    influencer_id: '1ba79f5d-e465-4287-85fd-c39b19dfcee1',
    full_name: 'Daniel Kim',
    preferred_name: 'Danny',
    contact_number: '+12345678901',
    alt_contact_number: '+12345678902',
    email_address: 'danny.kim@example.com',
    address: '456 Oak Lane',
    city: 'Toronto',
    postcode: 'M4B 1B3',
    state: 'Ontario',
    country: 'Canada',
    platforms: [
      {
        social_media_url: 'https://youtube.com/dannykim',
        platform_name: 'youtube',
        account_type: 'Photographer',
        platform_focus: 'UGC',
        follower_count: 120000,
      },
    ],
    total_follower_count: 120000,
    whatsapp_consent: false,
    whatsapp_invited: true,
    community_invited: false,
    invite_count: 1,
    multiple_countries: false,
    additional_country: false,
    is_membership: false,
    rate: '0',
    category: 'Nano',
    status: 'Active',
    industry: 'Food & Beverage',
  },
  {
    influencer_id: '9d7c1722-18e7-4c99-94ed-a22f41f34e04',
    full_name: 'Sophia Martinez',
    preferred_name: 'Soph',
    contact_number: '+441234567890',
    alt_contact_number: '+441234567891',
    email_address: 'soph.martinez@example.com',
    address: '789 Pine Road',
    city: '',
    postcode: 'E1 6AN',
    state: 'Strabane District Council',
    country: 'United Kingdom',
    platforms: [
      {
        social_media_url: 'https://instagram.com/sophmart',
        platform_name: 'instagram',
        account_type: 'Food Influencer',
        platform_focus: 'Food',
        follower_count: 95000,
      },
      {
        social_media_url: 'https://red.com/sophmart',
        platform_name: 'RED',
        account_type: 'Food Influencer',
        platform_focus: 'Food',
        follower_count: 80000,
      },
    ],
    total_follower_count: 175000,
    whatsapp_consent: true,
    whatsapp_invited: true,
    community_invited: true,
    invite_count: 5,
    multiple_countries: false,
    additional_country: false,
    is_membership: false,
    rate: '0',
    category: 'Nano',
    status: 'Active',
    industry: 'Food & Beverage',
  },
  {
    influencer_id: 'c4ee145b-2781-4070-a00d-2862e19c2a4a',
    full_name: 'Aarav Patel',
    preferred_name: 'Aarav',
    contact_number: '+914567890123',
    alt_contact_number: '+914567890124',
    email_address: 'aarav.patel@example.com',
    address: '321 Cedar Avenue',
    city: 'Mumbai',
    postcode: '400001',
    state: 'Maharashtra',
    country: 'India',
    platforms: [
      {
        social_media_url: 'https://tiktok.com/@aaravp',
        platform_name: 'tiktok',
        account_type: 'Food Influencer',
        platform_focus: 'UGC',
        follower_count: 300000,
      },
    ],
    total_follower_count: 300000,
    whatsapp_consent: true,
    whatsapp_invited: false,
    community_invited: false,
    invite_count: 2,
    multiple_countries: false,
    additional_country: false,
    is_membership: false,
    rate: '0',
    category: 'Micro',
    status: 'Active',
    industry: 'Food & Beverage',
  },
  {
    influencer_id: 'e8b7a78e-34e6-45b7-8bc4-c58fd88cc84a',
    full_name: 'Hana Tanaka',
    preferred_name: 'Hana',
    contact_number: '+815678901234',
    alt_contact_number: '+815678901235',
    email_address: 'hana.tanaka@example.com',
    address: '654 Willow Lane',
    city: 'Edogawa Ku',
    postcode: '100-0001',
    state: 'Tokyo',
    country: 'Japan',
    platforms: [
      {
        social_media_url: 'https://youtube.com/hanatanaka',
        platform_name: 'youtube',
        account_type: 'Photographer',
        platform_focus: 'Lifestyle',
        follower_count: 150000,
      },
      {
        social_media_url: 'https://instagram.com/hanatanaka',
        platform_name: 'instagram',
        account_type: 'Food Influencer',
        platform_focus: 'Food',
        follower_count: 45000,
      },
    ],
    total_follower_count: 195000,
    whatsapp_consent: true,
    whatsapp_invited: true,
    community_invited: true,
    invite_count: 4,
    multiple_countries: false,
    additional_country: false,
    is_membership: false,
    rate: '0',
    category: 'Micro',
    status: 'Active',
    industry: 'Food & Beverage',
  },
];
