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
  IconMoodPlus,
  IconLogin,
  IconUser,
  IconLogout,
  IconWorldStar,
} from "@tabler/icons-react";

//Navigation Links
export const MainMenuLink = [
  {
    label: "Dashboard",
    href: "/",
    icon: (
      <IconLayoutDashboard className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  },
];

export const CampaignsLink = [
  {
    label: "All Campaigns",
    href: "/campaigns/all-campaigns",
    icon: (
      <IconCalendarMonth className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Pending Services",
    href: "/campaigns/pending-services",
    icon: (
      <IconCalendarClock className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  }
];

export const ClientsLink = [
  {
    label: "Manage Clients",
    href: "/clients/manage-clients",
    icon: (
      <IconUserCog className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  }
];

export const InfluencersLink = [
  {
    label: "Manage Influencers",
    href: "/influencers/manage-influencers",
    icon: (
      <IconWorldCog className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  }
];

export const SettingsLink = [
  {
    label: "Help Center",
    href: "/settings/help-center",
    icon: (
      <IconInfoCircle className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Settings",
    href: "/settings/settings",
    icon: (
      <IconSettings className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Report",
    href: "/settings/report",
    icon: (
      <IconFlag3 className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    ),
  }
];


export const profileLinks = [
  {
    icon: (
      <IconMoodPlus className="text-black dark:text-white mr-2 h-4 w-4 flex-shrink-0" />
    ),
    label: "Sign Up",
    shortcut: "⇧⌘S",

  },
  {
    icon: (
      <IconLogin className="text-black dark:text-white mr-2 h-4 w-4 flex-shrink-0" />
    ),
    label: "Login",
    shortcut: "⇧⌘G",
    href: "/auth/login"
  },
  {
    icon: (
      <IconUser className="text-black dark:text-white mr-2 h-4 w-4 flex-shrink-0" />
    ),
    label: "Profile",
    shortcut: "⇧⌘P"
  },
  {
    icon: (
      <IconLogout className="text-black dark:text-white mr-2 h-4 w-4 flex-shrink-0" />
    ),
    label: "Logout",
    shortcut: "⇧⌘L"
  },
];

export const dummyNotificationData = [
  {
      userPfp: "https://github.com/shadcn.png",
      username: "System",
      description: "Completed system upgrade to Patch v1.10",
      badge: "General",
      badgeColor: "neutral",
      time: "1h"
  },
  {
      userPfp: "https://github.com/shadcn.png",
      username: "Ryan Lim",
      description: "has completed the TCG Campaign.",
      badge: "Update",
      badgeColor: "blue",
      time: "2h"
  },
  {
      userPfp: "https://github.com/shadcn.png",
      username: "John Doe",
      description: "asked where is the advertisement test?",
      badge: "Client",
      badgeColor: "red",
      time: "3h"
  },
  {
      userPfp: "https://github.com/shadcn.png",
      username: "Jane Doe",
      description: "asked when will she be receiving payment?",
      badge: "Influencer",
      badgeColor: "red",
      time: "4h"
  },
  {
      userPfp: "https://github.com/shadcn.png",
      username: "Irfan Zafri",
      description: "added 2 new influencers into the system.",
      badge: "Update",
      badgeColor: "blue",
      time: "5h"
  }
];