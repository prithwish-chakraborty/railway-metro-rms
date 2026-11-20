// SVG renderer for the station graph. Railway edges are dashed blue, metro edges solid green,
// and the active BFS/DFS path is highlighted in orange.

const NODE_STROKE = { Railway: '#2563EB', Metro: '#10B981', Interchange: '#A855F7' }

function isEdgeOnPath(path, a, b) {
  for (let i = 0; i < path.length - 1; i++) {
    if ((path[i] === a && path[i + 1] === b) || (path[i] === b && path[i + 1] === a)) return true
  }
  return false
}

export default function NetworkSVG({ stations, connections, highlightPath = [], selectedNode, onSelectNode }) {
  const byId = new Map(stations.map((s) => [s.id, s]))

  return (
    <svg className="w-full h-full select-none" viewBox="0 0 800 600" role="img" aria-label="Railway and metro network map">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {connections.map((conn, idx) => {
        const s1 = byId.get(conn.from)
        const s2 = byId.get(conn.to)
        if (!s1 || !s2) return null
        const highlighted = highlightPath.length > 1 && isEdgeOnPath(highlightPath, s1.id, s2.id)
        const stroke = highlighted ? '#F97316' : conn.type === 'Railway' ? '#2563EB' : '#10B981'
        return (
          <line
            key={`${conn.from}-${conn.to}-${idx}`}
            x1={s1.x} y1={s1.y} x2={s2.x} y2={s2.y}
            stroke={stroke}
            strokeWidth={highlighted ? 5 : 2.5}
            strokeDasharray={conn.type === 'Metro' ? 'none' : '6 3'}
            opacity={highlighted ? 1 : 0.7}
          />
        )
      })}

      {stations.map((st) => {
        const isSelected = selectedNode?.id === st.id
        const inPath = highlightPath.includes(st.id)
        return (
          <g
            key={st.id}
            transform={`translate(${st.x}, ${st.y})`}
            onClick={() => onSelectNode?.(isSelected ? null : st)}
            className="cursor-pointer"
          >
            <title>{`${st.name} — ${st.type} (${st.line})`}</title>
            {inPath && <circle r="16" fill="#F97316" opacity="0.3" className="animate-ping" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />}
            <circle
              r={isSelected ? 12 : 9}
              fill={inPath ? '#F97316' : '#1E293B'}
              stroke={inPath ? '#FFEDD5' : NODE_STROKE[st.type] || '#64748B'}
              strokeWidth="3"
              className="transition-all duration-200"
            />
            <circle r="3" fill="#FFFFFF" />
            <text y="-14" textAnchor="middle" fill="#F8FAFC" fontSize="10" fontWeight="600" className="pointer-events-none">
              {st.name}
            </text>
            <text y="22" textAnchor="middle" fill="#94A3B8" fontSize="8" className="pointer-events-none">
              ID: {st.id}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
