"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Hash, Filter } from "lucide-react"
import { useRef, useEffect, useState } from "react"

interface TagsSectionProps {
  availableTags: string[]
  selectedTags: Set<string>
  onTagToggle: (tag: string) => void
  onClearAll: () => void
}

export function TagsSection({ availableTags, selectedTags, onTagToggle, onClearAll }: TagsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    const handleResize = () => checkScrollButtons()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [availableTags])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (availableTags.length === 0) return null

  return (
    <div className="bg-gradient-to-r from-coral-1/50 via-neutralbg-1 to-coral-1/50 border-b border-coral-3/20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-coral-6" />
            <h3 className="text-xl font-serif-display text-neutralbg-11">Explore Topics</h3>
            <div className="h-px bg-gradient-to-r from-coral-5 to-coral-3 w-16"></div>
          </div>

          {selectedTags.size > 0 && (
            <Button
              onClick={onClearAll}
              variant="ghost"
              size="sm"
              className="text-coral-6 hover:text-coral-7 hover:bg-coral-1 transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <X className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Clear filters ({selectedTags.size})
            </Button>
          )}
        </div>

        {/* Selected Tags */}
        {selectedTags.size > 0 && (
          <div className="mb-6">
            <p className="text-sm text-coral-7 mb-3 font-medium">Active filters:</p>
            <div className="flex flex-wrap gap-2">
              {Array.from(selectedTags).map((tag) => (
                <Badge
                  key={tag}
                  className="bg-coral-5 text-white hover:bg-coral-6 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-coral-5/25 group"
                  onClick={() => onTagToggle(tag)}
                >
                  <Hash className="w-3 h-3 mr-1" />
                  {tag}
                  <X className="w-3 h-3 ml-2 group-hover:rotate-90 transition-transform duration-300" />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Horizontal Scrolling Tags */}
        <div className="relative group">
          {/* Left Scroll Button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-coral-1/90 hover:bg-coral-2 border border-coral-4/30 rounded-full p-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <svg className="w-4 h-4 text-coral-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Right Scroll Button */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-coral-1/90 hover:bg-coral-2 border border-coral-4/30 rounded-full p-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <svg className="w-4 h-4 text-coral-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Tags Container */}
          <div
            ref={scrollRef}
            onScroll={checkScrollButtons}
            className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-8 scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {availableTags.map((tag, index) => {
              const isSelected = selectedTags.has(tag)
              return (
                <button
                  key={tag}
                  onClick={() => onTagToggle(tag)}
                  className={`group relative flex-shrink-0 inline-flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 animate-slide-up ${
                    isSelected
                      ? "bg-coral-5 text-white shadow-lg shadow-coral-5/25 hover:bg-coral-6"
                      : "bg-coral-2/80 text-coral-8 hover:bg-coral-3 hover:shadow-md border border-coral-3/50 backdrop-blur-sm"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  aria-pressed={isSelected}
                >
                  <Hash className="w-4 h-4" />
                  <span className="whitespace-nowrap">{tag}</span>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-coral-5/20 to-coral-3/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-coral-7 rounded-full animate-pulse" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Fade gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-coral-1/50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-coral-1/50 to-transparent pointer-events-none" />
        </div>

        {/* Stats */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-coral-7">{availableTags.length}</span> topics available
            {selectedTags.size > 0 && (
              <>
                {" • "}
                <span className="font-medium text-coral-7">{selectedTags.size}</span> selected
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
