import { z } from "zod"

export const contentItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  url: z.string().url("Must be a valid URL"),
})

export const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().min(1, "Description is required").max(500, "Description too long"),
  image: z.string().url("Must be a valid image URL"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  content: z.array(contentItemSchema).min(1, "At least one content item is required"),
})

export type BlogFormData = z.infer<typeof blogFormSchema>
