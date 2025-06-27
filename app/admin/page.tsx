"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BlogCard } from "@/components/list-blog-card"
import { OGPreview } from "@/components/og-preview"
import { blogFormSchema, type BlogFormData } from "@/lib/validations"
import { generateSlug } from "@/lib/utils"
import { Plus, X, Upload, Eye, Shield, Code, Sparkles } from "lucide-react"
import { toast } from "sonner"

export default function AdminPage() {
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    description: "",
    image: "",
    tags: [],
    content: [],
  })

  const [jsonInput, setJsonInput] = useState("")
  const [newTag, setNewTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const validateJSON = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString)
      const result = blogFormSchema.safeParse(parsed)

      if (result.success) {
        setFormData(result.data)
        setValidationErrors([])
        return true
      } else {
        setValidationErrors(result.error.errors.map((err) => `${err.path.join(".")}: ${err.message}`))
        return false
      }
    } catch (error) {
      setValidationErrors(["Invalid JSON format"])
      return false
    }
  }

  const handleJSONChange = (value: string) => {
    setJsonInput(value)
    if (value.trim()) {
      validateJSON(value)
    } else {
      setValidationErrors([])
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      const result = blogFormSchema.safeParse(formData)
      if (!result.success) {
        setValidationErrors(result.error.errors.map((err) => `${err.path.join(".")}: ${err.message}`))
        return
      }

      const slug = generateSlug(formData.title)
      const blogPost = {
        ...formData,
        slug,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogPost),
      })

      if (!response.ok) {
        throw new Error("Failed to create blog post")
      }

      toast.success("Article published successfully!")

      // Reset form
      setFormData({
        title: "",
        description: "",
        image: "",
        tags: [],
        content: [],
      })
      setJsonInput("")
      setValidationErrors([])
    } catch (error) {
      toast.error("Failed to publish article")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const previewBlog = {
    _id: "preview",
    ...formData,
    slug: generateSlug(formData.title),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return (
    <div className="min-h-screen bg-neutralbg-3">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-coral-5 via-coral-6 to-coral-7 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8" />
            <h1 className="text-h1-mobile md:text-h1-desktop font-serif-display">Admin Panel</h1>
          </div>
          <p className="text-coral-1 text-lg">Create and publish new articles</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* JSON Input Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-coral-5" />
                  JSON Input
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Label htmlFor="json-input" className="text-sm font-medium">
                    Paste your article JSON data
                  </Label>
                  <Textarea
                    id="json-input"
                    placeholder={`{
  "title": "Your Article Title",
  "description": "Brief description...",
  "image": "https://example.com/image.jpg",
  "tags": ["tag1", "tag2"],
  "content": [
    {
      "title": "Resource Title",
      "description": "Resource description...",
      "url": "https://example.com"
    }
  ]
}`}
                    value={jsonInput}
                    onChange={(e) => handleJSONChange(e.target.value)}
                    className={`min-h-[200px] font-mono text-sm transition-all duration-300 ${
                      validationErrors.length > 0
                        ? "border-red-500 focus:border-red-500 bg-red-50/50"
                        : jsonInput && validationErrors.length === 0
                          ? "border-coral-5 focus:border-coral-5 bg-coral-1/50"
                          : "focus:border-coral-4 focus:ring-coral-4/20"
                    }`}
                  />

                  {validationErrors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-slide-up">
                      <h4 className="text-sm font-medium text-red-800 mb-2 flex items-center gap-2">
                        <X className="w-4 h-4" />
                        Validation Errors:
                      </h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        {validationErrors.map((error, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-500 mt-0.5">•</span>
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {jsonInput && validationErrors.length === 0 && (
                    <div className="bg-coral-1 border border-coral-4 rounded-lg p-3 animate-slide-up">
                      <p className="text-sm text-coral-8 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        JSON is valid and ready to publish!
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Manual Form Fields */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Manual Entry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter article title..."
                    className="focus:border-coral-4 focus:ring-coral-4/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter article description..."
                    className="focus:border-coral-4 focus:ring-coral-4/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    className="focus:border-coral-4 focus:ring-coral-4/20"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag..."
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      className="focus:border-coral-4 focus:ring-coral-4/20"
                    />
                    <Button
                      onClick={addTag}
                      size="icon"
                      variant="outline"
                      className="hover:bg-coral-1 hover:border-coral-4 hover:scale-105 active:scale-95 transition-all duration-300 bg-transparent border-coral-3"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {formData.tags.length > 0 && (
                    <>
                      <Separator />
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <Badge
                            key={tag}
                            className="flex items-center gap-1 hover:scale-105 transition-transform duration-200 bg-coral-2 text-coral-8 hover:bg-coral-3"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            {tag}
                            <button
                              onClick={() => removeTag(tag)}
                              className="hover:bg-accent-700/20 rounded-full p-0.5 transition-colors duration-200"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Content Resources Preview */}
            {formData.content.length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Content Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.content.map((item, index) => (
                    <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                      <OGPreview url={item.url} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || validationErrors.length > 0 || !formData.title}
                className="flex-1 bg-coral-5 hover:bg-coral-6 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-coral-5/25"
              >
                {isSubmitting ? (
                  <>
                    <Upload className="w-4 h-4 mr-2 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Publish Article
                  </>
                )}
              </Button>

              <Button
                onClick={() => setShowPreview(!showPreview)}
                variant="outline"
                className="flex items-center gap-2 hover:bg-coral-1 hover:border-coral-4 hover:text-coral-7 hover:scale-105 active:scale-95 transition-all duration-300 bg-transparent border-coral-3"
                disabled={!formData.title}
              >
                <Eye className="w-4 h-4" />
                {showPreview ? "Hide" : "Preview"}
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            {showPreview && formData.title && (
              <Card className="border-0 shadow-lg animate-slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-accent-700" />
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BlogCard blog={previewBlog} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
