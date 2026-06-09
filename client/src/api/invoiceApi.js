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

export async function getInvoices(params = '') {
  return request(`/invoices${params ? `?${params}` : ''}`)
}

export async function getInvoice(invoiceId) {
  return request(`/invoices/${invoiceId}`)
}

export async function createInvoice(invoiceData) {
  return request('/invoices', {
    method: 'POST',
    body: JSON.stringify(invoiceData),
  })
}

export async function updateInvoice(invoiceId, invoiceData) {
  return request(`/invoices/${invoiceId}`, {
    method: 'PUT',
    body: JSON.stringify(invoiceData),
  })
}

export async function payInvoice(invoiceId) {
  return request(`/invoices/${invoiceId}/pay`, {
    method: 'POST',
  })
}

export async function deleteInvoice(invoiceId) {
  return request(`/invoices/${invoiceId}`, {
    method: 'DELETE',
  })
}
