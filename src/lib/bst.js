// Binary Search Tree keyed by numeric station ID.
// Average search/insert: O(log N); worst case (sorted inserts): O(N).

class BSTNode {
  constructor(station) {
    this.station = station
    this.left = null
    this.right = null
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null
  }

  insert(station) {
    const newNode = new BSTNode(station)
    if (!this.root) {
      this.root = newNode
      return
    }
    let current = this.root
    while (true) {
      if (station.id < current.station.id) {
        if (!current.left) { current.left = newNode; break }
        current = current.left
      } else if (station.id > current.station.id) {
        if (!current.right) { current.right = newNode; break }
        current = current.right
      } else {
        current.station = station // duplicate key: update in place
        break
      }
    }
  }

  /** Returns the matching station (or null) and the IDs visited on the way. */
  search(id) {
    let current = this.root
    const path = []
    while (current) {
      path.push(current.station.id)
      if (id === current.station.id) return { found: current.station, path }
      current = id < current.station.id ? current.left : current.right
    }
    return { found: null, path }
  }

  /** In-order traversal: stations sorted by ID. */
  inOrder() {
    const out = []
    const walk = (node) => {
      if (!node) return
      walk(node.left)
      out.push(node.station)
      walk(node.right)
    }
    walk(this.root)
    return out
  }

  static fromStations(stations) {
    const bst = new BinarySearchTree()
    stations.forEach((s) => bst.insert(s))
    return bst
  }
}
