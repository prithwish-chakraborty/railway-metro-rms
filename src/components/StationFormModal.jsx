import { useState } from 'react'
import { CirclePlus, Pencil } from 'lucide-react'
import Modal from './Modal'
import { STATION_TYPES } from '../data/initialData'
import { inputClass } from '../lib/utils'

/**
 * Add a new station (station = undefined) or edit an existing one.
 * IDs must be unique because they are the BST key.
 */
export default function StationFormModal({ station, stations, onSave, onClose }) {
  const isEdit = Boolean(station)
  const [form, setForm] = useState(
    station ?? { id: '', name: '', type: 'Railway', line: '', x: 300, y: 300 },
  )
  const [error, setError] = useState('')
  const set = (field) => (e) => { setForm({ ...form, [field]: e.target.value }); setError('') }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = isEdit ? station.id : parseInt(form.id, 10)
    if (!isEdit) {
      if (isNaN(id) || id <= 0) return setError('Please enter a valid positive numeric ID.')
      if (stations.some((s) => s.id === id)) return setError(`Station ID ${id} already exists! IDs must be unique for BST.`)
    }
    const x = Math.min(800, Math.max(0, parseInt(form.x, 10) || 0))
    const y = Math.min(600, Math.max(0, parseInt(form.y, 10) || 0))
    onSave({ id, name: form.name.trim(), type: form.type, line: form.line.trim(), x, y })
  }

  return (
    <Modal title={isEdit ? `Edit Station #${station.id}` : 'Add New Station Node'} icon={isEdit ? Pencil : CirclePlus} onClose={onClose}>
      {error && (
        <div className="mb-3 p-2.5 rounded-lg bg-rose-950/70 border border-rose-600 text-rose-200 text-xs">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Numeric Station ID</label>
            <input type="number" required={!isEdit} disabled={isEdit} placeholder="e.g. 113" value={form.id} onChange={set('id')} className={`${inputClass} disabled:opacity-60`} />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Type</label>
            <select value={form.type} onChange={set('type')} className={inputClass}>
              {STATION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1">Station Name</label>
          <input type="text" required placeholder="e.g. Park Circus" value={form.name} onChange={set('name')} className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1">Line / Corridor Name</label>
          <input type="text" required placeholder="e.g. Circular Railway" value={form.line} onChange={set('line')} className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Map X (0–800)</label>
            <input type="number" min="0" max="800" value={form.x} onChange={set('x')} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Map Y (0–600)</label>
            <input type="number" min="0" max="600" value={form.y} onChange={set('y')} className={inputClass} />
          </div>
        </div>
        <div className="flex gap-2 pt-3">
          <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-xs font-bold py-2.5 rounded-lg text-white">
            {isEdit ? 'Save Changes' : 'Insert Station'}
          </button>
          <button type="button" onClick={onClose} className="flex-1 bg-slate-700 hover:bg-slate-600 text-xs font-bold py-2.5 rounded-lg text-slate-300">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}
