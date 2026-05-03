import { cn } from '@/lib/cn'

interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  center?: boolean
  className?: string
}

export function SectionHeader({ eyebrow, title, subtitle, center = true, className }: Props) {
  return (
    <div className={cn(center && 'text-center', 'mb-14', className)}>
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full border border-primary/15 bg-primary/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{subtitle}</p>
      )}
    </div>
  )
}
