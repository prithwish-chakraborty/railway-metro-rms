export default function MapLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
      <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-blue-500 rounded" /> Railway Track</span>
      <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-emerald-500 rounded" /> Metro Line</span>
      <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-orange-500 rounded" /> Highlighted Path</span>
      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border-2 border-purple-500" /> Interchange</span>
    </div>
  )
}
