import { BookOpen } from 'lucide-react'
import { cardClass } from '../lib/utils'

const CONCEPTS = [
  { title: 'Graph Adjacency List', file: 'src/lib/graph.js', desc: 'Represents network topology where stations are vertices and tracks/corridors are bidirectional edges.', complexity: 'Space: O(V + E)' },
  { title: 'Breadth-First Search (BFS)', file: 'src/lib/graph.js', desc: 'Explores nodes level-by-level using a FIFO queue to guarantee the unweighted shortest path (fewest station hops).', complexity: 'Time: O(V + E)' },
  { title: 'Depth-First Search (DFS)', file: 'src/lib/graph.js', desc: 'Explores deep along graph branches using recursion/stack before backtracking.', complexity: 'Time: O(V + E)' },
  { title: 'Binary Search Tree (BST)', file: 'src/lib/bst.js', desc: 'Stores stations ordered by unique numeric ID for fast lookup and hierarchical search paths.', complexity: 'Search: O(log N) average, O(N) worst' },
  { title: 'Queue (FIFO)', file: 'src/sections/QueueSection.jsx', desc: 'First-In, First-Out queue ensuring fair ticket serving order for waiting passengers.', complexity: 'Enqueue/Dequeue: O(1)' },
  { title: 'Deque (Double-Ended Queue)', file: 'src/sections/DequeSection.jsx', desc: 'Supports insertion and deletion at both front and rear ends for priority passenger handling.', complexity: 'Push/Pop: O(1)' },
]

export default function DSAConceptsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {CONCEPTS.map((c) => (
        <div key={c.title} className={`${cardClass} space-y-2`}>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            {c.title}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">{c.desc}</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-block text-[10px] bg-slate-900 text-emerald-400 border border-slate-700 px-2.5 py-1 rounded-md font-mono">{c.complexity}</span>
            <span className="inline-block text-[10px] bg-slate-900 text-slate-400 border border-slate-700 px-2.5 py-1 rounded-md font-mono">{c.file}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
