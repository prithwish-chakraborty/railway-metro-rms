import {
  LayoutDashboard, Building2, GitFork, Map, Navigation, GitCommitHorizontal,
  Binary, Users, Layers, History, BookOpen, Settings,
} from 'lucide-react'

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'stations', label: 'Station Directory', icon: Building2, badgeKey: 'stations' },
  { id: 'connections', label: 'Graph Connections', icon: GitFork },
  { id: 'map', label: 'Interactive Map', icon: Map },
  { id: 'bfs', label: 'Route Finder (BFS)', icon: Navigation },
  { id: 'dfs', label: 'DFS Traversal', icon: GitCommitHorizontal },
  { id: 'bst', label: 'BST Search', icon: Binary },
  { id: 'queue', label: 'Passenger Queue', icon: Users, badgeKey: 'queue' },
  { id: 'deque', label: 'Priority Deque', icon: Layers, badgeKey: 'deque' },
  { id: 'history', label: 'Route History', icon: History },
  { id: 'dsa', label: 'DSA Viva Concepts', icon: BookOpen },
  { id: 'settings', label: 'System Settings', icon: Settings },
]
