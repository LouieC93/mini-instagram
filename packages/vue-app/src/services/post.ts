import { request } from '@/utils/http'
import type { UserResponse } from './auth'
import { getPublishDate } from '@/utils/date'
import { getShortAmount } from '@/utils/number'

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
      like_by: getShortAmount(post.attributes.like_by),
      save_by: getShortAmount(post.attributes.save_by),
      likedByMe: post.attributes.likedByMe,
      savedByMe: post.attributes.savedByMe,
      comments: getShortAmount(post.attributes.comments),
      publishedAt: getPublishDate(post.attributes.publishedAt),
      post_by: {
        ...post.attributes.post_by.data.attributes,
        id: post.attributes.post_by.data.id
      }
    }
  })
}

export interface Post {
  id: number
  imgUrl: string
  description: string
  like_by: string
  save_by: string
  likedByMe: boolean
  savedByMe: boolean
  comments: string
  publishedAt: string
  post_by: UserResponse
}
