import { Shield, Zap, Globe, Heart } from 'lucide-react'

export function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="border-b border-primary/8 bg-white py-16">
        <div className="container max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full border border-primary/15 bg-primary/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">Our Story</span>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">About StarPNG</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            StarPNG was born from a simple idea: professional image editing should be free,
            fast, and accessible to everyone — no complicated software, no subscriptions, no compromises.
          </p>
        </div>
      </div>

      <div className="container max-w-3xl py-16 space-y-16">
        <section>
          <h2 className="font-display text-2xl font-bold tracking-tight mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            We believe that everyone — from professional designers to everyday users — deserves access to
            high-quality image editing tools. StarPNG provides 10 professional-grade tools that run entirely
            in your browser. No uploads, no sign-ups, no cost. Ever.
          </p>
        </section>

        <div className="grid gap-5 sm:grid-cols-2">
          {[
            { icon: Shield, title: 'Privacy First', desc: 'Your images never leave your device. We have no servers that store your files.' },
            { icon: Zap, title: 'Lightning Fast', desc: 'Processing happens locally on your hardware — no upload wait times.' },
            { icon: Globe, title: 'Works Everywhere', desc: 'Any device with a modern browser. No installs, no plugins, no hassle.' },
            { icon: Heart, title: 'Free Forever', desc: 'StarPNG is and always will be 100% free. No premium tiers, no limits.' },
          ].map(f => (
            <div key={f.title} className="rounded-2xl border border-primary/10 bg-white p-6">
              <f.icon className="mb-3 h-6 w-6 text-primary" />
              <h3 className="mb-2 font-display font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        <section>
          <h2 className="font-display text-2xl font-bold tracking-tight mb-4">The Technology</h2>
          <p className="text-muted-foreground leading-relaxed">
            StarPNG is built with React and runs in the browser using the Canvas API for image processing
            and ONNX Runtime for AI-powered background removal. The background removal model is downloaded
            once and cached — subsequent uses are instant. All other tools work offline immediately.
          </p>
        </section>
      </div>
    </main>
  )
}
