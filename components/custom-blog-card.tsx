"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { BlogPost } from "@/lib/types"
import { Tutorial } from "@/lib/random-blogs"
import { isRecentPost, formatDate } from "@/lib/utils"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"

interface BlogCardProps {
  // Allow both BlogPost or Tutorial
  blog: BlogPost | Tutorial
}

export function BlogCardCustom({ blog }: BlogCardProps) {
  const isRecent = isRecentPost(blog.createdAt)

  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl hover:shadow-coral-5/10 transition-all duration-500 hover:-translate-y-2 bg-neutralbg-1 hover:border-coral-4/20">
      {/* Updated the link to go to /custom-blog/{slug} */}
      <Link href={`/custom-blog/${blog.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {isRecent && (
            <div className="absolute top-4 right-4 animate-slide-up">
              <Badge
                variant="default"
                className="text-xs font-medium shadow-lg shadow-coral-5/25 backdrop-blur-sm animate-pulse"
              >
                New
              </Badge>
            </div>
          )}

          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-coral-1/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-coral-4/20 group-hover:scale-110 transition-transform duration-300">
              <ArrowUpRight className="w-4 h-4 text-coral-6" />
            </div>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(blog.createdAt)}
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {/* Use optional chaining to avoid errors for tutorials that have no content array */}
              {Math.ceil(((blog as BlogPost).content?.length ?? 0) * 2)} min read
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif-display text-xl font-medium leading-tight group-hover:text-coral-6 transition-colors duration-300 line-clamp-2">
              {blog.title}
            </h3>

            <p className="text-muted-foreground leading-relaxed line-clamp-3 text-sm">{blog.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={tag}
                className="text-xs hover:scale-105 transition-all duration-200 cursor-pointer bg-coral-2 text-coral-8 hover:bg-coral-3 hover:shadow-sm"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {tag}
              </Badge>
            ))}
            {blog.tags.length > 3 && (
              <Badge variant="outline" className="text-xs border-dashed border-coral-3 text-coral-7">
                +{blog.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}