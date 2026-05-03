import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Freelance Designer',
    avatar: 'SC',
    quote: 'I used to juggle three different apps for image editing. StarPNG replaced them all — and it\'s free. The compression tool alone saves me hours every week.',
  },
  {
    name: 'Marcus Rivera',
    role: 'Content Creator',
    avatar: 'MR',
    quote: 'The background remover is incredibly accurate. No more expensive subscriptions for a feature I use once in a while. StarPNG just works, every single time.',
  },
  {
    name: 'Aisha Patel',
    role: 'Product Manager',
    avatar: 'AP',
    quote: 'Privacy was my main concern. Knowing my images never leave my browser is a game changer. I use the resize tool daily for social media assets.',
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setCurrent(i => (i + 1) % TESTIMONIALS.length)

  const t = TESTIMONIALS[current]

  return (
    <section className="border-t border-gray-100 bg-white py-24">
      <div className="container max-w-4xl">
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-violet-600">Reviews</p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Loved by creators worldwide
          </h2>
        </div>

        {/* Testimonial card */}
        <div className="relative rounded-3xl border border-gray-200 bg-gray-50 px-8 py-12 md:px-16 md:py-14">
          {/* Quote mark */}
          <div className="mb-6 font-display text-7xl leading-none text-violet-200 select-none">"</div>

          {/* Quote text */}
          <p className="text-xl font-medium leading-relaxed text-gray-800 md:text-2xl">
            {t.quote}
          </p>

          {/* Author */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                {t.avatar}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-violet-600' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
