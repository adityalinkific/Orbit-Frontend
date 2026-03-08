import React, { useState } from "react"
import { FaPlus } from "react-icons/fa6"
import MeetingModal from "../../components/meetings/MeetingModal"

const Meetings = () => {
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    link: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))

      console.log("Meeting scheduled:", form)

      // Reset form and close modal
      setForm({
        title: "",
        date: "",
        time: "",
        description: "",
        link: "",
      })
      setShowModal(false)

    } catch (error) {
      console.error("Failed to schedule meeting", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative z-20 min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 mb-1">Meetings</h1>
          <p className="text-gray-500 text-sm">Schedule and manage team meetings</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center text-[14px] font-medium gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-white transition-colors hover:bg-blue-700 shadow-sm"
        >
          <FaPlus /> Schedule Meeting
        </button>
      </div>

      {/* Content Placeholder */}
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-4">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No meetings scheduled</h3>
        <p className="text-gray-500 max-w-sm mx-auto mb-6">
          Get started by scheduling a new meeting with your team members.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Schedule your first meeting <span aria-hidden="true" className="ml-1">&rarr;</span>
        </button>
      </div>

      {/* Meeting Modal */}
      <MeetingModal
        open={showModal}
        onOpenChange={setShowModal}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        mode="create"
      />
    </div>
  )
}

export default Meetings