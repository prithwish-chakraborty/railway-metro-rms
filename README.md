# 🚆 Railway & Metro Route Management System

An interactive **Data Structures & Algorithms** project that models a railway and metro network (sample data: Kolkata / Howrah) and lets you explore classic DSA concepts on it:

| Concept | Where it's used | Complexity |
| --- | --- | --- |
| **Graph (adjacency list)** | Stations are vertices, tracks are undirected edges | Space O(V + E) |
| **Breadth-First Search** | Route Finder: shortest route by number of hops | O(V + E) |
| **Depth-First Search** | DFS Traversal: recursive visit order from a station | O(V + E) |
| **Binary Search Tree** | BST Search: look up stations by numeric ID | O(log N) avg |
| **Queue (FIFO)** | Passenger Queue: ticket-counter serving order | O(1) |
| **Deque** | Priority Deque: push/pop at both ends | O(1) |

## ✨ Features

- **Dashboard**: live stats, mini network map, recent routes, next passenger
- **Station Directory**: search, filter, add, edit and delete stations
- **Graph Connections**: add and remove railway or metro edges
- **Interactive Map**: SVG network map; click a station to see its neighbours
- **Route Finder (BFS)**: shortest path in Combined, Railway-only or Metro-only mode, highlighted on the map
- **DFS Traversal**, **BST Search**, **Passenger Queue**, **Priority Deque**
- **Route History**: replay any earlier route on the map
- **DSA Viva Concepts**: quick revision notes
- **Settings**: export the graph as JSON, reset demo data, download the source code
- All data is saved in the browser's `localStorage`, so no backend is needed

## 🛠 Tech Stack

- [React 19](https://react.dev)
- [Vite](https://vite.dev) (dev server and bundler)
- [Tailwind CSS v4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) icons

## 🚀 Getting Started

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install       # install dependencies
npm run dev       # start the dev server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # preview the production build
```

## 📁 Project Structure

```
├── index.html                  # HTML entry
├── netlify.toml                # Netlify build settings
├── public/                     # static files (favicon, source zip)
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # app shell: state, header, tab routing
    ├── index.css               # Tailwind import and theme colours
    ├── data/initialData.js     # demo stations, connections, passengers
    ├── lib/
    │   ├── graph.js            # buildGraph, BFS, DFS
    │   ├── bst.js              # BinarySearchTree class
    │   └── utils.js            # small helpers and shared class names
    ├── hooks/useLocalStorage.js
    ├── components/             # Sidebar, NetworkSVG, modals, cards, toast
    └── sections/               # one file per sidebar screen
```

## 📤 Putting it on GitHub

```bash
git init
git add .
git commit -m "Railway & Metro Route Management System"
git branch -M main
git remote add origin https://github.com/<your-username>/railway-metro-rms.git
git push -u origin main
```

## 🌐 Deploying

The repo already includes a `netlify.toml`. Connect the GitHub repository to Netlify and it builds with `npm run build` and publishes `dist/`. Any static host that can run a Vite build works too.
