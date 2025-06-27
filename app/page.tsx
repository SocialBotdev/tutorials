"use client"

import { useState, useEffect, useMemo } from "react"
import { BlogCard } from "@/components/list-blog-card"
import { BlogCardCustom } from "@/components/custom-blog-card"
import { SearchSection } from "@/components/search-section"
import { TagsSection } from "@/components/tags-section"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/types"
import { tutorials, Tutorial } from "@/lib/random-blogs"
import { Loader2, Rss } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import './globals.css'

export default function HomePage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())

  const isBlogPost = (blog: BlogPost | Tutorial): blog is BlogPost => {
    return "content" in blog
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/list-blog")
        if (response.ok) {
          const data = await response.json()
          setBlogs(
            data.map((blog: any) => ({
              ...blog,
              createdAt: new Date(blog.createdAt),
              updatedAt: new Date(blog.updatedAt),
            })),
          )
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const combinedBlogs = useMemo(() => {
    const allBlogs = [...blogs, ...tutorials]
    return allBlogs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }, [blogs])

  const filteredBlogs = useMemo(() => {
    return combinedBlogs.filter((blog) => {
      const matchesSearch =
        searchQuery === "" ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesTags = selectedTags.size === 0 || blog.tags.some((tag) => selectedTags.has(tag))

      return matchesSearch && matchesTags
    })
  }, [combinedBlogs, searchQuery, selectedTags])

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>()
    combinedBlogs.forEach((blog) => {
      blog.tags.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [combinedBlogs])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(tag)) {
        newSet.delete(tag)
      } else {
        newSet.add(tag)
      }
      return newSet
    })
  }

  const handleClearAll = () => {
    setSelectedTags(new Set())
    setSearchQuery("")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutralbg-3 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-coral-5" />
          <span className="text-xl font-medium">Loading articles...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutralbg-3">
      <div className="bg-gradient-to-br from-coral-1 via-coral-2 to-coral-3 border-b border-coral-4/20">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-h1-mobile md:text-h1-desktop font-serif-display text-neutralbg-11 mb-6 animate-fade-in">
              Thoughts & Insights
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
              Exploring technology, design, and the intersection of creativity and code
            </p>

            <div className="flex items-center justify-center gap-4 animate-slide-up">
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-coral-2 hover:border-coral-5 hover:text-coral-7 transition-all duration-300 hover:scale-105 active:scale-95 bg-white/80 backdrop-blur-sm border-coral-4"
                asChild
              >
                <a href="https://linkedin.com/in/yashkathoke" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="https://img.icons8.com/?size=100&id=13930&format=png&color=000000"
                    alt="LinkedIn"
                    width={16}
                    height={16}
                    className="w-4 h-4 mr-2 inline"
                  />
                  LinkedIn
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-coral-2 hover:border-coral-5 hover:text-coral-7 transition-all duration-300 hover:scale-105 active:scale-95 bg-white/80 backdrop-blur-sm border-coral-4"
                asChild
              >
                <a href="https://x.com/kathokeyash05" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000"
                    alt="X"
                    width={16}
                    height={16}
                    className="w-4 h-4 mr-2 inline"
                  />
                  X
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <SearchSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <TagsSection
        availableTags={availableTags}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        onClearAll={handleClearAll}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-coral-2 rounded-full flex items-center justify-center mx-auto mb-6">
                <Rss className="w-12 h-12 text-coral-6" />
              </div>
              <h3 className="text-2xl font-serif-display text-neutralbg-11 mb-4">
                {combinedBlogs.length === 0 ? "No articles yet" : "No articles match your filters"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {combinedBlogs.length === 0
                  ? "Check back soon for new content!"
                  : "Try adjusting your search or clearing the filters."}
              </p>
              {(selectedTags.size > 0 || searchQuery) && (
                <Button
                  onClick={handleClearAll}
                  variant="outline"
                  className="hover:bg-coral-2 hover:border-coral-5 hover:text-coral-7 transition-all duration-300 bg-white border-coral-4"
                >
                  Clear all filters
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-serif-display text-neutralbg-11">Latest Articles</h2>
                <div className="h-px bg-gradient-to-r from-coral-5 via-coral-4 to-coral-3 flex-1 max-w-24"></div>
              </div>
              <div className="text-sm text-coral-7 bg-coral-1 px-4 py-2 rounded-full border border-coral-3 font-medium">
                {filteredBlogs.length} article{filteredBlogs.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <div
                  key={blog.slug}
                  className="animate-slide-up h-full flex"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-full">
                    {isBlogPost(blog) ? (
                      <BlogCard blog={blog} />
                    ) : (
                      <BlogCardCustom blog={blog} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <footer className="bg-neutralbg-2 border-t border-coral-3/20 mt-20 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex items-center gap-4">
              <div className="h-px bg-gradient-to-r from-coral-3 to-coral-5 w-12"></div>
              <span className="font-serif-display text-neutralbg-11 text-xl">Tutorial Hub</span>
              <div className="h-px bg-gradient-to-r from-coral-5 to-coral-3 w-12"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-neutralbg-9">
              <Link href="/policy/terms" className="hover:text-coral-6 transition-colors">
                <div>Terms</div>
              </Link>
              <Link href="/policy/refund" className="hover:text-coral-6 transition-colors">
                <div>Refund</div>
              </Link>
              <Link href="/policy/shipping" className="hover:text-coral-6 transition-colors">
                <div>Shipping</div>
              </Link>
              <Link href="/policy/privacy" className="hover:text-coral-6 transition-colors">
                <div>Privacy</div>
              </Link>
              <Link href="/policy/contact" className="hover:text-coral-6 transition-colors">
                <div>Contact</div>
              </Link>
            </div>

            <p className="text-neutralbg-8 text-sm">
              &copy; {new Date().getFullYear()} Tutorial Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
