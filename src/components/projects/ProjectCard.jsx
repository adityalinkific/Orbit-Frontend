export default function ProjectCard({ project }) {
  const {
    name,
    description,
    department,
    status = "active",
    progress = 0,
    owner = "Unassigned",
    tasks = 0,
    overdue = 0,
  } = project;

  const statusStyles = {
    active: "bg-blue-100 text-blue-600",
    completed: "bg-green-100 text-green-600",
    delayed: "bg-red-100 text-red-600",
    risk: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
      
      {/* TOP BADGES */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold px-2 py-1 rounded-md bg-gray-100 text-gray-600">
          {department || "GENERAL"}
        </span>

        <div className="flex gap-2">
          {status === "delayed" && (
            <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-600 font-medium">
              DELAYED
            </span>
          )}
          {status === "risk" && (
            <span className="text-xs px-2 py-1 rounded bg-orange-100 text-orange-600 font-medium">
              AT RISK
            </span>
          )}
          <span
            className={`text-xs px-2 py-1 rounded font-medium ${
              statusStyles[status] || statusStyles.active
            }`}
          >
            {status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* TITLE */}
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {name}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
        {description || "No description provided."}
      </p>

      {/* PROGRESS */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              progress === 100
                ? "bg-green-500"
                : progress < 50
                ? "bg-red-500"
                : "bg-blue-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <hr className="my-3 border-gray-200" />

      {/* FOOTER */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 font-medium">{owner}</span>

        <div className="text-gray-500 text-xs">
          <span className="font-semibold text-gray-800">{tasks}</span> TASKS
          {overdue > 0 && (
            <span className="ml-2 text-red-500 font-medium">
              {overdue} OVERDUE
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
