import type React from "react"
import type { Metadata } from "next"
import { Inter, DM_Serif_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
})

export const metadata: Metadata = {
  title: "Yash's Articles – Tutorials on Web Dev, AI, and Design",
  description:
    "Curated articles and directories on modern web development, AI agents, chatbots, and UI/UX design. Learn by building with Yash.",
  keywords: [
    "web development",
    "AI tutorials",
    "chatbots",
    "indie hacking",
    "design systems",
    "frontend development",
    "tech learning",
  ],
  authors: [{ name: "Yash", url: "https://tutorials.okayash.tech" }],
  creator: "Yash",
  metadataBase: new URL("https://tutorials.okayash.tech"),
  openGraph: {
    title: "Yash's Articles – Learn Web Dev, AI & Design",
    description:
      "Build faster with curated tech tutorials and resources from Yash. Topics: AI, front-end, design systems, chatbots, and indie hacking.",
    url: "https://tutorials.okayash.tech",
    siteName: "Yash's Articles",
    images: [
      {
        url: "/og-image.png", // Create a custom Open Graph image
        width: 1200,
        height: 630,
        alt: "Yash's Articles",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash's Articles – Tutorials on Web Dev, AI, and Design",
    description:
      "Curated tutorials and insights from Yash on front-end, AI agents, chatbots, and design systems.",
    creator: "@kathokeyash05", // Replace with your actual handle
    images: ["/og-image.png"],
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dmSerifDisplay.variable} font-sans bg-neutralbg-3 text-neutralbg-11`}>
        {children}
      </body>
    </html>
  )
}
