import { BlogPost } from "@/lib/types"
import { type NextRequest, NextResponse } from "next/server"

// Mock database - same as in the main route
const mockBlogs: any[] = [
  {
    _id: "1",
    title: "The Future of AI in Web Development",
    description:
      "Exploring how artificial intelligence is revolutionizing the way we build and design websites, from automated code generation to intelligent user experiences.",
    slug: "future-of-ai-web-development",
    image: "/placeholder.svg?height=400&width=800",
    tags: ["AI", "Web Development", "Technology", "Future"],
    content: [
      {
        title: "OpenAI GPT-4 Documentation",
        description:
          "Comprehensive guide to using GPT-4 for various applications including code generation and content creation.",
        url: "https://openai.com/gpt-4",
      },
      {
        title: "GitHub Copilot",
        description: "AI-powered code completion tool that helps developers write code faster and with fewer errors.",
        url: "https://github.com/features/copilot",
      },
    ],
    createdAt: new Date("2024-01-15").toISOString(),
    updatedAt: new Date("2024-01-15").toISOString(),
  },
]

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const blog = mockBlogs.find((b) => b.slug === params.slug)

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error("Error fetching blog:", error)
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 })
  }
}
