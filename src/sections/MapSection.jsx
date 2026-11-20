import NetworkSVG from '../components/NetworkSVG'
import MapLegend from '../components/MapLegend'
import StationDetails from '../components/StationDetails'

export default function MapSection({ stations, connections, highlightedPath, setHighlightedPath, selectedNode, onSelectNode }) {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Full Network Graph Diagram</h3>
          <p className="text-xs text-slate-400">Click any station to inspect its adjacency list.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <MapLegend />
          {highlightedPath.length > 0 && (
            <button onClick={() => setHighlightedPath([])} className="text-xs text-slate-300 bg-slate-900 border border-slate-700 px-2.5 py-1 rounded-lg hover:bg-slate-700">
              Clear highlight
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative min-h-[500px]">
        <NetworkSVG stations={stations} connections={connections} highlightPath={highlightedPath} selectedNode={selectedNode} onSelectNode={onSelectNode} />
        <StationDetails station={selectedNode} stations={stations} connections={connections} onClose={() => onSelectNode(null)} />
      </div>
    </div>
  )
}
