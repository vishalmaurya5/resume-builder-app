const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const AUTH_STORAGE_KEY = 'resume-builder-auth'

if (typeof window !== 'undefined') {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export const getStoredAuth = () => {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || 'null')
  } catch {
    return null
  }
}

export const setStoredAuth = (auth) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))
}

export const clearStoredAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

const request = async (path, options = {}) => {
  const { token: requestToken, headers, ...fetchOptions } = options
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(requestToken ? { Authorization: `Bearer ${requestToken}` } : {}),
      ...headers,
    },
    ...fetchOptions,
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(payload.message || 'API request failed')
    error.status = response.status
    throw error
  }

  return payload.data ?? payload
}

export const authApi = {
  register: (credentials) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  login: (credentials) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  me: () => request('/auth/me'),
}

export const resumeApi = {
  list: (token) => request('/resumes', { token }),
  get: (id, token) => request(`/resumes/${id}`, { token }),
  getPublic: (id) => request(`/resumes/public/${id}`),
  create: (resume, token) =>
    request('/resumes', {
      method: 'POST',
      token,
      body: JSON.stringify(resume),
    }),
  update: (id, resume, token) =>
    request(`/resumes/${id}`, {
      method: 'PUT',
      token,
      body: JSON.stringify(resume),
    }),
  remove: (id, token) =>
    request(`/resumes/${id}`, {
      method: 'DELETE',
      token,
    }),
}
