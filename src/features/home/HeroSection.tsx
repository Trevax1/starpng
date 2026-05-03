import { Link } from 'react-router-dom'
import { Image, Download, Zap, Shield } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pb-0 pt-20">
      {/* Dot grid */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" />

      {/* Subtle radial glow behind content */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(139,92,246,0.08),transparent)]" />

      <div className="relative container max-w-5xl text-center">
        {/* Badge */}
        <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-600 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
          Free · No Sign-Up · No Uploads · 100% Private
        </div>

        {/* Heading */}
        <h1 className="animate-fade-up animation-delay-100 font-display text-5xl font-bold leading-[1.08] tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
          Edit images smarter<br />
          <span className="italic text-violet-600">with precision</span>
        </h1>

        <p className="animate-fade-up animation-delay-200 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
          Free, professional image editing tools — fast, easy, and private.
          Resize, convert, compress, apply filters, and remove backgrounds — no uploads required.
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-up animation-delay-300 mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/resize"
            className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition-all hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-violet-300 active:translate-y-0 no-underline"
          >
            Get Started Free
          </Link>
          <a
            href="#how"
            className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 no-underline"
          >
            How It Works
          </a>
        </div>

        {/* Trust badges */}
        <div className="animate-fade-up animation-delay-500 mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
          {[
            { icon: Shield,   text: '100% Private'     },
            { icon: Zap,      text: 'Lightning Fast'   },
            { icon: Download, text: 'Instant Download' },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="flex items-center gap-1.5">
              <Icon className="h-4 w-4 text-violet-500" /> {text}
            </span>
          ))}
        </div>

        {/* Dashboard mockup */}
        <div className="animate-fade-up animation-delay-700 relative mx-auto mt-16 max-w-3xl">
          {/* Glow halo */}
          <div className="absolute -inset-6 rounded-3xl bg-violet-100/50 blur-3xl" />

          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-black/8">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/80 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs font-medium text-gray-400">StarPNG — Image Compressor</span>
            </div>

            <div className="grid grid-cols-3 gap-0">
              {/* Sidebar */}
              <div className="border-r border-gray-100 bg-gray-50/60 p-4 space-y-1.5">
                {['Resize & Crop', 'Convert', 'Compress', 'Filters', 'Background Remover'].map((t, i) => (
                  <div
                    key={t}
                    className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      i === 2
                        ? 'bg-violet-600 text-white shadow-sm'
                        : 'text-gray-500 hover:bg-white hover:text-gray-700 cursor-default'
                    }`}
                  >
                    {t}
                  </div>
                ))}
              </div>

              {/* Main area */}
              <div className="col-span-2 p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Compress Image</p>

                {/* Drop zone */}
                <div className="mb-4 flex h-28 items-center justify-center rounded-xl border-2 border-dashed border-violet-200 bg-violet-50/60">
                  <div className="text-center">
                    <Image className="mx-auto h-6 w-6 text-violet-400" />
                    <p className="mt-1 text-xs font-medium text-violet-400">photo.jpg dropped</p>
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Quality</span>
                    <span className="text-xs font-bold text-violet-600">82%</span>
                  </div>
                  <div className="relative h-1.5 rounded-full bg-gray-100">
                    <div className="h-1.5 w-4/5 rounded-full bg-violet-500" />
                    <div className="absolute top-1/2 left-[80%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-violet-600 shadow-sm" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {[
                      { label: 'Original', val: '3.2 MB', color: 'text-gray-900'  },
                      { label: 'Saved',    val: '67%',    color: 'text-green-600' },
                      { label: 'Output',   val: '1.1 MB', color: 'text-violet-600'},
                    ].map(s => (
                      <div key={s.label} className="rounded-xl bg-gray-50 p-2 text-center ring-1 ring-gray-100">
                        <div className={`text-sm font-bold ${s.color}`}>{s.val}</div>
                        <div className="text-[10px] text-gray-400">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full rounded-xl bg-violet-600 py-2 text-xs font-semibold text-white shadow-sm shadow-violet-200 transition-colors hover:bg-violet-700">
                    Download Compressed Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="h-24 bg-gradient-to-b from-transparent to-white" />
    </section>
  )
}
