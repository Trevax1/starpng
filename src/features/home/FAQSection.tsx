import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/cn'

const FAQS = [
  {
    q: 'Is StarPNG really free?',
    a: 'Yes — completely free, forever. No subscriptions, no usage limits, no credit card required. StarPNG is and will always be free to use.',
  },
  {
    q: 'Are my images private? Do they get uploaded?',
    a: 'Your images never leave your device. All processing — resizing, compression, filtering, background removal — runs entirely in your browser using WebAssembly and the Canvas API. We have no servers receiving your files.',
  },
  {
    q: 'What file formats are supported?',
    a: 'Input: PNG, JPG/JPEG, WebP, BMP, GIF (first frame). Output depends on the tool — most tools support PNG, JPG, and WebP. The Convert tool lets you switch between all supported formats explicitly.',
  },
  {
    q: 'Do I need to create an account?',
    a: "No account, no sign-up, no email. Open a tool, drop your image, download the result. That's it.",
  },
  {
    q: 'Will compressing reduce my image quality?',
    a: 'Only if you want it to. The quality slider lets you control the trade-off between file size and visual quality. At 80–90% quality the difference is virtually invisible, while savings can exceed 50–70%.',
  },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="border-t border-gray-100 bg-gray-50 py-24">
      <div className="container max-w-3xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-violet-600">FAQ</p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Frequently asked
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {FAQS.map((faq, i) => (
            <div key={i} className={cn('border-b border-gray-100 last:border-0')}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-gray-50"
                aria-expanded={open === i}
              >
                <span className="text-sm font-semibold text-gray-900 md:text-base">{faq.q}</span>
                <span className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors duration-200',
                  open === i ? 'bg-violet-100 text-violet-600' : 'bg-gray-100 text-gray-400'
                )}>
                  {open === i ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </span>
              </button>

              {/* CSS grid trick for smooth height transition */}
              <div className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-in-out',
                open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}>
                <div className="overflow-hidden">
                  <div className="border-t border-gray-100 px-6 pb-5 pt-4">
                    <p className="text-sm leading-relaxed text-gray-500">{faq.a}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
