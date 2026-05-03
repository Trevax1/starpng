import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'

interface Props {
  title: string
  subtitle: string
  tip?: string
  children: ReactNode
}

export function ToolLayout({ title, subtitle, tip, children }: Props) {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-primary/8 bg-white">
        <div className="container py-6">
          <Link to="/" className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground no-underline w-fit">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
          <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
          <p className="mt-1.5 text-muted-foreground">{subtitle}</p>
          <div className="mt-3 flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">100% Private — processed in your browser</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        {children}
      </div>

      {/* Tip */}
      {tip && (
        <div className="container pb-10">
          <div className="rounded-2xl border border-primary/10 bg-primary/[0.03] p-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">💡 Tip: </span>{tip}
            </p>
          </div>
        </div>
      )}
    </main>
  )
}
