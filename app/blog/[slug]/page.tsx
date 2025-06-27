import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { BlogPost } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, ExternalLink, Twitter, Linkedin, Calendar, Clock, Share2, BookOpen } from "lucide-react"

interface BlogDetailPageProps {
  params: {
    slug: string
  }
}

async function getBlog(slug: string): Promise<BlogPost | null> {
  try {
    // In a real app, this would fetch from your database
    const mockBlog: BlogPost = {
      _id: "1",
      title: "The Future of AI in Web Development",
      description:
        "Exploring how artificial intelligence is revolutionizing the way we build and design websites, from automated code generation to intelligent user experiences.",
      slug: slug,
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
        {
          title: "Vercel AI SDK",
          description:
            "Open-source library for building AI-powered applications with React, Next.js, and other frameworks.",
          url: "https://sdk.vercel.ai",
        },
      ],
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
    }

    return mockBlog
  } catch (error) {
    return null
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const blog = await getBlog(params.slug)

  if (!blog) {
    notFound()
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/blog/${blog.slug}`
  const shareText = `Check out this article: ${blog.title}`
  const readTime = Math.ceil(blog.content.length * 2)

  return (
    <div className="min-h-screen bg-neutralbg-3">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="group hover:bg-coral-1 hover:text-coral-7 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to articles
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <Card className="overflow-hidden shadow-xl border-0 mb-8">
          <div className="relative aspect-[21/9] overflow-hidden">
            <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Floating metadata */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-4 text-white/90 text-sm mb-4">
                <div className="flex items-center gap-2 bg-coral-5/90 backdrop-blur-sm rounded-full px-3 py-1 text-white">
                  <Calendar className="w-4 h-4" />
                  {formatDate(blog.createdAt)}
                </div>
                <div className="flex items-center gap-2 bg-coral-5/90 backdrop-blur-sm rounded-full px-3 py-1 text-white">
                  <Clock className="w-4 h-4" />
                  {readTime} min read
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-8">
            <div className="space-y-6">
              <h1 className="text-h1-mobile md:text-h1-desktop font-serif-display text-neutralbg-11 leading-tight">
                {blog.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">{blog.description}</p>

              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <Badge
                    key={tag}
                    className="hover:scale-105 transition-transform duration-200 bg-coral-2 text-coral-8 hover:bg-coral-3"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <Separator />

              {/* Share Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-neutralbg-11">Share this article</span>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="hover:bg-coral-1 hover:border-coral-4 hover:text-coral-7 hover:scale-105 active:scale-95 transition-all duration-300 bg-transparent border-coral-3"
                  >
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="hover:bg-coral-1 hover:border-coral-4 hover:text-coral-7 hover:scale-105 active:scale-95 transition-all duration-300 bg-transparent border-coral-3"
                  >
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Resources */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <BookOpen className="w-6 h-6 text-coral-6" />
            <h2 className="text-h2-mobile md:text-h2-desktop font-serif-display text-neutralbg-11">
              Curated Resources
            </h2>
            <div className="h-px bg-gradient-to-r from-coral-5 via-coral-4 to-coral-3 flex-1"></div>
          </div>

          <div className="grid gap-6">
            {blog.content.map((item, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-sm animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-serif-display font-medium text-neutralbg-11 group-hover:text-coral-6 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      <div className="flex items-center gap-2 text-sm text-coral-5">
                        <ExternalLink className="w-4 h-4" />
                        <span className="truncate">{item.url}</span>
                      </div>
                    </div>

                    <Button
                      asChild
                      className="bg-coral-5 hover:bg-coral-6 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-coral-5/25 flex-shrink-0"
                    >
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-16 pt-8 border-t border-neutralbg-5">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button
                variant="outline"
                className="hover:bg-coral-1 hover:border-coral-4 hover:text-coral-7 transition-all duration-300 hover:scale-105 active:scale-95 bg-transparent border-coral-3"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                More articles
              </Button>
            </Link>

            <div className="text-sm text-muted-foreground">Published {formatDate(blog.createdAt)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
