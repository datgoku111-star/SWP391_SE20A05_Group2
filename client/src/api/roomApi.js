const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api'

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  })

  const isJson = response.headers.get('content-type')?.includes('application/json')
  const data = isJson ? await response.json() : null

  if (!response.ok) {
    const error = new Error(data?.message || 'API request failed')
    error.status = response.status
    error.payload = data
    throw error
  }

  return data
}

export async function getRooms(query = '') {
  return request(`/rooms${query ? `?${query}` : ''}`)
}

export async function getRoom(roomId) {
  return request(`/rooms/${roomId}`)
}

export async function createRoom(roomData) {
  return request('/rooms', {
    method: 'POST',
    body: JSON.stringify(roomData),
  })
}

export async function updateRoom(roomId, roomData) {
  return request(`/rooms/${roomId}`, {
    method: 'PUT',
    body: JSON.stringify(roomData),
  })
}

export async function deleteRoom(roomId) {
  return request(`/rooms/${roomId}`, {
    method: 'DELETE',
  })
}
