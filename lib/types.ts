export interface BlogPost {
  _id?: string
  title: string
  description: string
  slug: string
  image: string
  tags: string[]
  content: ContentItem[]
  createdAt: Date
  updatedAt: Date
}

export interface ContentItem {
  title: string
  description: string
  url: string
  ogData?: {
    title?: string
    description?: string
    image?: string
    favicon?: string
  }
}

export interface BlogFormData {
  title: string
  description: string
  image: string
  tags: string[]
  content: ContentItem[]
}
