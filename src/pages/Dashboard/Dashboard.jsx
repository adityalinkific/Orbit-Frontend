
import { useEffect, useState } from "react";
import { meService, healthService } from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";
import "./dashboard.css";

export default function Dashboard() {
  const [me, setMe] = useState(null);
  const [health, setHealth] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    meService()
      .then((res) => {
        console.log("ME 👉", res);
        setMe(res);
      })
      .catch(console.error);

    healthService()
      .then((res) => {
        console.log("HEALTH 👉", res);
        setHealth(res);
      })
      .catch(console.error);
  }, []);

  const role = me?.role || user?.role || "employee";

  const widgetsByRole = {
    super_admin: ["Users", "Departments", "System Health", "Security"],
    admin: ["Users", "Projects", "Reports", "Performance"],
    manager: ["Team", "Projects", "Tasks", "Progress"],
    employee: ["My Tasks", "My Projects", "Activity", "Performance"],
    intern: ["My Tasks", "Learning", "Mentor", "Progress"],
  };

  const widgets = widgetsByRole[role] || widgetsByRole.employee;

  return (
    <div className="page fade-in">
      <h1>Dashboard</h1>

      <p style={{ opacity: 0.7 }}>
        Welcome back, <b>{me?.name || user?.email}</b> — Role:{" "}
        <b>{role}</b>
      </p>

      <div className="widget-grid">
        {widgets.map((w) => (
          <div key={w} className="widget">
            {w}
          </div>
        ))}
      </div>

      {health && role !== "intern" && (
        <div className="widget" style={{ marginTop: "20px" }}>
          <h3>System Health</h3>
          <p>
            Status: <b>{health.status || "OK"}</b>
          </p>
          <p>Service: {health.service || "Auth API"}</p>
        </div>
      )}

      {me && (
        <div className="widget" style={{ marginTop: "20px" }}>
          <h3>My Profile</h3>
          <p>
            <b>Name:</b> {me.name || "-"}
          </p>
          <p>
            <b>Email:</b> {me.email || "-"}
          </p>
          <p>
            <b>Role:</b> {me.role || "-"}
          </p>
          <p>
            <b>Department:</b> {me.department || "-"}
          </p>
        </div>
      )}
    </div>
  );
}
