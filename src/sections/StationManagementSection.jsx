import { useState } from 'react'
import { Search } from 'lucide-react'
import StationFormModal from '../components/StationFormModal'

const TYPE_BADGE = {
  Railway: 'bg-blue-900/60 text-blue-300 border border-blue-700',
  Metro: 'bg-emerald-900/60 text-emerald-300 border border-emerald-700',
  Interchange: 'bg-purple-900/60 text-purple-300 border border-purple-700',
}

export default function StationManagementSection({ stations, setStations, setConnections, showToast }) {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [editingStation, setEditingStation] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  const q = search.toLowerCase()
  const filtered = stations.filter(
    (s) => (s.name.toLowerCase().includes(q) || s.id.toString().includes(search)) && (typeFilter === 'All' || s.type === typeFilter),
  )

  const handleDelete = (id) => {
    setStations((prev) => prev.filter((s) => s.id !== id))
    setConnections((prev) => prev.filter((c) => c.from !== id && c.to !== id))
    setConfirmDeleteId(null)
    showToast('Station deleted successfully', 'success')
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-3 bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div className="flex items-center gap-2 flex-1">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search station by name or numeric ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Filter:</span>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-3 py-2">
            <option value="All">All Types</option>
            <option value="Railway">Railway Only</option>
            <option value="Metro">Metro Only</option>
            <option value="Interchange">Interchange Only</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase font-semibold border-b border-slate-700">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Station Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Line / Corridor</th>
                <th className="p-3">Coordinates (X, Y)</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-slate-500 italic">No matching stations found.</td>
                </tr>
              ) : (
                filtered.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-700/30 transition">
                    <td className="p-3 font-mono text-blue-400 font-bold">{st.id}</td>
                    <td className="p-3 font-semibold text-white">{st.name}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${TYPE_BADGE[st.type]}`}>{st.type}</span>
                    </td>
                    <td className="p-3 text-slate-400">{st.line}</td>
                    <td className="p-3 text-slate-500 font-mono">({st.x}, {st.y})</td>
                    <td className="p-3 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => setEditingStation(st)} className="text-blue-400 hover:text-blue-300 font-medium px-2 py-1 rounded bg-slate-900 border border-slate-700">
                        Edit
                      </button>
                      {confirmDeleteId === st.id ? (
                        <button onClick={() => handleDelete(st.id)} onBlur={() => setConfirmDeleteId(null)} autoFocus className="text-white bg-rose-600 hover:bg-rose-500 font-medium px-2 py-1 rounded">
                          Confirm?
                        </button>
                      ) : (
                        <button onClick={() => setConfirmDeleteId(st.id)} className="text-rose-400 hover:text-rose-300 font-medium px-2 py-1 rounded bg-slate-900 border border-slate-700">
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingStation && (
        <StationFormModal
          station={editingStation}
          stations={stations}
          onClose={() => setEditingStation(null)}
          onSave={(updated) => {
            setStations((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
            setEditingStation(null)
            showToast('Station details updated!', 'success')
          }}
        />
      )}
    </div>
  )
}
