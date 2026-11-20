export const currentTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

/** Short unique ID like "P4821" — avoids duplicate React keys from random collisions. */
export const makeId = (prefix) =>
  `${prefix}${Date.now().toString(36).slice(-4).toUpperCase()}${Math.floor(Math.random() * 90 + 10)}`

export const inputClass =
  'w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-lg p-2.5 focus:outline-none focus:border-blue-500'

export const cardClass = 'bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-xl'
