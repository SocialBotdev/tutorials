import { type NextRequest, NextResponse } from "next/server"
import { blogFormSchema } from "@/lib/validations"

// Mock database - in a real app, you'd use MongoDB
const mockBlogs: any[] = [
  // {
  //   _id: "1",
  //   title: "Building Scalable React Applications with Modern Architecture",
  //   description:
  //     "Exploring advanced patterns and techniques for building maintainable React applications that can grow with your team and requirements.",
  //   slug: "building-scalable-react-applications",
  //   image: "/placeholder.svg?height=400&width=800",
  //   tags: ["React", "Architecture", "Frontend", "JavaScript"],
  //   content: [
  //     {
  //       title: "React Architecture Patterns",
  //       description: "Comprehensive guide to structuring large React applications with proven architectural patterns.",
  //       url: "https://reactpatterns.com",
  //     },
  //     {
  //       title: "State Management Best Practices",
  //       description:
  //         "Modern approaches to managing state in React applications using Context, Zustand, and Redux Toolkit.",
  //       url: "https://redux-toolkit.js.org",
  //     },
  //     {
  //       title: "Component Design Systems",
  //       description: "Building reusable component libraries that scale across multiple projects and teams.",
  //       url: "https://storybook.js.org",
  //     },
  //   ],
  //   createdAt: new Date("2024-01-20").toISOString(),
  //   updatedAt: new Date("2024-01-20").toISOString(),
  // },
  // {
  //   _id: "2",
  //   title: "The Art of CSS: Modern Techniques for Beautiful Web Design",
  //   description:
  //     "Discover the latest CSS features and design techniques that will elevate your web projects to the next level.",
  //   slug: "modern-css-techniques-beautiful-design",
  //   image: "/placeholder.svg?height=400&width=800",
  //   tags: ["CSS", "Design", "Frontend", "Web Development"],
  //   content: [
  //     {
  //       title: "CSS Grid Layout Mastery",
  //       description: "Everything you need to know about CSS Grid to create complex, responsive layouts with ease.",
  //       url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
  //     },
  //     {
  //       title: "Modern CSS Animation Techniques",
  //       description: "Creating smooth, performant animations using CSS transforms, transitions, and keyframes.",
  //       url: "https://web.dev/animations/",
  //     },
  //   ],
  //   createdAt: new Date("2024-01-15").toISOString(),
  //   updatedAt: new Date("2024-01-15").toISOString(),
  // },
  // {
  //   _id: "3",
  //   title: "TypeScript Best Practices for Large-Scale Applications",
  //   description:
  //     "Learn how to leverage TypeScript's powerful type system to build more reliable and maintainable applications.",
  //   slug: "typescript-best-practices-large-scale",
  //   image: "/placeholder.svg?height=400&width=800",
  //   tags: ["TypeScript", "JavaScript", "Development", "Best Practices"],
  //   content: [
  //     {
  //       title: "TypeScript Handbook",
  //       description: "The official TypeScript documentation with comprehensive guides and examples.",
  //       url: "https://www.typescriptlang.org/docs/",
  //     },
  //     {
  //       title: "Advanced TypeScript Patterns",
  //       description: "Deep dive into advanced TypeScript patterns for building robust applications.",
  //       url: "https://github.com/microsoft/TypeScript",
  //     },
  //   ],
  //   createdAt: new Date("2024-01-25").toISOString(),
  //   updatedAt: new Date("2024-01-25").toISOString(),
  // },
]

export async function GET() {
  try {
    // Sort by creation date, newest first
    const sortedBlogs = mockBlogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json(sortedBlogs)
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const result = blogFormSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Invalid data", details: result.error.errors }, { status: 400 })
    }

    // Create new blog post
    const newBlog = {
      _id: Date.now().toString(),
      ...result.data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Add to mock database
    mockBlogs.push(newBlog)

    return NextResponse.json(newBlog, { status: 201 })
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
