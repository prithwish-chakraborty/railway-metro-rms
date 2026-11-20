import { Building, Train, TrainFront, Users, Map, History, UserCheck } from 'lucide-react'
import StatCard from '../components/StatCard'
import NetworkSVG from '../components/NetworkSVG'

export default function DashboardSection({ stations, connections, passengerQueue, routeHistory, highlightedPath, selectedNode, onSelectNode, setActiveTab }) {
  const railwayEdges = connections.filter((c) => c.type === 'Railway').length
  const metroEdges = connections.filter((c) => c.type === 'Metro').length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Stations" value={stations.length} icon={Building} color="blue" subtitle="Adjacency List Nodes" />
        <StatCard title="Railway Edges" value={railwayEdges} icon={Train} color="indigo" subtitle="Blue Track Line Graph" />
        <StatCard title="Metro Lines" value={metroEdges} icon={TrainFront} color="emerald" subtitle="Green Transit Edges" />
        <StatCard title="Waiting Passengers" value={passengerQueue.length} icon={Users} color="orange" subtitle="FIFO Queue Pending" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800/80 rounded-2xl border border-slate-700/60 p-4 shadow-xl">
          <div className="flex justify-between items-center mb-3 gap-2">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Map className="w-4 h-4 text-blue-400" />
              Live Network Graph Visualizer
            </h3>
            <button onClick={() => setActiveTab('map')} className="text-xs text-blue-400 hover:underline">
              Open Full Interactive Map &rarr;
            </button>
          </div>
          <div className="h-72 bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
            <NetworkSVG stations={stations} connections={connections} highlightPath={highlightedPath} selectedNode={selectedNode} onSelectNode={onSelectNode} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-800/80 rounded-2xl border border-slate-700/60 p-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-400" />
              Recent Shortest Path Calculations
            </h3>
            {routeHistory.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-4 text-center">No BFS queries calculated yet.</p>
            ) : (
              <div className="space-y-2">
                {routeHistory.slice(0, 3).map((r, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs">
                    <div className="flex justify-between text-slate-300 font-medium mb-1 gap-2">
                      <span>{r.sourceName} &rarr; {r.destName}</span>
                      <span className="text-orange-400 font-bold shrink-0">{r.edges} hops</span>
                    </div>
                    <div className="text-[10px] text-slate-500 flex justify-between">
                      <span>Mode: {r.mode}</span>
                      <span>{r.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-slate-800/80 rounded-2xl border border-slate-700/60 p-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-orange-400" />
              Next Passenger to Serve (FIFO)
            </h3>
            {passengerQueue.length > 0 ? (
              <div className="bg-slate-900/90 border border-slate-700 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">{passengerQueue[0].name}</p>
                  <p className="text-xs text-slate-400">Dest: {passengerQueue[0].destination}</p>
                </div>
                <span className="bg-blue-500/20 text-blue-300 text-xs px-2.5 py-1 rounded-md border border-blue-500/30 font-medium">
                  {passengerQueue[0].id}
                </span>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic py-2">Queue is currently empty.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
