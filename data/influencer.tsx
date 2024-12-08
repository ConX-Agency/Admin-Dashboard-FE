export interface influencerAddress {
    id?: number;
    country: string;
    state: string;
    city: string;
    postcode: string;
    address: string;
}

export interface SocialMediaPlatform {
    account_id: string;
    influencer_id: string;
    social_media_url: string;
    platform_name: "instagram" | "tiktok" | "youtube" | "RED";
    audience_focus_country: string;
    platform_focus: "UGC" | "Food" | "Lifestyle";
    follower_count: number;
}

export interface Influencer {
    influencer_id: string;
    full_name: string;
    preferred_name: string;
    contact_number: string;
    alt_contact_number: string;
    email_address: string;
    address: influencerAddress;
    platforms: SocialMediaPlatform[];
    total_follower_count: number;
    whatsapp_consent: boolean;
    whatsapp_invited?: boolean;
    community_invited?: boolean;
    invite_count: number;
}

export const dummyInfluencerData: Influencer[] = [
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
];
