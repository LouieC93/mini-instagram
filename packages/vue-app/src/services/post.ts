import { request } from '@/utils/http'
import type { UserResponse } from './auth'

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

export async function sendLoadPosts(): Promise<Post[]> {
  const res = await request<{ data: any[] }>('/api/posts?populate=*')
  return res.data.map((post) => {
    return {
      id: post.id,
      imgUrl: post.attributes.image.data.attributes.url,
      description: post.attributes.description,
      like_by: post.attributes.like_by,
      save_by: post.attributes.save_by,
      likedByMe: post.attributes.likedByMe,
      savedByMe: post.attributes.savedByMe,
      comments: post.attributes.comments,
      publishedAt: post.attributes.publishedAt,
      post_by: {
        ...post.attributes.post_by.data.attributes,
        id: post.attributes.post_by.data.id
      }
    }
  })
}

export async function sendLike(postId: number): Promise<boolean> {
  const res = await request<{ data: any }>(`/api/posts/${postId}/like`, {method: 'PUT'})
  return res.data
}
export async function sendSave(postId: number): Promise<boolean> {
  const res = await request<{ data: any }>(`/api/posts/${postId}/save`, {method: 'PUT'})
  return res.data
}

export interface Post {
  id: number
  imgUrl: string
  description: string
  like_by: number
  save_by: number
  likedByMe: boolean
  savedByMe: boolean
  comments: number
  publishedAt: string
  post_by: UserResponse
}
