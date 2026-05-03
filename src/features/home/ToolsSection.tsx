import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { TOOLS } from '@/data/tools'

const FEATURED = [
  {
    id: 'background-remover',
    title: 'Background Remover',
    desc: 'AI-powered cutouts with edge cleanup and manual brush. Works with photos, products, and portraits in seconds.',
    route: '/background-remover',
    mockup: (
      <div className="flex h-full items-center justify-center">
        <div className="relative w-36 h-28 rounded-xl overflow-hidden">
          <div className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(45deg,#e5e7eb 25%,transparent 25%),linear-gradient(-45deg,#e5e7eb 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e5e7eb 75%),linear-gradient(-45deg,transparent 75%,#e5e7eb 75%)', backgroundSize: '14px 14px', backgroundPosition: '0 0,0 7px,7px -7px,-7px 0' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl drop-shadow-sm">🧑</span>
          </div>
          <div className="absolute top-2 right-2 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">AI</div>
        </div>
      </div>
    ),
    accent: 'bg-blue-50',
    link: 'text-blue-600',
  },
  {
    id: 'resize',
    title: 'Resize & Crop',
    desc: 'Resize to any dimension with pixel precision. Social media presets for Instagram, Twitter, YouTube, and more.',
    route: '/resize',
    mockup: (
      <div className="flex h-full items-center justify-center">
        <div className="space-y-2.5 w-40">
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg bg-white border border-violet-200 px-3 py-1.5 text-center text-xs font-bold text-gray-700 shadow-sm">1200 px</div>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white text-xs font-bold shadow">↔</div>
            <div className="flex-1 rounded-lg bg-white border border-violet-200 px-3 py-1.5 text-center text-xs font-bold text-gray-700 shadow-sm">800 px</div>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {['Instagram', 'Twitter', 'YouTube'].map(p => (
              <span key={p} className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700">{p}</span>
            ))}
          </div>
          <div className="h-1.5 rounded-full bg-gray-200">
            <div className="h-1.5 w-3/4 rounded-full bg-violet-500" />
          </div>
        </div>
      </div>
    ),
    accent: 'bg-violet-50',
    link: 'text-violet-600',
  },
  {
    id: 'compress',
    title: 'Compress',
    desc: 'Reduce file size by up to 80% without visible quality loss. Live before/after size comparison included.',
    route: '/compress',
    mockup: (
      <div className="flex h-full items-center justify-center px-6">
        <div className="w-full space-y-2.5">
          <div className="flex justify-between text-xs font-medium text-gray-600">
            <span>Original</span><span className="font-bold text-gray-900">3.2 MB</span>
          </div>
          <div className="h-2 rounded-full bg-gray-200">
            <div className="h-2 rounded-full bg-red-400 w-full" />
          </div>
          <div className="flex justify-between text-xs font-medium text-gray-600">
            <span>Compressed</span><span className="font-bold text-green-600">1.1 MB</span>
          </div>
          <div className="h-2 rounded-full bg-gray-200">
            <div className="h-2 rounded-full bg-green-500" style={{ width: '34%' }} />
          </div>
          <div className="pt-0.5 text-center">
            <span className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-bold text-green-700">−67% smaller</span>
          </div>
        </div>
      </div>
    ),
    accent: 'bg-green-50',
    link: 'text-green-600',
  },
]

export function ToolsSection() {
  return (
    <section id="tools" className="border-t border-gray-100 bg-white py-24">
      <div className="container max-w-6xl">
        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-violet-600">All Tools</p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Tools that deliver results
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-500">
            10 professional image tools that run entirely in your browser — no uploads, no accounts, no limits.
          </p>
        </div>

        {/* 3 featured cards */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {FEATURED.map(f => (
            <div
              key={f.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-100"
            >
              <div className={`flex h-48 items-center justify-center border-b border-gray-100 ${f.accent}`}>
                {f.mockup}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display mb-2 text-lg font-bold text-gray-900">{f.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-gray-500">{f.desc}</p>
                <Link
                  to={f.route}
                  className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold no-underline transition-all group-hover:gap-2 ${f.link}`}
                >
                  Try it <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* All tools grid */}
        <div>
          <p className="mb-5 text-center text-xs font-bold uppercase tracking-widest text-gray-400">All 10 tools</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {TOOLS.map(tool => (
              <Link
                key={tool.id}
                to={tool.route}
                className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4 text-center no-underline transition-all duration-200 hover:border-violet-200 hover:bg-white hover:shadow-sm hover:text-violet-700"
              >
                <span className="text-2xl">{tool.emoji}</span>
                <span className="text-xs font-medium leading-tight text-gray-700">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
