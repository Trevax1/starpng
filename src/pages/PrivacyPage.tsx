export function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <div className="border-b border-primary/8 bg-white py-16">
        <div className="container max-w-3xl">
          <span className="mb-4 inline-block rounded-full border border-primary/15 bg-primary/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">Legal</span>
          <h1 className="font-display text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-muted-foreground">StarPNG respects your privacy. Your images are never uploaded or stored.</p>
        </div>
      </div>
      <div className="container max-w-3xl py-12 space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-3">1. No Image Uploads</h2>
          <p>StarPNG processes all images entirely within your browser using JavaScript. Your image files are never transmitted to any server, stored, or accessible to anyone other than you.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-3">2. No Personal Data Collection</h2>
          <p>We do not collect, store, or process any personal information. We have no user accounts, no sign-up forms, and no tracking of individual users.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-3">3. Analytics</h2>
          <p>We may use privacy-respecting, anonymous analytics to understand aggregate traffic patterns. This data contains no personally identifiable information.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-3">4. Cookies</h2>
          <p>StarPNG does not use tracking cookies. Browser storage (localStorage) may be used to save your preferences locally on your device only.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-3">5. Third-Party Services</h2>
          <p>StarPNG loads fonts from Google Fonts. No other third-party services with access to user data are used.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-3">6. Contact</h2>
          <p>If you have any questions about this privacy policy, please contact us at <a href="mailto:hello@starpng.com" className="text-primary hover:underline">hello@starpng.com</a>.</p>
        </section>
      </div>
    </main>
  )
}
