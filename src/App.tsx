import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import NotFoundPage from "@/pages/not-found";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardPage from "@/pages/dashboard/index";
import ClientesPage from "@/pages/dashboard/clientes";
import PerfilPage from "@/pages/dashboard/perfil";
import RouterGuard from "./components/RouterGuard";
import Dropzone from "./pages/dashboard/dropzone";
import WebcamPage from "./pages/dashboard/webcam";

export default function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />

      {/* Dashboard Routes - Nested Routes */}
      <Route element={<RouterGuard><DashboardLayout /></RouterGuard>} path="/dashboard">
        <Route element={<WebcamPage />} path="webcam" />
        <Route index element={<DashboardPage />} />
        <Route element={<ClientesPage />} path="clientes" />
        <Route element={<PerfilPage />} path="perfil" />
        <Route element={<Dropzone />} path="dropzone" />
      </Route>

      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}
