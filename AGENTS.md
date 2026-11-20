# AGENTS.md

## What this is
Railway & Metro Route Management System: a client-only React SPA built as an educational DSA project. It visualises a transit graph and demonstrates Graph, BFS, DFS, BST, Queue and Deque. There is no backend; all state lives in `localStorage`.

## Stack
React 19 + Vite 8 + Tailwind CSS v4 (via `@tailwindcss/vite`, configured in `src/index.css` with `@theme`) + `lucide-react` icons. Plain JavaScript (JSX), no TypeScript.

## Architecture
- `src/App.jsx` owns all persistent state through `useLocalStorage` (keys `rms_stations`, `rms_connections`, `rms_passengers`, `rms_deque`, `rms_history`) and switches screens with `activeTab`. There is no router; tabs are listed in `src/components/navItems.js`.
- `src/sections/*`: one component per sidebar screen. Each receives state and setters as props.
- `src/components/*`: shared UI (Sidebar, NetworkSVG map, Modal, StationFormModal for add and edit, Toast, StatCard).
- `src/lib/graph.js` and `src/lib/bst.js`: pure algorithm code with no React. Keep them pure so they stay easy to read and test.
- `src/data/initialData.js`: demo data, also used by "Reset Data".

## Conventions
- Station IDs are numbers and must be unique (they are the BST key). `<select>` values are converted with `Number(...)` before being stored.
- Connections are undirected `{ from, to, type: 'Railway' | 'Metro' }`.
- Map coordinates live in an 800×600 SVG viewBox.
- Use functional state updates (`setX(prev => ...)`) when changing arrays.
- Reuse `inputClass` and `cardClass` from `src/lib/utils.js` for consistent styling.

## Source zip
`public/railway-metro-rms.zip` is a snapshot of the source code, served at `/railway-metro-rms.zip` and linked from Settings. After changing code, regenerate it from the repo root, excluding `node_modules`, `dist`, `.netlify`, `.git` and the zip itself.
