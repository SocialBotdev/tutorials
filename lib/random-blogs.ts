import { BlogPost } from "./types";

// Define the Tutorial interface
export interface Tutorial {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    image?: string;
    createdAt: Date
}

// Export the tutorials array
export const tutorials: Tutorial[] = [
    {
        slug: 'whatsappbot',
        title: 'WhatsApp Cloud API Chatbot',
        description: 'An interactive tutorial to guide you through building your first chatbot using the WhatsApp Cloud API, from setup to sending messages.',
        tags: ['beginner', 'whatsapp', 'api'],
        image: "https://i.pinimg.com/736x/8d/ae/3d/8dae3ddd088993287e0d628746d45eed.jpg",
        createdAt: new Date("2024-01-20")
    },
    {
        slug: 'gradients-guide',
        title: 'Professional Gradient Guide',
        description: 'Explore the psychology behind professional gradients, including how subtle gradients create depth, guide user attention, add visual interest, and establish visual hierarchy. Learn foundational color theory concepts such as monochromatic schemes, analogous colors, temperature, and opacity for layering.',
        tags: ['intermediate', 'design', 'color-theory'],
        image: "https://i.pinimg.com/736x/16/a6/55/16a6554f00efd6987469fc9a52e56f29.jpg",
        createdAt:  new Date("2024-01-20")
    },
    // Add more tutorials here
];