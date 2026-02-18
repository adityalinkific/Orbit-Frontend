import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { rolesService, departmentsService } from "../../services/auth.service";
import {
  getAllUsers,
  createUserService,
  deleteUserService,
} from "../../services/user.service";

export default function People() {
  const { user } = useAuth();

  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role_id: "",
    reporting_manager_id: null,
    department_id: "",
    is_active: true,
    joined_date: new Date().toISOString().split("T")[0],
  });

  /* ---------------- FETCH ROLES ---------------- */
  const refreshRoles = async () => {
    try {
      const res = await rolesService();
      setRoles(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("Failed to fetch roles:", err);
    }
  };

  /* ---------------- FETCH USERS ---------------- */
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  /* ---------------- FETCH DEPARTMENTS ---------------- */
  const fetchDepartments = async () => {
    try {
      setLoadingDepartments(true);
      const data = await departmentsService();
      setDepartments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch departments:", err);
    } finally {
      setLoadingDepartments(false);
    }
  };

  useEffect(() => {
    refreshRoles();
    fetchUsers();
    fetchDepartments();
  }, []);

  /* ---------------- CREATE USER ---------------- */
  /* ---------------- CREATE USER ---------------- */
  const submit = async (e) => {
    e.preventDefault();
    try {
      await createUserService({
        name: form.name,
        email: form.email,
        password: form.password,
        role_id: Number(form.role_id),
        department_id: Number(form.department_id),
        reporting_manager_id: form.reporting_manager_id,
        is_active: form.is_active,
        joined_date: form.joined_date,
      });
      await fetchUsers();
      setOpen(false);
      setForm({
        name: "",
        email: "",
        password: "",
        role_id: "",
        reporting_manager_id: null,
        department_id: "",
        is_active: true,
        joined_date: new Date().toISOString().split("T")[0],
      });
      alert("User created successfully");
    } catch (err) {
      console.error("Failed to create user:", err);
      alert(err.message || "Failed to create user");
    }
  };

  /* ---------------- DELETE CURRENT USER ---------------- */
  const remove = async () => {
    try {
      await deleteUserService();
      alert("Current user deleted (backend limitation).");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="page people-page">
      <div className="people-header">
        <h1>People</h1>
        <button className="primary-btn" onClick={() => setOpen(true)}>
          + Create User
        </button>
      </div>

      <div className="widget people-card">
        <table className="people-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loadingUsers ? (
              <tr>
                <td colSpan="4">Loading users...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="4">No users found</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role?.role || "N/A"}</td>
                  <td>{user.is_active ? "Active" : "Inactive"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="modal-backdrop">
          <div className="widget modal-card">
            <h3>Create User</h3>
            <form onSubmit={submit} className="people-form">
              <input
                placeholder="Full Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />

              <select
                value={form.role_id}
                onChange={(e) =>
                  setForm({ ...form, role_id: e.target.value })
                }
                required
              >
                <option value="">Select Role</option>
                {roles.map((r, i) => (
                  <option key={r.id} value={r.id}>
                    {r.role}
                  </option>
                ))}
              </select>

              <select
                value={form.department_id}
                onChange={(e) =>
                  setForm({ ...form, department_id: e.target.value })
                }
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={form.joined_date}
                onChange={(e) =>
                  setForm({ ...form, joined_date: e.target.value })
                }
                required
              />

              <label style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) =>
                    setForm({ ...form, is_active: e.target.checked })
                  }
                />
                Active
              </label>

              <div className="form-actions">
                <button className="primary-btn">Create</button>
                <button type="button" onClick={() => setOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
