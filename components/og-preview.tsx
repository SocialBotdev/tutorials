"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ExternalLink, Globe } from "lucide-react"

interface OGData {
  title?: string
  description?: string
  image?: string
  favicon?: string
}

interface OGPreviewProps {
  url: string
  className?: string
}

export function OGPreview({ url, className = "" }: OGPreviewProps) {
  const [ogData, setOgData] = useState<OGData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchOGData = async () => {
      try {
        setLoading(true)
        setError(false)

        const response = await fetch(`/api/og-preview?url=${encodeURIComponent(url)}`)
        if (!response.ok) throw new Error("Failed to fetch")

        const data = await response.json()
        setOgData(data)
      } catch (err) {
        setError(true)
        console.error("Failed to fetch OG data:", err)
      } finally {
        setLoading(false)
      }
    }

    if (url) {
      fetchOGData()
    }
  }, [url])

  if (loading) {
    return (
      <div className={`animate-pulse bg-neutralbg-3 rounded-lg p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-neutralbg-5 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-neutralbg-5 rounded w-3/4"></div>
            <div className="h-3 bg-neutralbg-5 rounded w-full"></div>
            <div className="h-3 bg-neutralbg-5 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !ogData) {
    return (
      <div className={`bg-neutralbg-1 border border-neutralbg-5 rounded-lg p-4 ${className}`}>
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm font-medium truncate">{url}</p>
            <p className="text-xs text-muted-foreground">Preview unavailable</p>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bg-neutralbg-1 border border-neutralbg-5 rounded-lg p-4 hover:border-coral-4 transition-colors animate-fade-in ${className}`}
    >
      <div className="flex items-start gap-3">
        {ogData.favicon && (
          <div className="flex-shrink-0">
            <Image
              src={ogData.favicon || "/placeholder.svg"}
              alt="Favicon"
              width={20}
              height={20}
              className="rounded"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium line-clamp-1 mb-1">{ogData.title || "Untitled"}</h4>
          {ogData.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{ogData.description}</p>
          )}
          <p className="text-xs text-coral-5 truncate">{url}</p>
        </div>

        {ogData.image && (
          <div className="flex-shrink-0">
            <Image
              src={ogData.image || "/placeholder.svg"}
              alt="Preview"
              width={60}
              height={40}
              className="rounded object-cover"
            />
          </div>
        )}
      </div>
    </div>
  )
}
