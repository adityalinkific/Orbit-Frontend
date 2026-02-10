import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const allMenus = {
  super_admin: [
    { name: "Dashboard", icon: "📋", path: "/dashboard" },
    { name: "People", icon: "👥", path: "/people" },
    { name: "Departments", icon: "🏢", path: "/departments" },
    { name: "Settings", icon: "⚙️", path: "/settings" },
  ],

  admin: [
    { name: "Dashboard", icon: "📋", path: "/dashboard" },
    { name: "People", icon: "👥", path: "/people" },
    { name: "Projects", icon: "📁", path: "/projects" },
    { name: "Departments", icon: "🏢", path: "/departments" },
    { name: "Analytics", icon: "📊", path: "/analytics" },
    { name: "Settings", icon: "⚙️", path: "/settings" },
  ],

  manager: [
    { name: "Dashboard", icon: "📋", path: "/dashboard" },
    { name: "Projects", icon: "📁", path: "/projects" },
    { name: "People", icon: "👥", path: "/people" },
  ],

  employee: [
    { name: "Dashboard", icon: "📋", path: "/dashboard" },
    { name: "Projects", icon: "📁", path: "/projects" },
  ],

  intern: [
    { name: "Dashboard", icon: "📋", path: "/dashboard" },
  ],
};

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const { user } = useAuth();

  const role = user?.role || "super_admin";
  const menuItems = allMenus[role] || allMenus.super_admin;

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top">
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "➡" : "⬅"}
        </button>
      </div>

      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            <span className="side-icon">{item.icon}</span>
            {!collapsed && <span className="side-text">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
