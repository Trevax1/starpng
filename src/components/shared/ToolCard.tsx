import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Tool } from '@/data/tools'

interface Props {
  tool: Tool
}

export function ToolCard({ tool }: Props) {
  return (
    <Link to={tool.route} className="card-tool group p-6 no-underline">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
           style={{ background: `${tool.color}18` }}>
        {tool.emoji}
      </div>
      <h3 className="mb-1.5 font-display text-base font-semibold tracking-tight text-foreground">
        {tool.name}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{tool.shortDesc}</p>
      <div className="mt-auto flex items-center gap-1.5 text-sm font-medium"
           style={{ color: tool.color }}>
        Try it free
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </Link>
  )
}
