import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"

const MeetingModal = ({
    open,
    onOpenChange,
    form,
    setForm,
    onSubmit,
    isSubmitting = false,
    mode = "create",
}) => {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                {/* Overlay */}
                <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300" />

                {/* Content */}
                <Dialog.Content className="fixed text-slate-900 left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#f9fafb] shadow-xl focus:outline-none transition-all duration-300 transform data-[state=open]:scale-100 data-[state=closed]:scale-95">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <Dialog.Title className="text-lg font-semibold text-gray-900">
                            {mode === "edit" ? "Edit Meeting" : "Schedule Meeting"}
                        </Dialog.Title>

                        <Dialog.Close asChild>
                            <button className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <X size={18} />
                            </button>
                        </Dialog.Close>
                    </div>

                    {/* Body */}
                    <form onSubmit={onSubmit} className="space-y-5 px-6 py-5">
                        {/* Title */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                Meeting Title
                            </label>
                            <input
                                required
                                placeholder="e.g. Project Sync"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Date */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={form.date}
                                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>

                            {/* Time */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Time
                                </label>
                                <input
                                    type="time"
                                    required
                                    value={form.time}
                                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                rows={3}
                                placeholder="Brief agenda or description..."
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>

                        {/* Link / Location */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                Meeting Link (Optional)
                            </label>
                            <input
                                placeholder="https://zoom.us/j/..."
                                value={form.link}
                                onChange={(e) => setForm({ ...form, link: e.target.value })}
                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                            <Dialog.Close asChild>
                                <button
                                    type="button"
                                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
                                >
                                    Cancel
                                </button>
                            </Dialog.Close>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`rounded-lg px-5 py-2 text-sm font-medium text-white transition-all shadow-sm ${isSubmitting
                                        ? "bg-blue-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 hover:shadow"
                                    }`}
                            >
                                {isSubmitting ? "Saving..." : mode === "edit" ? "Update Meeting" : "Schedule Meeting"}
                            </button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default MeetingModal
