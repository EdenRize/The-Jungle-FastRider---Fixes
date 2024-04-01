const BASE_URL: string = 'https://fast-rider.herokuapp.com/api/v1/'

export const httpService = {
  async get(endpoint: string) {
    return ajax(endpoint, 'GET')
  },
  async post<T>(endpoint: string, data: T) {
    return ajax<T>(endpoint, 'POST', data)
  },
  async put<T>(endpoint: string, data: T) {
    return ajax<T>(endpoint, 'PUT', data)
  },
  async delete(endpoint: string) {
    return ajax(endpoint, 'DELETE')
  },
}

async function ajax<T>(
  endpoint: string,
  method: string = 'GET',
  data: T | null = null
): Promise<any> {
  const url = `${BASE_URL}${endpoint}`
  const requestOptions: RequestInit = {
    method,
  }

  if (data) {
    if (typeof data === 'string' || data instanceof URLSearchParams) {
      requestOptions.body = data
    } else {
      requestOptions.body = JSON.stringify(data)
    }
  }
  try {
    const response = await fetch(url, requestOptions)
    if (!response.ok) {
      throw new Error(
        `Error ${method}ing to the backend, endpoint: ${endpoint}`
      )
    }
    return await response.json()
  } catch (error) {
    console.error(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `,
      data
    )
    console.error(error)
    throw error
  }
}
