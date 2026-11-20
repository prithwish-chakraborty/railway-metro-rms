import { useCallback, useEffect, useRef, useState } from 'react'
import { CirclePlus, Menu, RotateCcw } from 'lucide-react'
import { INITIAL_CONNECTIONS, INITIAL_DEQUE, INITIAL_PASSENGERS, INITIAL_STATIONS } from './data/initialData'
import { useLocalStorage } from './hooks/useLocalStorage'
import Sidebar from './components/Sidebar'
import Toast from './components/Toast'
import StationFormModal from './components/StationFormModal'
import { NAV_ITEMS } from './components/navItems'
import DashboardSection from './sections/DashboardSection'
import StationManagementSection from './sections/StationManagementSection'
import MapSection from './sections/MapSection'
import BFSPlannerSection from './sections/BFSPlannerSection'
import DFSSection from './sections/DFSSection'
import BSTSection from './sections/BSTSection'
import QueueSection from './sections/QueueSection'
import DequeSection from './sections/DequeSection'
import RouteHistorySection from './sections/RouteHistorySection'
import ConnectionsSection from './sections/ConnectionsSection'
import DSAConceptsSection from './sections/DSAConceptsSection'
import SettingsSection from './sections/SettingsSection'

export default function App() {
  // Persistent state (localStorage)
  const [stations, setStations] = useLocalStorage('rms_stations', INITIAL_STATIONS)
  const [connections, setConnections] = useLocalStorage('rms_connections', INITIAL_CONNECTIONS)
  const [passengerQueue, setPassengerQueue] = useLocalStorage('rms_passengers', INITIAL_PASSENGERS)
  const [dequeList, setDequeList] = useLocalStorage('rms_deque', INITIAL_DEQUE)
  const [routeHistory, setRouteHistory] = useLocalStorage('rms_history', [])

  // UI state
  const [activeTab, setActiveTab] = useState('dashboard')
  const [highlightedPath, setHighlightedPath] = useState([])
  const [selectedStationId, setSelectedStationId] = useState(null)
  const [notification, setNotification] = useState(null)
  const [isAddStationOpen, setIsAddStationOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toastTimer = useRef()

  const selectedStation = stations.find((s) => s.id === selectedStationId) ?? null
  const onSelectNode = (st) => setSelectedStationId(st ? st.id : null)

  const showToast = useCallback((msg, type = 'info') => {
    clearTimeout(toastTimer.current)
    setNotification({ msg, type })
    toastTimer.current = setTimeout(() => setNotification(null), 3500)
  }, [])
  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const goTo = (tab) => {
    setActiveTab(tab)
    setSidebarOpen(false)
  }

  const resetDemoData = () => {
    setStations(INITIAL_STATIONS)
    setConnections(INITIAL_CONNECTIONS)
    setPassengerQueue(INITIAL_PASSENGERS)
    setDequeList(INITIAL_DEQUE)
    setRouteHistory([])
    setHighlightedPath([])
    setSelectedStationId(null)
    showToast('Demo data successfully restored!', 'success')
  }

  const currentLabel = NAV_ITEMS.find((n) => n.id === activeTab)?.label ?? 'Overview'

  return (
    <div className="flex h-screen overflow-hidden bg-slate-900 text-slate-100">
      <Toast notification={notification} />

      <Sidebar
        activeTab={activeTab}
        onSelect={goTo}
        badges={{ stations: stations.length, queue: passengerQueue.length, deque: dequeList.length }}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-300 hover:text-white" aria-label="Open menu">
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-semibold text-slate-200 truncate">{currentLabel}</h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsAddStationOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition shadow-sm"
            >
              <CirclePlus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Station</span>
            </button>
            <button
              onClick={resetDemoData}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
              title="Restore initial graph state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Data</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-900/50 custom-scrollbar">
          {activeTab === 'dashboard' && (
            <DashboardSection
              stations={stations}
              connections={connections}
              passengerQueue={passengerQueue}
              routeHistory={routeHistory}
              highlightedPath={highlightedPath}
              selectedNode={selectedStation}
              onSelectNode={onSelectNode}
              setActiveTab={goTo}
            />
          )}
          {activeTab === 'stations' && (
            <StationManagementSection stations={stations} setStations={setStations} setConnections={setConnections} showToast={showToast} />
          )}
          {activeTab === 'connections' && (
            <ConnectionsSection stations={stations} connections={connections} setConnections={setConnections} showToast={showToast} />
          )}
          {activeTab === 'map' && (
            <MapSection
              stations={stations}
              connections={connections}
              highlightedPath={highlightedPath}
              setHighlightedPath={setHighlightedPath}
              selectedNode={selectedStation}
              onSelectNode={onSelectNode}
            />
          )}
          {activeTab === 'bfs' && (
            <BFSPlannerSection
              stations={stations}
              connections={connections}
              setHighlightedPath={setHighlightedPath}
              setRouteHistory={setRouteHistory}
              showToast={showToast}
              setActiveTab={goTo}
            />
          )}
          {activeTab === 'dfs' && (
            <DFSSection stations={stations} connections={connections} setHighlightedPath={setHighlightedPath} showToast={showToast} setActiveTab={goTo} />
          )}
          {activeTab === 'bst' && <BSTSection stations={stations} showToast={showToast} />}
          {activeTab === 'queue' && <QueueSection queue={passengerQueue} setQueue={setPassengerQueue} stations={stations} showToast={showToast} />}
          {activeTab === 'deque' && <DequeSection deque={dequeList} setDeque={setDequeList} showToast={showToast} />}
          {activeTab === 'history' && (
            <RouteHistorySection
              history={routeHistory}
              setRouteHistory={setRouteHistory}
              setHighlightedPath={setHighlightedPath}
              setActiveTab={goTo}
              showToast={showToast}
            />
          )}
          {activeTab === 'dsa' && <DSAConceptsSection />}
          {activeTab === 'settings' && (
            <SettingsSection resetDemoData={resetDemoData} stations={stations} connections={connections} showToast={showToast} />
          )}
        </main>
      </div>

      {isAddStationOpen && (
        <StationFormModal
          stations={stations}
          onClose={() => setIsAddStationOpen(false)}
          onSave={(station) => {
            setStations((prev) => [...prev, station])
            setIsAddStationOpen(false)
            showToast(`Added new station: ${station.name}`, 'success')
          }}
        />
      )}
    </div>
  )
}
