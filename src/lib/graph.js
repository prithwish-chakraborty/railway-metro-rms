// Graph algorithms over the station network.
// Stations are vertices; connections are undirected edges stored in an adjacency list.

/**
 * Build an adjacency list: { [stationId]: [{ node, type }] }.
 * modeFilter: 'Combined' | 'Railway' | 'Metro'
 */
export function buildGraph(stations, connections, modeFilter = 'Combined') {
  const graph = {}
  stations.forEach((s) => { graph[s.id] = [] })
  connections.forEach((conn) => {
    if (modeFilter !== 'Combined' && conn.type !== modeFilter) return
    if (graph[conn.from] && graph[conn.to]) {
      graph[conn.from].push({ node: conn.to, type: conn.type })
      graph[conn.to].push({ node: conn.from, type: conn.type })
    }
  })
  return graph
}

/**
 * Breadth-First Search: shortest path by number of hops (unweighted). O(V + E)
 * Returns { path: number[], edges: number }. Empty path means unreachable.
 */
export function bfsShortestPath(graph, sourceId, destId) {
  const src = Number(sourceId)
  const dst = Number(destId)
  if (src === dst) return { path: [src], edges: 0 }
  if (!graph[src] || !graph[dst]) return { path: [], edges: 0 }

  const queue = [src]
  let head = 0 // index pointer gives O(1) dequeue instead of Array.shift()
  const visited = new Set([src])
  const parent = {}

  while (head < queue.length) {
    const curr = queue[head++]
    if (curr === dst) {
      const path = []
      for (let node = dst; node !== undefined; node = parent[node]) path.push(node)
      path.reverse()
      return { path, edges: path.length - 1 }
    }
    for (const neighbor of graph[curr]) {
      if (!visited.has(neighbor.node)) {
        visited.add(neighbor.node)
        parent[neighbor.node] = curr
        queue.push(neighbor.node)
      }
    }
  }
  return { path: [], edges: 0 }
}

/**
 * Depth-First Search (recursive). Returns the order in which stations are visited. O(V + E)
 */
export function dfsTraversal(graph, startId) {
  const start = Number(startId)
  const visited = new Set()
  const order = []

  const visit = (node) => {
    visited.add(node)
    order.push(node)
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor.node)) visit(neighbor.node)
    }
  }

  if (graph[start]) visit(start)
  return order
}
