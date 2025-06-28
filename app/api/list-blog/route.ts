import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Blog from "@/models/list-blog";
import { blogFormSchema } from "@/lib/validations";

export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all blog posts from the database
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Sort by creation date, newest first

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const result = blogFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid data", details: result.error.errors }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Create a new blog post in the database
    const newBlog = await Blog.create({
      ...result.data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}