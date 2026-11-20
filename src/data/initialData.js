// Initial demo data: sample Kolkata / Howrah railway and metro network.
// "Reset Data" in the app restores exactly these values.

export const INITIAL_STATIONS = [
  { id: 101, name: 'Howrah Junction', type: 'Interchange', line: 'Eastern / Green Line', x: 180, y: 320 },
  { id: 102, name: 'Sealdah Station', type: 'Interchange', line: 'Eastern / Red Line', x: 420, y: 320 },
  { id: 103, name: 'Esplanade', type: 'Interchange', line: 'Blue / Green Line', x: 300, y: 320 },
  { id: 104, name: 'Mahakaran', type: 'Metro', line: 'Green Line', x: 240, y: 320 },
  { id: 105, name: 'Salt Lake Sector V', type: 'Metro', line: 'Green Line', x: 620, y: 320 },
  { id: 106, name: 'Phoolbagan', type: 'Metro', line: 'Green Line', x: 520, y: 320 },
  { id: 107, name: 'Karunamoyee', type: 'Metro', line: 'Green Line', x: 570, y: 320 },
  { id: 108, name: 'Bandel Junction', type: 'Railway', line: 'Main Railway Line', x: 180, y: 100 },
  { id: 109, name: 'Barrackpore', type: 'Railway', line: 'North Suburban', x: 300, y: 160 },
  { id: 110, name: 'Dum Dum', type: 'Interchange', line: 'Blue Line / Eastern', x: 300, y: 220 },
  { id: 111, name: 'Park Street', type: 'Metro', line: 'Blue Line', x: 300, y: 400 },
  { id: 112, name: 'Rabindra Sarobar', type: 'Metro', line: 'Blue Line', x: 300, y: 480 },
]

export const INITIAL_CONNECTIONS = [
  { from: 108, to: 109, type: 'Railway' },
  { from: 109, to: 110, type: 'Railway' },
  { from: 110, to: 102, type: 'Railway' },
  { from: 101, to: 104, type: 'Metro' },
  { from: 104, to: 103, type: 'Metro' },
  { from: 103, to: 106, type: 'Metro' },
  { from: 106, to: 107, type: 'Metro' },
  { from: 107, to: 105, type: 'Metro' },
  { from: 110, to: 103, type: 'Metro' },
  { from: 103, to: 111, type: 'Metro' },
  { from: 111, to: 112, type: 'Metro' },
  { from: 101, to: 102, type: 'Railway' },
  { from: 102, to: 106, type: 'Railway' },
]

export const INITIAL_PASSENGERS = [
  { id: 'P101', name: 'Ananya Roy', ticketClass: 'Express', destination: 'Sealdah Station', time: '10:12 AM' },
  { id: 'P102', name: 'Rahul Sharma', ticketClass: 'Metro Line', destination: 'Salt Lake Sector V', time: '10:15 AM' },
  { id: 'P103', name: 'Priya Mukherjee', ticketClass: 'General', destination: 'Howrah Junction', time: '10:18 AM' },
]

export const INITIAL_DEQUE = [
  { id: 'DQ101', name: 'Suresh Das', priority: 'Senior Citizen', position: 'Front' },
  { id: 'DQ102', name: 'Mita Sen', priority: 'VIP Pass', position: 'Rear' },
]

export const STATION_TYPES = ['Railway', 'Metro', 'Interchange']
export const TRAVEL_MODES = ['Combined', 'Railway', 'Metro']
