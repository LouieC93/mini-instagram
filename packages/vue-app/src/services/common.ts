import { request } from '@/utils/http'

export async function sendFileUpload(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('files', file)
  const res = await request<UploadResponse[]>('/api/upload', {
    method: 'POST',
    body: formData,
    isUpload: true
  })

  return res[0].url
}

export interface UploadResponse {
  id: number
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: any
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string
  provider: string
  provider_metadata: string
  createdAt: string
  updatedAt: string
}
