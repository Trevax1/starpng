import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="border-t border-gray-100 bg-white py-24">
      <div className="container max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl bg-gray-950 px-8 py-16 text-center md:px-16 md:py-20">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 h-48 w-48 translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl" />
          </div>

          <div className="relative">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-violet-400">
              100% Free &amp; Private
            </p>
            <h2 className="font-display mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
              Ready to edit your images?
            </h2>
            <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-gray-400">
              No sign-up. No limits. No uploads. Just open a tool and start editing — it's that simple.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/resize"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-violet-500"
              >
                Start Editing Free <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#tools"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-white/10"
              >
                Explore All Tools
              </a>
            </div>

            <p className="mt-5 text-xs text-gray-600">No credit card required · Works in any browser</p>
          </div>
        </div>
      </div>
    </section>
  )
}
