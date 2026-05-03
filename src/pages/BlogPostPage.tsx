import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { BLOG_POSTS } from '@/data/blog'

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = BLOG_POSTS.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-display text-3xl font-bold">Post not found</h1>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <div className="border-b border-primary/8 bg-white py-12">
        <div className="container max-w-3xl">
          <Link to="/blog" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors no-underline w-fit">
            <ArrowLeft className="h-3.5 w-3.5" /> All Posts
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{post.category}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {post.readTime} read</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="h-3 w-3" /> {post.date}</span>
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
        </div>
      </div>

      {post.image && (
        <div className="border-b border-primary/8">
          <div className="container max-w-3xl py-6">
            <img src={post.image} alt={post.title}
              className="w-full rounded-2xl object-cover max-h-72"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
          </div>
        </div>
      )}

      <div className="container max-w-3xl py-10">
        <div className="prose prose-slate max-w-none text-foreground">
          {post.content.split('\n').map((line, i) => {
            const trimmed = line.trim()
            if (!trimmed) return <br key={i} />
            if (trimmed.startsWith('## ')) return <h2 key={i} className="font-display text-2xl font-bold mt-8 mb-4">{trimmed.slice(3)}</h2>
            if (trimmed.startsWith('### ')) return <h3 key={i} className="font-display text-xl font-semibold mt-6 mb-3">{trimmed.slice(4)}</h3>
            if (trimmed.startsWith('- ')) return <li key={i} className="ml-4 text-muted-foreground leading-relaxed">{trimmed.slice(2)}</li>
            if (trimmed.startsWith('|')) return null // skip tables for now
            if (trimmed.startsWith('```')) return null
            return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{trimmed}</p>
          })}
        </div>
      </div>
    </main>
  )
}
