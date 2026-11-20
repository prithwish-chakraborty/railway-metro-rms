import { Train, X } from 'lucide-react'
import { NAV_ITEMS } from './navItems'

function NavItem({ item, isActive, onSelect, badge }) {
  const Icon = item.icon
  return (
    <button
      onClick={() => onSelect(item.id)}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition text-left font-medium ${
        isActive
          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
          : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
      }`}
    >
      <span className="flex items-center gap-2.5">
        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
        {item.label}
      </span>
      {badge !== undefined && (
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
            isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  )
}

export default function Sidebar({ activeTab, onSelect, badges, open, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={onClose} />}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0 transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="min-h-0 flex flex-col">
          <div className="p-4 border-b border-slate-800 flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-500/30">
              <Train className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h1 className="font-bold text-base text-white leading-tight">Metro &amp; Rail RMS</h1>
              <span className="text-[10px] text-emerald-400 font-medium tracking-wider uppercase bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                DSA Project
              </span>
            </div>
            <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white" aria-label="Close menu">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-3 space-y-1 text-xs font-medium custom-scrollbar overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
                onSelect={onSelect}
                badge={item.badgeKey ? badges[item.badgeKey] : undefined}
              />
            ))}
          </nav>
        </div>

        <div className="p-3 border-t border-slate-800 text-[11px] text-slate-400 bg-slate-950/50">
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center gap-1.5">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
              </span>
              Graph Memory Active
            </span>
            <span className="text-slate-500">v2.5</span>
          </div>
          <p className="text-[10px] text-slate-500">Data saved in your browser</p>
        </div>
      </aside>
    </>
  )
}
