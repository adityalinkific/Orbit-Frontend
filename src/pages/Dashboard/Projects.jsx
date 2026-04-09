import { Funnel, Plus, X, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllProjects } from "../../services/project.service";
import ProjectCard from "../../components/projects/ProjectCard";

export default function Projects() {
  const [tab, setTab] = useState("active");
  const [openModal, setOpenModal] = useState(false);

   const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const data = await getAllProjects();

      // 🔥 transform backend → UI
      const formatted = data.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        department: "ENGINEERING", // temp (replace later)
        status: "active", // dynamic later
        progress: Math.floor(Math.random() * 100), // temp
        owner: "John Doe", // replace later
        tasks: Math.floor(Math.random() * 50),
        overdue: Math.floor(Math.random() * 5),
      }));

      setProjects(formatted);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="relative z-20 min-h-screen bg-gray-50 p-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 mb-1">
          Projects
        </h1>
        <p className="text-gray-500 text-sm">
          Manage and track your organization's active initiatives.
        </p>
      </div>

      {/* ACTION BAR */}
      <div className="px-6 py-4 flex gap-2 items-center">
        <div className="shadow-md rounded-sm bg-[#f1f5f9]">
          <button
            onClick={() => setTab("active")}
            className={`px-4 py-1.5 text-sm rounded-sm font-medium ${
              tab === "active"
                ? "bg-white text-blue-500"
                : "text-gray-600"
            }`}
          >
            Active
          </button>

          <button
            onClick={() => setTab("archived")}
            className={`px-4 py-1.5 text-sm rounded-sm font-medium ${
              tab === "archived"
                ? "bg-white text-blue-500"
                : "text-gray-600"
            }`}
          >
            Archived
          </button>
        </div>

        <button className="flex gap-1 text-sm items-center bg-white px-4 py-1.5 font-medium rounded-sm border border-gray-300">
          <Funnel size={16} />
          Filter
        </button>

        <button
          onClick={() => setOpenModal(true)}
          className="flex gap-1 text-sm items-center px-4 py-1.5 font-medium rounded-sm bg-[#005fff] text-white"
        >
          <Plus size={16} />
          Create Project
        </button>
      </div>
      {/* PROJECT GRID */}
<div className="px-6 mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  {loading ? (
    <p>Loading...</p>
  ) : (
    <>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}

      {/* ADD NEW CARD */}
      <div
        onClick={() => setOpenModal(true)}
        className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer transition"
      >
        <div className="text-3xl mb-2">+</div>
        <p className="font-medium">Start New Project</p>
        <p className="text-xs">Define a new initiative.</p>
      </div>
    </>
  )}
</div>


      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-xl shadow-xl p-6">
            
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

            {/* TITLE */}
            <h2 className="text-lg font-semibold text-gray-900">
              Create Project
            </h2>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              Define a new enterprise initiative with its owner, scope and timeline.
            </p>

            {/* FORM */}
            <div className="space-y-4">
              
              {/* PROJECT NAME */}
              <div>
                <label className="text-xs text-gray-500 font-medium">
                  PROJECT NAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. Project Quantum Leap"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* ROW */}
              <div className="grid grid-cols-2 gap-4">
                
                <div>
                  <label className="text-xs text-gray-500 font-medium">
                    DEPARTMENT
                  </label>
                  <select className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                    <option>Select Dept</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-500 font-medium">
                    OWNER
                  </label>
                  <select className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                    <option>Assign Owner</option>
                  </select>
                </div>
              </div>

              {/* DATE ROW */}
              <div className="grid grid-cols-2 gap-4">
                
                <div>
                  <label className="text-xs text-gray-500 font-medium">
                    START DATE
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 font-medium">
                    END DATE
                  </label>
                  <input
                    type="date"
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-xs text-gray-500 font-medium">
                  DESCRIPTION
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief summary..."
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpenModal(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>

              <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700">
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
