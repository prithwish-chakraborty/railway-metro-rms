import { useEffect } from 'react'

export default function Modal({ title, icon: Icon, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-blue-400" />}
          {title}
        </h3>
        {children}
      </div>
    </div>
  )
}
