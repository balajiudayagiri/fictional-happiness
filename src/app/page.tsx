import Sidebar from "@/components/ui/Sidebar";
import {
  IconFileText,
  IconHome,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";

export default function Page() {
  const sidebarItems = [
    {
      icon: <IconHome size={24} />,
      label: "Home",
      link: "/", // This will match the route /home
    },
    {
      icon: <IconFileText size={24} />,
      label: "Documents",
      link: "/documents",
    },
    {
      icon: <IconSettings size={24} />,
      label: "Settings",
      link: "/settings",
    },
    {
      icon: <IconUser size={24} />,
      label: "Profile",
      link: "/profile",
    },
  ];

  return (
    <Sidebar items={sidebarItems}>
      <h1 className="text-xl">Main Content Area</h1>
      <p>
        This is the content area where the main application will be displayed.
      </p>
    </Sidebar>
  );
}
