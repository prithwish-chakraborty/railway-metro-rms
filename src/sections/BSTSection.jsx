import { useMemo, useState } from 'react'
import { Binary } from 'lucide-react'
import { BinarySearchTree } from '../lib/bst'
import { cardClass, inputClass } from '../lib/utils'

export default function BSTSection({ stations, showToast }) {
  const bst = useMemo(() => BinarySearchTree.fromStations(stations), [stations])
  const [searchId, setSearchId] = useState('')
  const [searchResult, setSearchResult] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    const id = parseInt(searchId, 10)
    if (isNaN(id)) return
    const res = bst.search(id)
    setSearchResult(res)
    showToast(res.found ? `Station found: ${res.found.name}` : `Station ID ${id} not found in BST`, res.found ? 'success' : 'info')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className={`${cardClass} space-y-4 self-start`}>
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Binary className="w-4 h-4 text-purple-400" />
          Binary Search Tree Lookup
        </h3>
        <form onSubmit={handleSearch} className="space-y-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Enter Station ID to Search</label>
            <input type="number" required placeholder="e.g. 103" value={searchId} onChange={(e) => setSearchId(e.target.value)} className={inputClass} />
          </div>
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-2.5 rounded-xl transition">
            Search BST (O(log N))
          </button>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {searchResult && (
          <div className={`${cardClass} space-y-3`}>
            <h4 className="text-sm font-bold text-white">Search Result</h4>
            {searchResult.found ? (
              <div className="bg-emerald-950/40 border border-emerald-700/60 p-4 rounded-xl space-y-1">
                <p className="text-sm font-bold text-emerald-200">{searchResult.found.name}</p>
                <p className="text-xs text-emerald-400">ID: {searchResult.found.id} &bull; Type: {searchResult.found.type}</p>
                <p className="text-[11px] text-slate-300 pt-2 font-mono">BST Traversal Path: {searchResult.path.join(' → ')}</p>
                <p className="text-[10px] text-slate-500">{searchResult.path.length} comparison(s)</p>
              </div>
            ) : (
              <div className="bg-rose-950/40 border border-rose-700/60 p-4 rounded-xl text-rose-200 text-xs space-y-1">
                <p>No station found matching ID. BST Traversal reached a null leaf node.</p>
                {searchResult.path.length > 0 && (
                  <p className="font-mono text-rose-300/80">Visited: {searchResult.path.join(' → ')} → null</p>
                )}
              </div>
            )}
          </div>
        )}

        <div className={cardClass}>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">All In-Order BST Nodes</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {bst.inOrder().map((st) => (
              <div key={st.id} className={`bg-slate-900 p-2.5 rounded-lg border text-xs ${searchResult?.path.includes(st.id) ? 'border-purple-500' : 'border-slate-700'}`}>
                <span className="font-bold font-mono text-purple-400">{st.id}</span>
                <p className="text-slate-200 font-medium truncate">{st.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
