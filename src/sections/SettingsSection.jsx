import { Download, FileJson, RotateCcw } from 'lucide-react'

export const SOURCE_ZIP_URL = '/railway-metro-rms.zip'

export default function SettingsSection({ resetDemoData, stations, connections, showToast }) {
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify({ stations, connections }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'railway_metro_graph.json'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    showToast('Exported system graph JSON!', 'success')
  }

  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl space-y-6 max-w-2xl">
      <h3 className="text-base font-bold text-white">System Data &amp; Project Settings</h3>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-blue-950/40 rounded-xl border border-blue-700/60 gap-4">
          <div>
            <p className="text-xs font-bold text-blue-200">Download Source Code (.zip)</p>
            <p className="text-[10px] text-blue-300/90">The full React + Vite project, ready to push to a GitHub repository.</p>
          </div>
          <a href={SOURCE_ZIP_URL} download className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-lg shrink-0 flex items-center gap-1.5 justify-center">
            <Download className="w-3.5 h-3.5" /> Download .ZIP
          </a>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-slate-900 rounded-xl border border-slate-700 gap-4">
          <div>
            <p className="text-xs font-bold text-white">Export Graph JSON</p>
            <p className="text-[10px] text-slate-400">Download current station nodes and adjacency list configuration.</p>
          </div>
          <button onClick={exportJSON} className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg shrink-0 flex items-center gap-1.5 justify-center">
            <FileJson className="w-3.5 h-3.5" /> Export JSON
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-slate-900 rounded-xl border border-slate-700 gap-4">
          <div>
            <p className="text-xs font-bold text-white">Reset Demo Data</p>
            <p className="text-[10px] text-slate-400">Restores the initial sample Kolkata/Howrah metro stations and track connections.</p>
          </div>
          <button onClick={resetDemoData} className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-lg shrink-0 flex items-center gap-1.5 justify-center">
            <RotateCcw className="w-3.5 h-3.5" /> Reset Demo
          </button>
        </div>
      </div>
    </div>
  )
}
