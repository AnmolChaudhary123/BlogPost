import { cache } from 'react';
import connectDB from '@/lib/mongodb';
import { Blog } from '@/models';

export const getBlogBySlug = cache(async (slug: string) => {
  await connectDB();
  const blog = await Blog.findOne({ slug, status: 'published' }).populate('author', 'name');
  return blog;
});
