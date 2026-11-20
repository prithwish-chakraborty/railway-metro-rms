import { useState } from 'react'
import { GitCommitHorizontal } from 'lucide-react'
import { TRAVEL_MODES } from '../data/initialData'
import { buildGraph, dfsTraversal } from '../lib/graph'
import { cardClass, inputClass } from '../lib/utils'

export default function DFSSection({ stations, connections, setHighlightedPath, showToast, setActiveTab }) {
  const [startNode, setStartNode] = useState(stations[0]?.id ?? '')
  const [mode, setMode] = useState('Combined')
  const [visitedList, setVisitedList] = useState([])

  const handleRunDFS = () => {
    const order = dfsTraversal(buildGraph(stations, connections, mode), startNode)
    setVisitedList(order)
    setHighlightedPath(order)
    showToast(`DFS Traversal complete! Visited ${order.length} nodes`, 'success')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className={`${cardClass} space-y-4`}>
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <GitCommitHorizontal className="w-4 h-4 text-emerald-400" />
          Depth-First Search (DFS)
        </h3>

        <div>
          <label className="text-xs text-slate-400 block mb-1">Select Starting Node</label>
          <select value={startNode} onChange={(e) => setStartNode(Number(e.target.value))} className={inputClass}>
            {stations.map((st) => <option key={st.id} value={st.id}>{st.name} (ID: {st.id})</option>)}
          </select>
        </div>

        <div>
          <label className="text-xs text-slate-400 block mb-1">Network</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)} className={inputClass}>
            {TRAVEL_MODES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <button onClick={handleRunDFS} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 rounded-xl transition">
          Run DFS Traversal
        </button>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {visitedList.length === 0 ? (
          <div className="bg-slate-800/40 border border-dashed border-slate-700 rounded-2xl p-12 text-center text-slate-500 text-xs">
            Pick a starting station and run DFS to see the recursive visit order.
          </div>
        ) : (
          <div className={`${cardClass} space-y-3`}>
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-white">DFS Traversal Order</h4>
              <button onClick={() => setActiveTab('map')} className="text-xs text-orange-400 hover:underline">View on Map &rarr;</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {visitedList.map((stId, idx) => {
                const st = stations.find((s) => s.id === stId)
                return (
                  <div key={stId} className="bg-slate-900 border border-emerald-500/50 p-2.5 rounded-xl text-xs flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">{idx + 1}</span>
                    <span className="font-bold text-white">{st?.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
