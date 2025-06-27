"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchSectionProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function SearchSection({ searchQuery, onSearchChange }: SearchSectionProps) {
  return (
    <div className="bg-neutralbg-1 border-b border-coral-3/20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-serif-display text-neutralbg-11 mb-2">Find Your Next Read</h2>
            <p className="text-muted-foreground">Search through articles by title, content, or topics</p>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-coral-5 transition-colors duration-300" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e: { target: { value: string } }) => onSearchChange(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg border-2 border-coral-3/30 focus:border-coral-5 focus:ring-coral-5/20 transition-all duration-300 rounded-xl bg-white/80 backdrop-blur-sm hover:border-coral-4/50 hover:shadow-lg hover:shadow-coral-5/5"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-coral-5/5 to-coral-3/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  )
}
