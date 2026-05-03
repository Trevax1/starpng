import { useState } from 'react'
import { Cloud, Sliders, Download, Check } from 'lucide-react'
import { cn } from '@/lib/cn'

const TABS = [
  {
    id: 'upload',
    label: 'Upload',
    icon: Cloud,
    step: '1',
    heading: 'Drop your image — instantly',
    desc: 'No accounts or cloud storage. Drag & drop or click to select. Your file loads directly in the browser.',
    checks: [
      'PNG, JPG, WebP, and BMP supported',
      'No file size limits (browser only)',
      'Works on desktop, tablet & mobile',
    ],
    mockup: (
      <div className="flex h-full items-center justify-center p-8">
        <div className="w-full rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50 p-10 text-center">
          <Cloud className="mx-auto mb-3 h-10 w-10 text-violet-400" />
          <p className="text-sm font-semibold text-violet-700">Drop image here</p>
          <p className="mt-1 text-xs text-violet-400">or click to browse</p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {['PNG', 'JPG', 'WebP', 'BMP'].map(f => (
              <span key={f} className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-600">{f}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'adjust',
    label: 'Adjust',
    icon: Sliders,
    step: '2',
    heading: 'Tweak settings in real time',
    desc: 'Every control updates the preview instantly. Resize, compress, filter, rotate — all with live feedback.',
    checks: [
      'Real-time preview for every change',
      'Quality slider, dimension inputs, presets',
      'Undo-friendly — adjust until it\'s perfect',
    ],
    mockup: (
      <div className="flex h-full items-center justify-center p-8">
        <div className="w-full space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-gray-500">Quality</span>
            <span className="font-bold text-violet-600">82%</span>
          </div>
          <div className="relative h-2 rounded-full bg-gray-100">
            <div className="h-2 w-4/5 rounded-full bg-violet-500" />
            <div className="absolute top-1/2 left-4/5 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-violet-600 shadow" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-gray-200 px-3 py-2 text-center">
              <div className="text-xs text-gray-400">Width</div>
              <div className="text-sm font-bold text-gray-900">1200 px</div>
            </div>
            <div className="rounded-lg border border-gray-200 px-3 py-2 text-center">
              <div className="text-xs text-gray-400">Height</div>
              <div className="text-sm font-bold text-gray-900">800 px</div>
            </div>
          </div>
          <div className="flex gap-1.5">
            {['Instagram', 'Twitter', '16:9'].map(p => (
              <span key={p} className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">{p}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'download',
    label: 'Download',
    icon: Download,
    step: '3',
    heading: 'Download in one click',
    desc: 'Your processed image is ready immediately. No waiting, no email, no account required.',
    checks: [
      'Instant download — no waiting',
      'Output in PNG, JPG, or WebP',
      'Image never uploaded to any server',
    ],
    mockup: (
      <div className="flex h-full items-center justify-center p-8">
        <div className="w-full space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <Check className="h-7 w-7 text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">photo-compressed.jpg</p>
            <p className="text-xs text-gray-400 mt-0.5">1.1 MB · 1200 × 800</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl bg-gray-50 px-3 py-2">
              <div className="text-xs text-gray-400">Before</div>
              <div className="text-sm font-bold text-gray-700">3.2 MB</div>
            </div>
            <div className="rounded-xl bg-green-50 px-3 py-2">
              <div className="text-xs text-gray-400">After</div>
              <div className="text-sm font-bold text-green-700">1.1 MB</div>
            </div>
          </div>
          <div className="rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white">
            ↓ Download
          </div>
        </div>
      </div>
    ),
  },
]

export function HowItWorksSection() {
  const [active, setActive] = useState(0)
  const tab = TABS[active]

  return (
    <section id="how" className="border-t border-gray-100 bg-gray-50 py-24">
      <div className="container max-w-6xl">
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-violet-600">How It Works</p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Three steps. No sign-up.
          </h2>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left: mockup */}
          <div className="order-2 lg:order-1">
            <div className="h-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              {tab.mockup}
            </div>
          </div>

          {/* Right: tabs + content */}
          <div className="order-1 lg:order-2">
            {/* Tab buttons */}
            <div className="mb-8 flex gap-2">
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActive(i)}
                  className={cn(
                    'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all',
                    active === i
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-200'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
                  )}
                >
                  <span className={cn(
                    'flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold',
                    active === i ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                  )}>
                    {t.step}
                  </span>
                  {t.label}
                </button>
              ))}
            </div>

            <h3 className="font-display mb-3 text-2xl font-bold text-gray-900">{tab.heading}</h3>
            <p className="mb-6 text-base leading-relaxed text-gray-500">{tab.desc}</p>

            <ul className="space-y-3">
              {tab.checks.map(c => (
                <li key={c} className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                    <Check className="h-3 w-3" />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
