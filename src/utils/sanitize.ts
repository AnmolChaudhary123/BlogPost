// utils/sanitize.ts
export function sanitizeBlogPreview(blog: any) {
  return {
    _id: blog._id.toString(),
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    featuredImage: blog.featuredImage,
    category: blog.category,
    tags: blog.tags, // Note plural, check your model
    views: blog.views,
    readTime: blog.readTime,
    publishedAt: blog.publishedAt ? blog.publishedAt.toISOString() : null,
    createdAt: blog.createdAt.toISOString(),
    author: {
      name: blog.author?.name || '',
    },
  };
}
