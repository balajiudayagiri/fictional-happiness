import {
  IconApi,
  IconHelp,
  IconHome,
  IconSettings,
  // IconTicket,
} from "@tabler/icons-react";

export const sidebarItems = [
  {
    icon: <IconHome size={24} />,
    label: "Home",
    link: "/", // This will match the route /home
  },
  {
    icon: <IconApi size={24} />,
    label: "Custom API",
    link: "/custom-api",
  },
  {
    icon: <IconSettings size={24} />,
    label: "Settings",
    link: "/settings",
  },
  {
    icon: <IconHelp size={24} />,
    label: "Help center",
    link: "/help-center",
  },
];
