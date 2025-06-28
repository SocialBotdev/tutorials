import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Blog from "@/models/list-blog";

export async function GET(request: NextRequest, context: { params: { slug: string } }) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch the blog post by slug
    const blog = await Blog.findOne({ slug: context.params.slug });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}