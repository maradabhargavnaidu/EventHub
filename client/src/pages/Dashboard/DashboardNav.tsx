import UserProfileSnapshot from "@/components/dashboard/UserProfileSnapShot";
import { SidebarTrigger } from "@/components/ui/sidebar";

const DashboardNav = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-5">
        <SidebarTrigger className="cursor-pointer" />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>

      <UserProfileSnapshot />
    </div>
  );
};

export default DashboardNav;
