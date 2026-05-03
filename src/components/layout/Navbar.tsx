import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react'
import { TOOLS } from '@/data/tools'
import { cn } from '@/lib/cn'

const NAV_LINKS = [
  { label: 'Home',         href: '/'        },
  { label: 'Tools',        href: '/#tools', dropdown: true },
  { label: 'How It Works', href: '/#how'    },
  { label: 'Blog',         href: '/blog'    },
  { label: 'About',        href: '/about'   },
]

export function Navbar() {
  const [open, setOpen]           = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const { pathname }              = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={cn(
      'sticky top-0 z-50 transition-all duration-300',
      scrolled
        ? 'border-b border-transparent bg-white/90 shadow-sm shadow-black/5 backdrop-blur-md'
        : 'border-b border-gray-100 bg-white',
    )}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 shadow-md shadow-violet-200/60 transition-transform duration-200 hover:scale-105">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-gray-900">StarPNG</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map(link =>
            link.dropdown ? (
              <div
                key="tools-dd"
                className="relative"
                onMouseEnter={() => setToolsOpen(true)}
                onMouseLeave={() => setToolsOpen(false)}
              >
                <button className={cn(
                  'flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                )}>
                  {link.label}
                  <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', toolsOpen && 'rotate-180')} />
                </button>

                <div className={cn(
                  'absolute left-1/2 top-full -translate-x-1/2 pt-2 z-50 transition-all duration-200',
                  toolsOpen ? 'pointer-events-auto opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-1'
                )}>
                  <div className="grid w-[640px] grid-cols-2 gap-1 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl shadow-black/8">
                    {TOOLS.map(tool => (
                      <Link key={tool.id} to={tool.route} onClick={() => setToolsOpen(false)}
                        className="flex items-center gap-3 rounded-xl p-3 text-sm transition-colors hover:bg-gray-50 no-underline group">
                        <span className="text-xl transition-transform duration-150 group-hover:scale-110">{tool.emoji}</span>
                        <div>
                          <div className="font-semibold text-gray-900">{tool.name}</div>
                          <div className="text-xs leading-snug text-gray-400">{tool.shortDesc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors no-underline',
                  !link.href.includes('#') && pathname === link.href
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* CTA */}
        <div className="hidden items-center md:flex">
          <Link
            to="/resize"
            className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white no-underline transition-all hover:bg-gray-700 hover:-translate-y-px active:translate-y-0"
          >
            Get Started Free
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 transition-colors hover:bg-gray-50 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-gray-100 bg-white px-5 pb-5 md:hidden">
          <div className="mt-3 space-y-1">
            {TOOLS.map(tool => (
              <Link key={tool.id} to={tool.route} onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm no-underline transition-colors hover:bg-gray-50">
                <span className="text-lg">{tool.emoji}</span>
                <span className="font-medium text-gray-900">{tool.name}</span>
              </Link>
            ))}
            <div className="my-2 h-px bg-gray-100" />
            {[{ label: 'Blog', to: '/blog' }, { label: 'About', to: '/about' }].map(l => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-gray-900 no-underline transition-colors hover:bg-gray-50">
                {l.label}
              </Link>
            ))}
            <Link to="/resize" onClick={() => setOpen(false)}
              className="mt-3 block rounded-xl bg-gray-900 py-3 text-center text-sm font-semibold text-white no-underline transition-colors hover:bg-gray-700">
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
