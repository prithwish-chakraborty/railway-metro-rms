import { useState } from 'react'
import { UserPlus, UserCheck } from 'lucide-react'
import { cardClass, currentTime, inputClass, makeId } from '../lib/utils'

// FIFO queue: enqueue at the rear, dequeue from the front.
export default function QueueSection({ queue, setQueue, stations, showToast }) {
  const [name, setName] = useState('')
  const [dest, setDest] = useState(stations[0]?.name ?? '')

  const handleEnqueue = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    const passenger = { id: makeId('P'), name: name.trim(), ticketClass: 'Standard', destination: dest, time: currentTime() }
    setQueue((prev) => [...prev, passenger])
    setName('')
    showToast(`Passenger ${passenger.name} added to queue`, 'success')
  }

  const handleDequeue = () => {
    if (queue.length === 0) return
    const served = queue[0]
    setQueue((prev) => prev.slice(1))
    showToast(`Served passenger: ${served.name} (${served.id})`, 'info')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className={`${cardClass} space-y-4 self-start`}>
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-orange-400" />
          Enqueue Passenger (FIFO)
        </h3>
        <form onSubmit={handleEnqueue} className="space-y-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Passenger Name</label>
            <input type="text" required placeholder="e.g. Sourav Ganguly" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Destination</label>
            <select value={dest} onChange={(e) => setDest(e.target.value)} className={inputClass}>
              {stations.map((st) => <option key={st.id} value={st.name}>{st.name}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold py-2.5 rounded-xl transition">
            Add to Rear of Queue
          </button>
        </form>

        <div className="pt-4 border-t border-slate-700">
          <button
            onClick={handleDequeue}
            disabled={queue.length === 0}
            className="w-full bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-500 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            Serve Front Passenger (Dequeue)
          </button>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className={cardClass}>
          <div className="flex justify-between items-center mb-4 gap-3">
            <div>
              <h4 className="text-sm font-bold text-white">Live Passenger Queue Buffer</h4>
              <p className="text-xs text-slate-400">First In, First Out (FIFO) linear data structure</p>
            </div>
            <span className="text-xs text-orange-400 font-bold bg-orange-950/60 border border-orange-800 px-3 py-1 rounded-full shrink-0">{queue.length} Waiting</span>
          </div>

          {queue.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs italic">Queue is currently empty. No passengers waiting at ticket counter.</div>
          ) : (
            <div className="space-y-3">
              {queue.map((p, idx) => (
                <div key={p.id} className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition ${idx === 0 ? 'bg-orange-950/30 border-orange-500/50 shadow-md' : 'bg-slate-900 border-slate-700'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center ${idx === 0 ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400'}`}>{idx + 1}</span>
                    <div>
                      <p className="text-xs font-bold text-white">{p.name}</p>
                      <p className="text-[10px] text-slate-400">Dest: {p.destination} &bull; {p.time}</p>
                    </div>
                  </div>
                  {idx === 0 && (
                    <span className="text-[10px] bg-orange-500/20 text-orange-300 font-bold px-2 py-1 rounded border border-orange-500/30 shrink-0">NEXT TO BE SERVED</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
