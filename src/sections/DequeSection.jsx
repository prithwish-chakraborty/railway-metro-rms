import { useState } from 'react'
import { cardClass, makeId } from '../lib/utils'

// Double-ended queue: push/pop at both the front and the rear.
export default function DequeSection({ deque, setDeque, showToast }) {
  const [name, setName] = useState('')

  const push = (end) => {
    if (!name.trim()) {
      showToast('Enter a passenger name first', 'info')
      return
    }
    const item = { id: makeId('DQ'), name: name.trim(), position: end }
    setDeque((prev) => (end === 'Front' ? [item, ...prev] : [...prev, item]))
    setName('')
    showToast(`Pushed to ${end.toUpperCase()} of Deque`, 'success')
  }

  const pop = (end) => {
    if (deque.length === 0) return
    const popped = end === 'Front' ? deque[0] : deque[deque.length - 1]
    setDeque((prev) => (end === 'Front' ? prev.slice(1) : prev.slice(0, -1)))
    showToast(`Popped from ${end.toUpperCase()}: ${popped.name}`, 'info')
  }

  return (
    <div className="space-y-6">
      <div className={`${cardClass} space-y-4`}>
        <h3 className="text-sm font-bold text-white">Double-Ended Queue (Deque) Controls</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Passenger Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && push('Rear')}
            className="flex-1 bg-slate-900 border border-slate-700 text-xs text-white rounded-xl p-3 focus:outline-none focus:border-blue-500"
          />
          <button onClick={() => push('Front')} className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-3 rounded-xl">Push Front</button>
          <button onClick={() => push('Rear')} className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-4 py-3 rounded-xl">Push Rear</button>
        </div>
        <div className="flex gap-3 pt-2 border-t border-slate-700">
          <button onClick={() => pop('Front')} disabled={deque.length === 0} className="flex-1 bg-rose-900/60 hover:bg-rose-800 border border-rose-700 text-rose-200 text-xs font-bold py-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed">Pop Front</button>
          <button onClick={() => pop('Rear')} disabled={deque.length === 0} className="flex-1 bg-amber-900/60 hover:bg-amber-800 border border-amber-700 text-amber-200 text-xs font-bold py-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed">Pop Rear</button>
        </div>
      </div>

      <div className={cardClass}>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Deque Visual Memory Array</h4>
        {deque.length === 0 ? (
          <p className="text-center py-8 text-slate-500 text-xs italic">Deque is empty.</p>
        ) : (
          <div className="flex flex-wrap gap-3 justify-center items-center">
            {deque.map((item, idx) => (
              <div key={item.id} className="bg-slate-900 border-2 border-purple-500/50 p-3 rounded-xl text-center min-w-[120px] shadow-lg">
                <span className="text-[9px] text-purple-400 font-bold block mb-1">
                  {deque.length === 1 ? 'FRONT / REAR' : idx === 0 ? 'FRONT' : idx === deque.length - 1 ? 'REAR' : `INDEX ${idx}`}
                </span>
                <p className="text-xs font-bold text-white">{item.name}</p>
                {item.priority && <p className="text-[10px] text-slate-400">{item.priority}</p>}
                <p className="text-[10px] text-slate-500 font-mono mt-1">{item.id}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
