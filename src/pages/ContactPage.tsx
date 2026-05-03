import { useState } from 'react'
import { Mail, Send, Check } from 'lucide-react'

export function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <main className="min-h-screen">
      <div className="border-b border-primary/8 bg-white py-16">
        <div className="container max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-primary/15 bg-primary/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">Get in Touch</span>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Contact Us</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Have a question, suggestion, or bug report? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="container max-w-xl py-16">
        {sent ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <Check className="h-7 w-7 text-green-600" />
            </div>
            <h2 className="font-display text-xl font-bold">Message Sent!</h2>
            <p className="text-muted-foreground">We'll get back to you as soon as possible.</p>
            <button onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}
              className="btn-outline mt-2">Send another message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl border border-primary/10 bg-white p-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Name</label>
              <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Your name" className="input-field" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com" className="input-field" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Message</label>
              <textarea required rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Tell us what's on your mind…" className="input-field resize-none" />
            </div>
            <button type="submit" className="btn-primary w-full justify-center py-3">
              <Send className="h-4 w-4" /> Send Message
            </button>
          </form>
        )}

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>Or email us directly at <a href="mailto:hello@starpng.com" className="text-primary hover:underline">hello@starpng.com</a></span>
        </div>
      </div>
    </main>
  )
}
