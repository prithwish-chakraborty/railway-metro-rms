import { useState } from 'react'
import { cardClass, inputClass } from '../lib/utils'

export default function ConnectionsSection({ stations, connections, setConnections, showToast }) {
  const [from, setFrom] = useState(stations[0]?.id ?? '')
  const [to, setTo] = useState(stations[1]?.id ?? '')
  const [type, setType] = useState('Railway')

  const handleAdd = (e) => {
    e.preventDefault()
    if (from === to) { showToast('Cannot connect a station to itself', 'info'); return }
    if (connections.some((c) => (c.from === from && c.to === to) || (c.from === to && c.to === from))) {
      showToast('Connection already exists between these stations!', 'info')
      return
    }
    setConnections((prev) => [...prev, { from, to, type }])
    showToast('New graph edge added successfully', 'success')
  }

  const handleRemove = (idx) => {
    setConnections((prev) => prev.filter((_, i) => i !== idx))
    showToast('Connection removed', 'info')
  }

  const options = stations.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className={`${cardClass} space-y-4 self-start`}>
        <h3 className="text-sm font-bold text-white">Add Graph Edge / Connection</h3>
        <form onSubmit={handleAdd} className="space-y-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1">From Station</label>
            <select value={from} onChange={(e) => setFrom(Number(e.target.value))} className={inputClass}>{options}</select>
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">To Station</label>
            <select value={to} onChange={(e) => setTo(Number(e.target.value))} className={inputClass}>{options}</select>
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Track Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className={inputClass}>
              <option value="Railway">Railway (Blue Line)</option>
              <option value="Metro">Metro (Green Line)</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2.5 rounded-xl transition">Create Edge</button>
        </form>
      </div>

      <div className={`lg:col-span-2 ${cardClass}`}>
        <h4 className="text-sm font-bold text-white mb-3">Active Graph Edges ({connections.length})</h4>
        <div className="space-y-2 max-h-[480px] overflow-y-auto custom-scrollbar pr-1">
          {connections.length === 0 && <p className="text-center py-8 text-slate-500 text-xs italic">No edges yet.</p>}
          {connections.map((c, idx) => {
            const s1 = stations.find((s) => s.id === c.from)
            const s2 = stations.find((s) => s.id === c.to)
            return (
              <div key={`${c.from}-${c.to}-${idx}`} className="bg-slate-900 p-3 rounded-xl border border-slate-700 flex justify-between items-center gap-3 text-xs">
                <div>
                  <span className="font-bold text-white">{s1?.name ?? `#${c.from}`}</span> &harr; <span className="font-bold text-white">{s2?.name ?? `#${c.to}`}</span>
                  <span className={`ml-2 text-[10px] font-bold px-2 py-0.5 rounded ${c.type === 'Railway' ? 'bg-blue-900 text-blue-300' : 'bg-emerald-900 text-emerald-300'}`}>{c.type}</span>
                </div>
                <button onClick={() => handleRemove(idx)} className="text-rose-400 hover:text-rose-300 font-bold shrink-0">Remove</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
