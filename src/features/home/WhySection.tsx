import { Shield, Zap, Smartphone, Star } from 'lucide-react'

const FEATURES = [
  {
    icon: Shield,
    title: 'Privacy First',
    desc: 'Your images never leave your device. All processing happens locally in the browser — no servers, no risk.',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'No upload wait times. Processing starts instantly because everything runs on your own hardware.',
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-50',
  },
  {
    icon: Smartphone,
    title: 'Works Everywhere',
    desc: 'Works on any device with a modern browser — desktop, tablet, or mobile. No installs required.',
    iconColor: 'text-green-500',
    iconBg: 'bg-green-50',
  },
  {
    icon: Star,
    title: 'Free Forever',
    desc: 'No subscriptions, no usage limits, no credit card. StarPNG is and always will be completely free.',
    iconColor: 'text-violet-500',
    iconBg: 'bg-violet-50',
  },
]

export function WhySection() {
  return (
    <section className="border-t border-gray-100 bg-gray-50 py-24">
      <div className="container max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-violet-600">Why StarPNG</p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Built different, by design
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-500">
            Built on real feedback from designers, developers, and creators who care about speed and privacy.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(f => (
            <div
              key={f.title}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-100"
            >
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${f.iconBg} transition-transform duration-200 group-hover:scale-110`}>
                <f.icon className={`h-5 w-5 ${f.iconColor}`} />
              </div>
              <h3 className="mb-2 font-display text-base font-semibold tracking-tight text-gray-900">{f.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
