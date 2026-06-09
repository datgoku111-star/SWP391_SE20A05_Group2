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

export async function getReservations(params = '') {
  return request(`/reservations${params ? `?${params}` : ''}`)
}

export async function getReservation(reservationId) {
  return request(`/reservations/${reservationId}`)
}

export async function createReservation(reservationData) {
  return request('/reservations', {
    method: 'POST',
    body: JSON.stringify(reservationData),
  })
}

export async function updateReservation(reservationId, reservationData) {
  return request(`/reservations/${reservationId}`, {
    method: 'PUT',
    body: JSON.stringify(reservationData),
  })
}

export async function cancelReservation(reservationId) {
  return request(`/reservations/${reservationId}`, {
    method: 'DELETE',
  })
}
