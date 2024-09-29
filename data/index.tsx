import {
  IconLayoutDashboard,
  IconSettings,
  IconUsers,
  IconCalendarClock,
  IconSparkles,
} from "@tabler/icons-react";

export const MainMenuLink = [
  {
    label: "Dashboard",
    href: "#",
    icon: (
      <IconLayoutDashboard className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Campaigns",
    href: "#",
    icon: (
      <IconCalendarClock className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Clients",
    href: "#",
    icon: (
      <IconUsers className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Influencers",
    href: "#",
    icon: (
      <IconSparkles className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  },
];

export const CampaignsLink = [
  {
    label: "All Campaigns",
    href: "#",
    icon: (
      <IconLayoutDashboard className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Pending Services",
    href: "#",
    icon: (
      <IconLayoutDashboard className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  }
];

export const ClientsLink = [
  {
    label: "Dashboard",
    href: "#",
    icon: (
      <IconLayoutDashboard className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  }
];

export const InfluencersLink = [
  {
    label: "Dashboard",
    href: "#",
    icon: (
      <IconLayoutDashboard className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  }
];
