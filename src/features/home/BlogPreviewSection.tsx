import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { BLOG_POSTS } from '@/data/blog'
import { BlogCard } from '@/components/shared/BlogCard'
import { SectionHeader } from '@/components/shared/SectionHeader'

export function BlogPreviewSection() {
  return (
    <section className="py-20 md:py-28 border-t border-primary/8 section-glow">
      <div className="container">
        <div className="flex items-end justify-between mb-14">
          <SectionHeader
            eyebrow="From the Blog"
            title="Tips, Guides & Insights"
            center={false}
            className="mb-0"
          />
          <Link to="/blog" className="hidden items-center gap-1.5 text-sm font-medium text-primary hover:underline md:flex no-underline">
            View All Posts <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {BLOG_POSTS.slice(0, 3).map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="mt-6 flex justify-center md:hidden">
          <Link to="/blog" className="btn-outline">View All Posts</Link>
        </div>
      </div>
    </section>
  )
}
