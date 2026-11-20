// Small info panel shown when a station node is clicked on the map.
export default function StationDetails({ station, connections, stations, onClose }) {
  if (!station) return null
  const neighbours = connections
    .filter((c) => c.from === station.id || c.to === station.id)
    .map((c) => ({ type: c.type, station: stations.find((s) => s.id === (c.from === station.id ? c.to : c.from)) }))
    .filter((n) => n.station)

  return (
    <div className="absolute top-3 left-3 max-w-[16rem] bg-slate-900/95 border border-slate-700 rounded-xl p-3 shadow-2xl text-xs">
      <div className="flex justify-between items-start gap-3">
        <div>
          <p className="font-bold text-white">{station.name}</p>
          <p className="text-slate-400">ID {station.id} &bull; {station.type}</p>
          <p className="text-slate-500">{station.line}</p>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-white" aria-label="Close details">&times;</button>
      </div>
      <p className="mt-2 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Adjacent stations ({neighbours.length})</p>
      <ul className="mt-1 space-y-0.5">
        {neighbours.map((n, i) => (
          <li key={i} className="flex justify-between gap-2 text-slate-300">
            <span className="truncate">{n.station.name}</span>
            <span className={n.type === 'Railway' ? 'text-blue-400' : 'text-emerald-400'}>{n.type}</span>
          </li>
        ))}
        {neighbours.length === 0 && <li className="text-slate-500 italic">No connections</li>}
      </ul>
    </div>
  )
}
