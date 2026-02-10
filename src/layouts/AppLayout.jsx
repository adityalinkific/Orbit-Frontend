import { useState } from "react";
import Navbar from "../components/ui/Navbar";
import Sidebar from "../components/ui/Sidebar";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;

  return (
    <div className="app-root">
      <Navbar />

      <div className="app-body">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
