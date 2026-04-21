import { X } from "lucide-react";

export default function ProjectModal({
  open,
  onClose,
  onSubmit,
  formData,
  setFormData,
  departments,
  users,
  editingProject,
}) {
  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-xl p-6">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        {/* TITLE */}
        <h2 className="text-lg font-semibold text-gray-900">
          {editingProject ? "Edit Project" : "Create Project"}
        </h2>

        <p className="text-sm text-gray-500 mt-1 mb-4">
          Define project details including owner and timeline.
        </p>

        {/* FORM */}
        <div className="space-y-4">

          {/* NAME */}
          <div>
            <label className="text-xs text-gray-500 font-medium">
              PROJECT NAME
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* ROW */}
          <div className="grid grid-cols-2 gap-4">

            {/* DEPARTMENT */}
            <div>
              <label className="text-xs text-gray-500 font-medium">
                DEPARTMENT
              </label>
              <select
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="">Select Dept</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* OWNER */}
            <div>
              <label className="text-xs text-gray-500 font-medium">
                OWNER
              </label>
              <select
                name="owner_id"
                value={formData.owner_id}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="">Assign Owner</option>
                {Array.isArray(users) &&
                  users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name || u.email}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* DATES */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col ">
              <label className="text-xs text-gray-500 font-medium mb-2">
                START DATE
              </label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            </div>
                  <div className="flex flex-col">
              <label className="text-xs text-gray-500 font-medium mb-2">
                END DATE
              </label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            </div>

          </div>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="text-sm text-gray-500">
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md"
          >
            {editingProject ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
