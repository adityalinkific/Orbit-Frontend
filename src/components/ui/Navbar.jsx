import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <div className="navbar">
      <div className="nav-left">
        <div className="nav-logo">
          <img src="/src/assets/icons/orbit.1.svg" />
          <span className="logo-text">Orbit</span>
        </div>
      </div>

      <div className="nav-center">
        <input
          className="nav-search"
          placeholder="Search tasks, meetings, users, documents..."
        />
      </div>

      <div className="nav-actions">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
