import { cardClass } from '../lib/utils'

export default function RouteHistorySection({ history, setRouteHistory, setHighlightedPath, setActiveTab, showToast }) {
  return (
    <div className={`${cardClass} space-y-4`}>
      <div className="flex justify-between items-center border-b border-slate-700 pb-3">
        <h3 className="text-sm font-bold text-white">Route Calculation History</h3>
        {history.length > 0 && (
          <button onClick={() => { setRouteHistory([]); showToast('History cleared', 'info') }} className="text-xs text-rose-400 hover:underline">
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-center py-8 text-slate-500 text-xs italic">No route searches recorded yet. Run the BFS Route Finder to add one.</p>
      ) : (
        <div className="space-y-2">
          {history.map((item, idx) => (
            <div key={idx} className="bg-slate-900 p-3.5 rounded-xl border border-slate-700 flex justify-between items-center gap-3">
              <div>
                <p className="text-xs font-bold text-white">{item.sourceName} &rarr; {item.destName}</p>
                <p className="text-[10px] text-slate-400">Mode: {item.mode} &bull; {item.edges} connection hops &bull; {item.timestamp}</p>
              </div>
              <button
                onClick={() => { setHighlightedPath(item.path); setActiveTab('map') }}
                className="bg-blue-600/20 text-blue-300 border border-blue-500/30 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-blue-600/40 shrink-0"
              >
                View Path
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
