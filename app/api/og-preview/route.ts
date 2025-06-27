import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 })
  }

  try {
    // In a real implementation, you would:
    // 1. Fetch the URL
    // 2. Parse the HTML for Open Graph tags
    // 3. Extract favicon, title, description, image

    // For now, return mock data
    const mockOGData = {
      title: "Example Website",
      description: "This is a sample description for the website preview.",
      image: "/placeholder.svg?height=120&width=200",
      favicon: "/placeholder.svg?height=16&width=16",
    }

    return NextResponse.json(mockOGData)
  } catch (error) {
    console.error("Error fetching OG data:", error)
    return NextResponse.json({ error: "Failed to fetch preview data" }, { status: 500 })
  }
}
