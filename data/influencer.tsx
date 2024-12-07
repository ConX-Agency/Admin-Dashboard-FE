export interface influencerAddress {
    id?: number;
    address: string;
    city: string;
    postcode: string;
    state: string;
    country: string;
}

export interface SocialMediaPlatform {
    type: "instagram" | "tiktok" | "youtube" | "RED";
    industry: string;
    audience_focus_country: string;
    platform_focus: string;
    follower_count: number;
    
}

export interface Influencer {
    influencer_id: string;
    full_name: string;
    preferred_name: string;
    contact_no: string;
    alt_contact_no: string;
    email_address: string;
    address: influencerAddress;
    platforms: SocialMediaPlatform[];
    total_follower_count: number;
}

export const dummyInfluencerData: Influencer[] = [
    {
        influencer_id: "eb626727-ea74-4de7-87ab-db79039c5042",
        full_name: "Emily Carter",
        preferred_name: "Emmy",
        contact_no: "123-456-7890",
        alt_contact_no: "123-456-7891",
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
                type: "instagram",
                industry: "Fashion",
                audience_focus_country: "USA",
                platform_focus: "Influencer",
                follower_count: 250000,
            },
            {
                type: "tiktok",
                industry: "Lifestyle",
                audience_focus_country: "USA",
                platform_focus: "Content Creation",
                follower_count: 500000,
            },
        ],
        total_follower_count: 750000
    },
    {
        influencer_id: "1ba79f5d-e465-4287-85fd-c39b19dfcee1",
        full_name: "Daniel Kim",
        preferred_name: "Danny",
        contact_no: "234-567-8901",
        alt_contact_no: "234-567-8902",
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
                type: "youtube",
                industry: "Technology",
                audience_focus_country: "Canada",
                platform_focus: "Tech Reviews",
                follower_count: 120000,
            },
        ],
        total_follower_count: 120000
    },
    {
        influencer_id: "9d7c1722-18e7-4c99-94ed-a22f41f34e04",
        full_name: "Sophia Martinez",
        preferred_name: "Soph",
        contact_no: "345-678-9012",
        alt_contact_no: "345-678-9013",
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
                type: "instagram",
                industry: "Food",
                audience_focus_country: "UK",
                platform_focus: "Food Review",
                follower_count: 95000,
            },
            {
                type: "RED",
                industry: "Travel",
                audience_focus_country: "China",
                platform_focus: "Travel Vlogs",
                follower_count: 80000,
            },
        ],
        total_follower_count: 175000
    },
    {
        influencer_id: "c4ee145b-2781-4070-a00d-2862e19c2a4a",
        full_name: "Aarav Patel",
        preferred_name: "Aarav",
        contact_no: "456-789-0123",
        alt_contact_no: "456-789-0124",
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
                type: "tiktok",
                industry: "Comedy",
                audience_focus_country: "India",
                platform_focus: "Short Skits",
                follower_count: 300000,
            },
        ],
        total_follower_count: 300000
    },
    {
        influencer_id: "eb626727-ea74-4de7-87ab-db79039c5042",
        full_name: "Hana Tanaka",
        preferred_name: "Hana",
        contact_no: "567-890-1234",
        alt_contact_no: "567-890-1235",
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
                type: "youtube",
                industry: "Gaming",
                audience_focus_country: "Japan",
                platform_focus: "Game Streaming",
                follower_count: 150000,
            },
            {
                type: "instagram",
                industry: "Art",
                audience_focus_country: "Japan",
                platform_focus: "Digital Art",
                follower_count: 45000,
            },
        ],
        total_follower_count: 195000
    },
];