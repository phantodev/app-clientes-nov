import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCircle,
} from "lucide-react";

const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Clientes", path: "/dashboard/clientes", icon: Users },
    { name: "Meu Perfil", path: "/dashboard/perfil", icon: UserCircle },
  ];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="fixed left-0 top-20 w-64 h-[calc(100vh-80px)] bg-white dark:bg-gray-800 shadow-md">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-200 ease-in-out
                ${
                  active
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:scale-105"
                }
                transform hover:translate-x-1
              `}
            >
              <Icon className={`w-5 h-5 ${active ? "animate-pulse" : ""}`} />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
