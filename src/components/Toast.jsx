import { CircleCheck, Info } from 'lucide-react'

export default function Toast({ notification }) {
  if (!notification) return null
  const success = notification.type === 'success'
  const Icon = success ? CircleCheck : Info
  return (
    <div
      role="status"
      className={`fixed top-4 right-4 z-[60] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border text-sm font-medium ${
        success
          ? 'bg-emerald-900/90 border-emerald-500 text-emerald-200'
          : 'bg-blue-900/90 border-blue-500 text-blue-200'
      }`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      {notification.msg}
    </div>
  )
}
