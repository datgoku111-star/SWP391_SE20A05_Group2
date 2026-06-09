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

export async function getRevenueReport(params = '') {
  return request(`/reports/revenue${params ? `?${params}` : ''}`)
}

export async function getOccupancyReport(params = '') {
  return request(`/reports/occupancy${params ? `?${params}` : ''}`)
}

export async function getReservationReport(params = '') {
  return request(`/reports/reservations${params ? `?${params}` : ''}`)
}

export async function getCustomReport(reportType, params = '') {
  return request(`/reports/${reportType}${params ? `?${params}` : ''}`)
}
