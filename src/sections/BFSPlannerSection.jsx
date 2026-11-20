import { useState } from 'react'
import { Navigation, ArrowUpDown, TriangleAlert } from 'lucide-react'
import { TRAVEL_MODES } from '../data/initialData'
import { buildGraph, bfsShortestPath } from '../lib/graph'
import { cardClass, currentTime, inputClass } from '../lib/utils'

export default function BFSPlannerSection({ stations, connections, setHighlightedPath, setRouteHistory, showToast, setActiveTab }) {
  const [source, setSource] = useState(stations[0]?.id ?? '')
  const [destination, setDestination] = useState(stations[1]?.id ?? '')
  const [mode, setMode] = useState('Combined')
  const [result, setResult] = useState(null)
  const [resultMode, setResultMode] = useState('Combined')

  const handleFindRoute = (e) => {
    e.preventDefault()
    if (source === destination) {
      showToast('Source and Destination cannot be identical!', 'info')
      return
    }

    const graph = buildGraph(stations, connections, mode)
    const bfsResult = bfsShortestPath(graph, source, destination)
    setResult(bfsResult)
    setResultMode(mode)

    if (bfsResult.path.length > 0) {
      setHighlightedPath(bfsResult.path)
      const srcObj = stations.find((s) => s.id === source)
      const dstObj = stations.find((s) => s.id === destination)
      setRouteHistory((prev) => [
        {
          sourceName: srcObj?.name ?? source,
          destName: dstObj?.name ?? destination,
          mode,
          edges: bfsResult.edges,
          stationsCount: bfsResult.path.length,
          path: bfsResult.path,
          timestamp: currentTime(),
        },
        ...prev,
      ])
      showToast(`Shortest path found! (${bfsResult.edges} connections)`, 'success')
    } else {
      setHighlightedPath([])
      showToast('No connected route exists for selected travel mode.', 'info')
    }
  }

  const handleSwap = () => {
    setSource(destination)
    setDestination(source)
  }

  const stationOptions = stations.map((st) => (
    <option key={st.id} value={st.id}>{st.name} (ID: {st.id})</option>
  ))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className={`${cardClass} space-y-4`}>
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Navigation className="w-4 h-4 text-blue-400" />
          Breadth-First Search Planner
        </h3>

        <form onSubmit={handleFindRoute} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Source Station</label>
            <select value={source} onChange={(e) => setSource(Number(e.target.value))} className={inputClass}>{stationOptions}</select>
          </div>

          <div className="flex justify-center">
            <button type="button" onClick={handleSwap} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-full text-slate-200 transition" title="Swap Source & Destination">
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Destination Station</label>
            <select value={destination} onChange={(e) => setDestination(Number(e.target.value))} className={inputClass}>{stationOptions}</select>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Travel Mode Network</label>
            <div className="grid grid-cols-3 gap-2">
              {TRAVEL_MODES.map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setMode(m)}
                  className={`py-2 text-xs font-medium rounded-lg border transition ${
                    mode === m ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-3 rounded-xl shadow-lg shadow-emerald-600/20 transition">
            Find Shortest Route (BFS)
          </button>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {!result && (
          <div className="bg-slate-800/40 border border-dashed border-slate-700 rounded-2xl p-12 text-center text-slate-500 text-xs">
            Select Source and Destination stations and click &quot;Find Shortest Route&quot; to run BFS.
          </div>
        )}

        {result && result.path.length === 0 && (
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center space-y-2">
            <TriangleAlert className="w-8 h-8 text-rose-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">No Connected Route Found</h4>
            <p className="text-xs text-slate-400">There are no continuous tracks connecting these stations under {resultMode} mode.</p>
          </div>
        )}

        {result && result.path.length > 0 && (
          <div className={`${cardClass} space-y-4`}>
            <div className="flex flex-wrap justify-between items-center gap-3 border-b border-slate-700 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white">Calculated Route Path</h4>
                <p className="text-xs text-slate-400">Guaranteed unweighted shortest path via BFS</p>
              </div>
              <div className="flex gap-2">
                <span className="bg-blue-900/60 text-blue-300 text-xs px-2.5 py-1 rounded-lg border border-blue-700 font-bold">{result.edges} Connection Hops</span>
                <span className="bg-emerald-900/60 text-emerald-300 text-xs px-2.5 py-1 rounded-lg border border-emerald-700 font-bold">{result.path.length} Stations</span>
              </div>
            </div>

            <div className="space-y-2 py-2">
              {result.path.map((stId, idx) => {
                const st = stations.find((s) => s.id === stId)
                return (
                  <div key={stId} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md">{idx + 1}</div>
                    <div className="flex-1 bg-slate-900/80 p-3 rounded-xl border border-slate-700 flex justify-between items-center">
                      <div>
                        <p className="text-xs font-bold text-white">{st?.name}</p>
                        <p className="text-[10px] text-slate-400">{st?.line}</p>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">ID: {stId}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="pt-2 border-t border-slate-700">
              <button onClick={() => setActiveTab('map')} className="text-xs text-orange-400 hover:text-orange-300 font-medium">
                View Highlighted Route on Network Map &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
