import { Avatar } from "@heroui/avatar";
import { Wrench, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white dark:bg-gray-800 shadow-md z-50 flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Wrench className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Auto Oficina
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Sistema de Gestão
          </p>
        </div>
      </div>

      {/* User Info & Logout */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800 dark:text-white">
            Seja bem-vindo
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            João Silva
          </p>
        </div>
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          size="md"
          radius="md"
          className="cursor-pointer"
        />
        <button
          onClick={handleLogout}
          className="p-2 cursor-pointer rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
          title="Sair"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
