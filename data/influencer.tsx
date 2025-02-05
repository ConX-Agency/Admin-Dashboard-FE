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

export type InfluencerWithPlatforms = Influencer & { platforms: SocialMediaPlatform[] };

export const dummySocialMediaPlatforms: SocialMediaPlatform[] = [
  {
    influencer_id: 'INF001',
    social_media_url: 'https://instagram.com/emily123',
    platform_name: 'instagram',
    account_type: 'Food Influencer',
    platform_focus: 'Lifestyle',
    follower_count: 250000,
  },
  {
    influencer_id: 'INF001',
    social_media_url: 'https://tiktok.com/@emily123',
    platform_name: 'tiktok',
    account_type: 'Food Influencer',
    platform_focus: 'UGC',
    follower_count: 500000,
  },
  {
    influencer_id: 'INF002',
    social_media_url: 'https://youtube.com/dannykim',
    platform_name: 'youtube',
    account_type: 'Photographer',
    platform_focus: 'UGC',
    follower_count: 120000,
  },
  {
    influencer_id: 'INF003',
    social_media_url: 'https://instagram.com/sophmart',
    platform_name: 'instagram',
    account_type: 'Food Influencer',
    platform_focus: 'Food',
    follower_count: 95000,
  },
  {
    influencer_id: 'INF003',
    social_media_url: 'https://red.com/sophmart',
    platform_name: 'RED',
    account_type: 'Food Influencer',
    platform_focus: 'Food',
    follower_count: 80000,
  },
  {
    influencer_id: 'INF004',
    social_media_url: 'https://tiktok.com/@aaravp',
    platform_name: 'tiktok',
    account_type: 'Food Influencer',
    platform_focus: 'UGC',
    follower_count: 300000,
  },
  {
    influencer_id: 'INF005',
    social_media_url: 'https://youtube.com/hanatanaka',
    platform_name: 'youtube',
    account_type: 'Photographer',
    platform_focus: 'Lifestyle',
    follower_count: 150000,
  },
  {
    influencer_id: 'INF005',
    social_media_url: 'https://instagram.com/hanatanaka',
    platform_name: 'instagram',
    account_type: 'Food Influencer',
    platform_focus: 'Food',
    follower_count: 45000,
  },
];

export const dummyInfluencerData: Influencer[] = [
  {
    influencer_id: 'INF001',
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
    influencer_id: 'INF002',
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
    influencer_id: 'INF003',
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
    influencer_id: 'INF004',
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
    influencer_id: 'INF005',
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
export const dummyInfluencerDataWithPlatforms: InfluencerWithPlatforms[] = dummyInfluencerData.map(influencer => ({
  ...influencer,
  platforms: dummySocialMediaPlatforms.filter(platform => platform.influencer_id === influencer.influencer_id),
}));

export const getSocialMediaPlatformsByInfluencerId = (influencerId: string): SocialMediaPlatform[] => {
  return dummySocialMediaPlatforms.filter(platform => platform.influencer_id === influencerId);
};

export const getTotalFollowerCountByInfluencerId = (influencerId: string): number => {
  const platforms = getSocialMediaPlatformsByInfluencerId(influencerId);
  return platforms.reduce((total, platform) => total + platform.follower_count, 0);
};