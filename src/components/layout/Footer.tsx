import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { TOOLS } from '@/data/tools'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-gray-950">
      <div className="container max-w-6xl py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="mb-4 flex items-center gap-2 no-underline">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 shadow-md shadow-violet-900/40">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">StarPNG</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500">
              Free, professional image editing tools — fast, private, and entirely in your browser.
            </p>
          </div>

          {/* Tools */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">Tools</p>
            <ul className="space-y-2.5">
              {TOOLS.slice(0, 5).map(t => (
                <li key={t.id}>
                  <Link
                    to={t.route}
                    className="text-sm text-gray-400 no-underline transition-colors hover:text-white"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Tools */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">More Tools</p>
            <ul className="space-y-2.5">
              {TOOLS.slice(5).map(t => (
                <li key={t.id}>
                  <Link
                    to={t.route}
                    className="text-sm text-gray-400 no-underline transition-colors hover:text-white"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">Company</p>
            <ul className="space-y-2.5">
              {[
                { label: 'Blog',             to: '/blog'    },
                { label: 'About',            to: '/about'   },
                { label: 'Contact',          to: '/contact' },
                { label: 'Privacy Policy',   to: '/privacy' },
                { label: 'Terms of Service', to: '/terms'   },
              ].map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-gray-400 no-underline transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-6 text-center sm:flex-row">
          <p className="text-xs text-gray-600">© {year} StarPNG. All rights reserved.</p>
          <p className="text-xs text-gray-600">100% Free &amp; Private · No uploads · No sign-ups</p>
        </div>
      </div>
    </footer>
  )
}
