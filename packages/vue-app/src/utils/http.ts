import { getJwtToken } from '@/services/auth'
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT'
  body?: { [key: string]: any } | FormData
  headers?: { [key: string]: any }
  auth?: boolean
  isUpload?: boolean
}
export async function request<T>(url: string, options?: RequestOptions): Promise<T> {
  try {
    const { method = 'GET', body, headers, auth = true, isUpload = false } = options || {}
    const fetchOptions = isUpload
      ? {
          method,
          headers: {
            ...(auth && { Authorization: `Bearer ${getJwtToken()}` }),
            ...headers
          },
          body: body as FormData
        }
      : {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...(auth && { Authorization: `Bearer ${getJwtToken()}` }),
            ...headers
          },
          ...(body && { body: JSON.stringify(body) })
        }
    const res = await fetch(url, fetchOptions)

    if (res.status < 400) {
      const result: T = await res.json()
      return result
    } else {
      const result = await res.json()
      const error = new Error('')
      error.name = 'HTTP STATUS ERROR'
      error.message = result.message
      throw error
    }
  } catch (error) {
    const newError = new Error()
    newError.name = 'HTTP ERROR'
    newError.message = (error as Error).message
    throw newError
  }
}
