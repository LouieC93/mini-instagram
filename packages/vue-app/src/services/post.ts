import { request } from '@/utils/http'

export async function sendNewPost(image: File, description: string) {
  const body = new FormData()
  body.append('files.image', image)
  body.append('data', JSON.stringify({ description }))

  await request('/api/posts', {
    method: 'POST',
    body,
    isUpload: true
  })
}
