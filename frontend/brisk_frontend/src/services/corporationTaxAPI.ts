/**
 * Corporation Tax API Service  
 * Connects to enhanced backend API for real CRUD operations
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const API_PREFIX = '/api/v1/tax/ct-enhanced'

async function apiCall(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE}${API_PREFIX}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-ID': 'default-tenant',
      ...options.headers,
    },
  })
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }
  
  return response.json()
}

// CT600 Operations
export const ct600API = {
  list: async (params?: { status?: string; tax_year?: string }) => {
    const queryString = params ? '?' + new URLSearchParams(params as any).toString() : ''
    return apiCall(`/ct600/list${queryString}`)
  },
  
  get: async (returnId: string) => {
    return apiCall(`/ct600/${returnId}`)
  },
  
  create: async (data: any) => {
    return apiCall('/ct600/create', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  
  update: async (returnId: string, data: any) => {
    return apiCall(`/ct600/${returnId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  
  delete: async (returnId: string) => {
    return apiCall(`/ct600/${returnId}`, {
      method: 'DELETE',
    })
  },
}

// R&D Claims Operations
export const rdClaimsAPI = {
  list: async (params?: { company_id?: string; status?: string }) => {
    const queryString = params ? '?' + new URLSearchParams(params as any).toString() : ''
    return apiCall(`/rd-claims/list${queryString}`)
  },
  
  get: async (claimId: string) => {
    return apiCall(`/rd-claims/${claimId}`)
  },
  
  create: async (data: any) => {
    return apiCall('/rd-claims/create', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  
  update: async (claimId: string, data: any) => {
    return apiCall(`/rd-claims/${claimId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  
  delete: async (claimId: string) => {
    return apiCall(`/rd-claims/${claimId}`, {
      method: 'DELETE',
    })
  },
}

// Dashboard Stats
export const dashboardAPI = {
  getStats: async () => {
    return apiCall('/dashboard/stats')
  },
}

export default {
  ct600: ct600API,
  rdClaims: rdClaimsAPI,
  dashboard: dashboardAPI,
}
