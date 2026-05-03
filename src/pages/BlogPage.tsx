import { BLOG_POSTS } from '@/data/blog'
import { BlogCard } from '@/components/shared/BlogCard'

export function BlogPage() {
  return (
    <main className="min-h-screen">
      <div className="border-b border-primary/8 bg-white py-16">
        <div className="container max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full border border-primary/15 bg-primary/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">From the Blog</span>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Tips, Guides & Insights</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Learn image optimization, format differences, privacy best practices, and more.
          </p>
        </div>
      </div>
      <div className="container py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  )
}
