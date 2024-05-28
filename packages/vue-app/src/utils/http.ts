import { getJwtToken } from '@/apis/auth'
interface RequestOptions {
  method: 'GET' | 'POST'
  body?: { [key: string]: any }
  headers?: { [key: string]: any }
  auth?: boolean
}
export async function request<T>(
  url: string,
  { method = 'GET', body, headers, auth = true }: RequestOptions
): Promise<T> {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(auth && { Authorization: `Bearer ${getJwtToken()}` }),
        ...headers
      },
      ...(body && { body: JSON.stringify(body) })
    })

    if (res.status < 400) {
      const result: T = await res.json()
      console.log('[http]', result)
      return result
    } else {
      const result = await res.json()
      const error = new Error('')
      error.name = 'HTTP ERROR'
      error.message = result.message
      throw error
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
