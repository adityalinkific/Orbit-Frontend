import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { rolesService, createRoleService } from "../../services/auth.service";
// import "./people.css";

export default function People() {
  const { user } = useAuth();

  const [roles, setRoles] = useState([]);
  const [roleForm, setRoleForm] = useState({ name: "", description: "" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  // Load roles from backend
  const refreshRoles = async () => {
    try {
      const res = await rolesService();
      console.log("ROLES 👉", res);
      if (Array.isArray(res)) setRoles(res);
      else if (Array.isArray(res.data)) setRoles(res.data);
      else setRoles([]);
    } catch (err) {
      console.error("REFRESH ROLES ERROR 👉", err);
      setRoles([]);
    }
  };

  useEffect(() => {
    refreshRoles();
  }, []);

  const createRole = async (e) => {
    e.preventDefault();

    try {
      await createRoleService(roleForm);
      setRoleForm({ name: "", description: "" });
      await refreshRoles();
    } catch (err) {
      console.error("CREATE ROLE ERROR 👉", err);
    }
  };

  // Permission-safe filter
  const filteredRoles = (roles || []).filter((r) => {
    if (user?.role === "super_admin") return r.name === "admin";
    if (user?.role === "admin") return r.name !== "super_admin";
    return false;
  });

  const submit = (e) => {
    e.preventDefault();
    console.log("CREATE USER 👉", form);
    // later hook createUserService(form)
  };

  return (
    <div className="page fade-in">
      <h1>People</h1>

      <div className="widget" style={{ maxWidth: 420 }}>
        <h3>Create User</h3>

        <form onSubmit={submit}>
          <label>Name</label>
          <input
            placeholder="John Doe"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <label>Email</label>
          <input
            placeholder="john@company.com"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <label>Role</label>
          <select
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="">Select Role</option>

            {filteredRoles.map((r) => (
              <option key={r.id || r.name} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>

          <button style={{ marginTop: 12 }}>Create User</button>
        </form>
      </div>

      <div className="widget" style={{ maxWidth: 420, marginTop: 18 }}>
        <h3>Create Role</h3>

        <form onSubmit={createRole} className="role-form">
          <label>Role name</label>
          <input
            placeholder="Role name"
            value={roleForm.name}
            onChange={(e) =>
              setRoleForm({ ...roleForm, name: e.target.value })
            }
          />

          <label>Description</label>
          <input
            placeholder="Description"
            value={roleForm.description}
            onChange={(e) =>
              setRoleForm({ ...roleForm, description: e.target.value })
            }
          />

          <button style={{ marginTop: 12 }}>Create Role</button>
        </form>
      </div>
    </div>
  );
}
