import { Link } from 'react-router-dom'
import { Clock, ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/data/blog'

interface Props {
  post: BlogPost
}

export function BlogCard({ post }: Props) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="card-tool group flex flex-col overflow-hidden no-underline"
    >
      <div className="aspect-[16/9] overflow-hidden bg-muted">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" /> {post.readTime}
          </span>
        </div>
        <h3 className="mb-2 font-display text-sm font-semibold leading-snug tracking-tight text-foreground line-clamp-2">
          {post.title}
        </h3>
        <p className="mb-4 text-xs leading-relaxed text-muted-foreground line-clamp-2">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-1 text-xs font-medium text-primary">
          Read more <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
