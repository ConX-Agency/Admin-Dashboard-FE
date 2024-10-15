import { IconCalendarStar, IconClockPlay, IconCoffee, IconDeviceGamepad2, IconMeat, IconUserStar, IconWorldStar } from "@tabler/icons-react";

export const dummyDashboardCardData = [
    {
        label: 'Total Influencer',
        icon: (
            <IconWorldStar className="text-black dark:text-white h-4 w-4 flex-shrink-0" />
        ),
        previous: '13000',
        current: '12990',
        changes: ''
    },
    {
        label: 'Total Clients',
        icon: (
            <IconUserStar className="text-black dark:text-white h-4 w-4 flex-shrink-0" />
        ),
        previous: '13000',
        current: '14500',
        changes: ''
    },
    {
        label: 'Total Live Campaigns',
        icon: (
            <IconCalendarStar className="text-black dark:text-white h-4 w-4 flex-shrink-0" />
        ),
        previous: '200',
        current: '300',
        changes: ''
    },
    {
        label: 'Pending Services',
        icon: (
            <IconClockPlay className="text-black dark:text-white h-4 w-4 flex-shrink-0" />
        ),
        previous: '30',
        current: '75',
        changes: ''
    },
]

export const dummyLastCompletedData = [
    {
        campaign: 'Korean 80th Independence Day',
        icon: (
            <IconDeviceGamepad2 className="text-blue-500 h-1/2 w-1/2" />
        ),
        date: '14/11/2024',
        location: 'Busan, South Korea'
    },
    {
        campaign: 'Summer Fiesta',
        icon: (
            <IconCoffee className="text-blue-500 h-1/2 w-1/2" />
        ),
        date: '15/11/2024',
        location: 'Tokyo, Japan'
    },
    {
        campaign: 'Children\'s Day',
        icon: (
            <IconMeat className="text-blue-500 h-1/2 w-1/2" />
        ),
        date: '16/11/2024',
        location: 'Indiana, United States'
    },
]

export const dummyTopInfluencerData = [
    {
        name: "Felix 'xQc' Lengyel",
        previous: '900000',
        current: '1000000',
        changes: '',
        pic: 'https://github.com/shadcn.png'
    },
    {
        name: "Thomas 'Sykkuno'",
        previous: '900000',
        current: '1000000',
        changes: '',
        pic: 'https://github.com/shadcn.png'
    },
    {
        name: "Lee 'Faker' Sang-hyeok",
        previous: '900000',
        current: '1000000',
        changes: '',
        pic: 'https://github.com/shadcn.png'
    },
    {
        name: "Marc Robert 'Caedrel' Lamont",
        previous: '900000',
        current: '1000000',
        changes: '',
        pic: 'https://github.com/shadcn.png'
    },
    {
        name: "Brandon 'Atrioc' Ewing",
        previous: '900000',
        current: '1000000',
        changes: '',
        pic: 'https://github.com/shadcn.png'
    },
]

export type Activity = {
    id: string;
    type: "Instagram" | "TikTok" | "RED Pos" | "Google Review";
    quantity: number;
    campaign: string;
    influencer: string;
    end_date: string;
}

export const dummyPendingActivitiesData: Activity[] = [
    {
        id: "m5gr84i9",
        type: "Google Review",
        quantity: 5,
        campaign: "Summer Fiesta",
        influencer: "Atrioc",
        end_date: "15/10/2024"
    },
    {
        id: "3u1reuv4",
        type: "Instagram",
        quantity: 4,
        campaign: "Go Green",
        influencer: "Sykkuno",
        end_date: "16/10/2024"
    },
    {
        id: "derv1ws0",
        type: "TikTok",
        quantity: 3,
        campaign: "Children's Day",
        influencer: "Caedrel",
        end_date: "17/10/2024"
    },
    {
        id: "5kma53ae",
        type: "RED Pos",
        quantity: 2,
        campaign: "Korean 80th Independence Day",
        influencer: "Faker",
        end_date: "18/10/2024"
    },
    {
        id: "bhqecj4p",
        type: "Google Review",
        quantity: 1,
        campaign: "PWD Awareness",
        influencer: "xQc",
        end_date: "19/10/2024"
    },
]
// export const dummyDashboardData = [
//     {
//         label: 'Total Live Campaign',
//         icon: (
//             <IconWorldStar className="text-black dark:text-white mr-2 h-4 w-4 flex-shrink-0" />
//         ),
//         previous: '200',
//         current: '300',
//         changes: ''
//     },
//     {
//         label: 'Pending Services',
//         icon: (
//             <IconWorldStar className="text-black dark:text-white mr-2 h-4 w-4 flex-shrink-0" />
//         ),
//         previous: '30',
//         current: '75',
//         changes: ''
//     },
//     {
//         label: 'Campaign Success Rate',
//         icon: (
//             <IconWorldStar className="text-black dark:text-white mr-2 h-4 w-4 flex-shrink-0" />
//         ),
//         previous: '80%',
//         current: '90%',
//         changes: ''
//     },
//     {
//         label: 'Total Reach',
//         icon: (
//             <IconWorldStar className="text-black dark:text-white mr-2 h-4 w-4 flex-shrink-0" />
//         ),
//         previous: '100000',
//         current: '150000',
//         changes: ''
//     }
// ];

//Grid-Related
// export interface LayoutProps {
//     tab: TabKey;
//     setTab: React.Dispatch<React.SetStateAction<TabKey>>;
//     left?: number;
//     sliderWidth?: number;
// }

// export interface FilterType {
//     label: string;
//     key: TabKey;  // This matches your TabKey type
//     icon: JSX.Element;
// }

// export enum TabKey {
//     All = "All",
//     Campaigns = "Campaigns",
//     Influencers = "Influencers",
//     Clients = "Clients",
//     Socials = "Socials",
//     Financials = "Financials"
// }

// export const dashboardChartTypeFilters = [
//     {
//         label: "All",
//         key: TabKey.All,
//         icon: (
//             <IconList className="text-black dark:text-white h-4 w-4 flex-shrink-0" />
//         )
//     },
//     {
//         label: "Campaigns",
//         key: TabKey.Campaigns,
//         icon: (
//             <IconCalendarStar className="text-black dark:text-white h-4 w-4 flex-shrink-0" />
//         )
//     },
//     {
//         label: "Influencers",
//         key: TabKey.Influencers,
//         icon: (
//             <IconWorldStar className="text-black dark:text-white h-4 w-4 flex-shrink-0" />
//         )
//     },
//     {
//         label: "Clients",
//         key: TabKey.Clients,
//         icon: (
//             <IconUserStar className="text-black dark:text-white h-4 w-4 flex-shrink-0" />
//         )
//     },
//     {
//         label: "Socials",
//         key: TabKey.Socials,
//         icon: (
//             <IconMessageCircle className="text-black dark:text-white h-4 w-4 flex-shrink-0" />
//         )
//     },
//     {
//         label: "Financials",
//         key: TabKey.Financials,
//         icon: (
//             <IconCoin className="text-black dark:text-white h-4 w-4 flex-shrink-0" />
//         )
//     }
// ];