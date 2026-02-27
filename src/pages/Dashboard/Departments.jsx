import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa6"

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../services/department.service"

import { getAllUsersService } from "../../services/user.service"

import DepartmentModal from "../../components/common/DepartmentModal"
import DepartmentCard from "../../components/common/DepartmentCard"
import DepartmentListView from "../../components/common/DepartmentListView"
import DepartmentsToolbar from "../../components/common/DepartmentsToolbar"
import DepartmentSidebar from "../../components/common/DepartmentSidebar"

const Departments = () => {
  const [users, setUsers] = useState([])
  const [departments, setDepartments] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingDept, setEditingDept] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [view, setView] = useState("grid")

  const [form, setForm] = useState({
    name: "",
    description: "",
    department_head_id: null,
    is_active: true,
  })

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    fetchDepartments()
    fetchUsers()
  }, [])

  const fetchDepartments = async () => {
    try {
      const data = await getDepartments()
      setDepartments(data)
    } catch (err) {
      console.error("Failed to fetch departments", err)
    }
  }

  const fetchUsers = async () => {
    try {
      const res = await getAllUsersService()
      setUsers(Array.isArray(res.data) ? res.data : [])
    } catch {
      setUsers([])
    }
  }

  /* ---------------- CREATE / UPDATE ---------------- */
const handleSubmit = async (e) => {
  e.preventDefault()
  if (isSubmitting) return

  if (!form.name.trim()) {
    setErrorMessage("Department name is required")
    return
  }

  setIsSubmitting(true)
  setErrorMessage("")

  const payload = {
    name: form.name.trim(),
    description: form.description?.trim() || "",
    department_head_id:
      typeof form.department_head_id === "number"
        ? form.department_head_id
        : null,
  }

  try {
    if (editingDept) {
      await updateDepartment(editingDept.id, payload)
    } else {
      await createDepartment(payload)
    }

    await fetchDepartments() // ensures fresh backend data
    setShowModal(false)
    setEditingDept(null)
    setForm({
      name: "",
      description: "",
      department_head_id: null,
      is_active: true,
    })
  } catch (err) {
    console.error(err)
    setErrorMessage("Operation failed")
  } finally {
    setIsSubmitting(false)
  }
}


  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!confirm("Delete department?")) return

    try {
      await deleteDepartment(id)
      setDepartments((prev) => prev.filter((d) => d.id !== id))

      if (selectedDepartment?.id === id) {
        setSidebarOpen(false)
        setSelectedDepartment(null)
      }
    } catch (err) {
      console.error("Delete failed", err)
      alert("Delete failed (backend CORS issue)")
    }
  }

  /* ---------------- EDIT ---------------- */
  const handleEdit = (id) => {
    const dept = departments.find((d) => d.id === id)
    if (!dept) return

    setEditingDept(dept)
    setForm({
      name: dept.name,
      description: dept.description || "",
      department_head_id: dept.department_head_id ?? null,
      is_active: dept.is_active,
    })
    setShowModal(true)
  }

  /* ---------------- SIDEBAR ---------------- */
  const handleDepartmentClick = (dept) => {
    setSelectedDepartment(dept)
    setSidebarOpen(true)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
    setSelectedDepartment(null)
  }

  /* ---------------- FILTER ---------------- */
  const filteredDepartments = departments
    .filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((d) =>
      status === "all" ? true : status === "active" ? d.is_active : !d.is_active
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={closeSidebar}
        />
      )}

      <div className="relative z-20 min-h-screen bg-gray-50 p-8">
        <div className="mb-6 flex justify-between">
          <div>
              <h1 className="text-2xl font-semibold text-slate-900 mb-1">Departments</h1>
              <p className="text-gray-500 text-sm">Organizational structure and team ownership</p>
            </div>
            <div>
          <button
            onClick={() => {
              setEditingDept(null)
              setForm({
                name: "",
                description: "",
                department_head_id: null,
                is_active: true,
              })
              setShowModal(true)
            }}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white"
          >
            <FaPlus /> Add Department
          </button>
                      </div>

        </div>

        <DepartmentsToolbar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
          view={view}
          setView={setView}
        />

        {view === "grid" ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredDepartments.map((d) => (
              <DepartmentCard
                key={d.id}
                department={d}
                onClick={handleDepartmentClick}
                onEdit={() => handleEdit(d.id)}
                onDelete={() => handleDelete(d.id)}
              />
            ))}
          </div>
        ) : (
          <DepartmentListView
            departments={filteredDepartments}
            onDepartmentClick={handleDepartmentClick}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <DepartmentModal
          open={showModal}
          onOpenChange={setShowModal}
          mode={editingDept ? "edit" : "create"}
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          isSubmitting={isSubmitting}
          users={users}
        />
      </div>

      <DepartmentSidebar
        department={selectedDepartment}
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />
    </>
  )
}

export default Departments
