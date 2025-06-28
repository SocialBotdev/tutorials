import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    content: {
        type: [ContentSchema],
        required: true,
    },
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);