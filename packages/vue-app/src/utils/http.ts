import { getJwtToken } from '@/apis/auth'
export async function request(
  url: string,
  {
    method = 'GET',
    body,
    headers,
    auth = true
  }: {
    method: 'GET' | 'POST'
    body?: { [key: string]: any }
    headers?: { [key: string]: any }
    auth?: boolean
  }
) {
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
    const result = await res.json()
    return result
  } else {
    const result = await res.json()
    const error = new Error('')
    error.name = 'HTTP ERROR'
    error.message = result.message
    return error
  }
}
