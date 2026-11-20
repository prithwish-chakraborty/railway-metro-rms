const COLOR_MAP = {
  blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
}

export default function StatCard({ title, value, icon: Icon, color, subtitle }) {
  return (
    <div className="bg-slate-800/80 rounded-2xl border border-slate-700/60 p-4 shadow-lg flex items-center justify-between">
      <div>
        <p className="text-xs text-slate-400 font-medium">{title}</p>
        <p className="text-2xl font-bold text-white my-1">{value}</p>
        <p className="text-[10px] text-slate-500">{subtitle}</p>
      </div>
      <div className={`p-3 rounded-xl border ${COLOR_MAP[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  )
}
