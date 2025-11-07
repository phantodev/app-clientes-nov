import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useMainStore } from "@/stores/main.store";
import { userService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function DashboardLayout() {

  const { setUser  } = useMainStore();

  const {data} = useQuery({
    queryKey: ['user'],
    queryFn: () => userService.getUserById("17"),
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);
  
  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <Header/>

      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <main className="ml-64 mt-20 p-6 h-[calc(100vh-80px)] overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
