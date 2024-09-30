import {
  IconLayoutDashboard,
  IconWorldPlus,
  IconWorldCog,
  IconCalendarClock,
  IconCalendarMonth,
  IconUserPlus,
  IconUserCog,
  IconFlag3,
  IconInfoCircle,
  IconSettings,

} from "@tabler/icons-react";

export const MainMenuLink = [
  {
    label: "Dashboard",
    href: "#",
    icon: (
      <IconLayoutDashboard className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  },
];

export const CampaignsLink = [
  {
    label: "All Campaigns",
    href: "#",
    icon: (
      <IconCalendarMonth className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Pending Services",
    href: "#",
    icon: (
      <IconCalendarClock className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  }
];

export const ClientsLink = [
  {
    label: "Add Clients",
    href: "#",
    icon: (
      <IconUserPlus className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "View / Edit Clients",
    href: "#",
    icon: (
      <IconUserCog className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  }
];

export const InfluencersLink = [
  {
    label: "Add Influencers",
    href: "#",
    icon: (
      <IconWorldPlus className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "View / Edit Influencers",
    href: "#",
    icon: (
      <IconWorldCog className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  }
];

export const SettingsLink = [
  {
    label: "Help Center",
    href: "#",
    icon: (
      <IconInfoCircle className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Settings",
    href: "#",
    icon: (
      <IconSettings className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Report",
    href: "#",
    icon: (
      <IconFlag3 className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  }
];
