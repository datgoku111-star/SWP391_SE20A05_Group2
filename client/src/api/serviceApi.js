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

export async function getServices(params = '') {
  return request(`/services${params ? `?${params}` : ''}`)
}

export async function getService(serviceId) {
  return request(`/services/${serviceId}`)
}

export async function createService(serviceData) {
  return request('/services', {
    method: 'POST',
    body: JSON.stringify(serviceData),
  })
}

export async function updateService(serviceId, serviceData) {
  return request(`/services/${serviceId}`, {
    method: 'PUT',
    body: JSON.stringify(serviceData),
  })
}

export async function deleteService(serviceId) {
  return request(`/services/${serviceId}`, {
    method: 'DELETE',
  })
}
