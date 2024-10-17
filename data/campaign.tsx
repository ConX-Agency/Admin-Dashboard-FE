export const dummyCampaignsData = [
    {
        id: "m5gr84i9",
        campaign: "80th Korean Independence Day",
        name: "SKT T1 Cafe & Arena",
        location: "Busan, Korea",
        description: "",
        tags: [
            "Cafe",
            "Independence Day",
            "Event",
            "Korean Culture"
        ],
        min_influencers: 10,
        max_influencers: 50,
        influencers: [
            {
                name: "Faker",
            }
        ],
        activities_remaining: 10,
        start_date: "14/10/2024",
        end_date: "14/11/2024",
        status: 'Active'
    },
    {
        id: "3u1reuv4",
        campaign: "Summer Fiesta",
        name: "Honey Toast Cafe Akihabara",
        location: "Tokyo, Japan",
        description: "",
        tags: [
            "Cafe",
            "Summer",
            "Event",
            "Celebration"
        ],
        min_influencers: 10,
        max_influencers: 50,
        influencers: [
            {
                name: "Atrioc",
            }
        ],
        activities_remaining: 10,
        start_date: "15/10/2024",
        end_date: "15/11/2024",
        status: 'Cancelled'
    },
    {
        id: "derv1ws0",
        campaign: "Children's Day",
        name: "St. Elmo Steak House",
        location: "Indiana, United States",
        description: "",
        tags: [
            "Restaurant",
            "Children's Day",
            "Family",
            "Event"
        ],
        min_influencers: 10,
        max_influencers: 50,
        influencers: [
            {
                name: "Caedrel",
            }
        ],
        activities_remaining: 10,
        start_date: "16/10/2024",
        end_date: "16/11/2024",
        status: 'Active'
    },
    {
        id: "5kma53ae",
        campaign: "Go Green",
        name: "Real Food",
        location: "Kuala Lumpur, Malaysia",
        description: "",
        tags: [
            "Restaurant",
            "Sustainability",
            "Health",
            "Eco-Friendly"
        ],
        min_influencers: 10,
        max_influencers: 50,
        influencers: [
            {
                name: "Sykkuno",
            }
        ],
        activities_remaining: 10,
        start_date: "17/10/2024",
        end_date: "17/11/2024",
        status: 'Active'
    },
    {
        id: "bhqecj4p",
        campaign: "PWD Awareness",
        name: "Stand Pie Me Cafe",
        location: "Petaling Jaya, Malaysia",
        description: "",
        tags: [
            "Cafe",
            "Awareness",
            "Disability",
            "Social Impact"
        ],
        min_influencers: 10,
        max_influencers: 50,
        influencers: [
            {
                name: "xQc",
            }
        ],
        activities_remaining: 10,
        start_date: "18/10/2024",
        end_date: "18/11/2024",
        status: 'Completed'
    },
];


export interface IconWithToolTipProps {
    IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    tooltip: string;
}