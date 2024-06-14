import { getJwtToken } from '@/services/auth'
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT'
  body?: { [key: string]: any } | FormData
  headers?: { [key: string]: any }
  auth?: boolean
  isUpload?: boolean
}
export class HttpStatusError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'HTTP STATUS ERROR'
  }
}
export async function request<T>(url: string, options?: RequestOptions): Promise<T> {
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
  try {
    const res = await fetch(url, fetchOptions)
    if (res.status < 400) {
      const result: T = await res.json()
      return result
    } else {
      const result = await res.json()
      const error = new HttpStatusError(result.error.message)
      throw error
    }
  } catch (error) {
    if (error instanceof HttpStatusError) {
      throw error
    } else {
      const newError = new Error()
      newError.name = 'HTTP ERROR'
      newError.message = (error as Error).message
      throw newError
    }
  }
}
