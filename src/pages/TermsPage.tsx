export function TermsPage() {
  return (
    <main className="min-h-screen">
      <div className="border-b border-primary/8 bg-white py-16">
        <div className="container max-w-3xl">
          <span className="mb-4 inline-block rounded-full border border-primary/15 bg-primary/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">Legal</span>
          <h1 className="font-display text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-3 text-muted-foreground">By using StarPNG, you agree to these terms.</p>
        </div>
      </div>
      <div className="container max-w-3xl py-12 space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-3">1. Use of Service</h2>
          <p>StarPNG provides free, browser-based image editing tools. You may use these tools for personal or commercial purposes. You are responsible for the images you process.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-3">2. No Warranty</h2>
          <p>StarPNG is provided "as is" without warranty of any kind. We make no guarantees about uptime, accuracy, or fitness for any particular purpose.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-3">3. Prohibited Use</h2>
          <p>You may not use StarPNG to process illegal content, infringe on intellectual property rights, or attempt to compromise the security or integrity of the service.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-3">4. Intellectual Property</h2>
          <p>StarPNG and its source code are the property of their respective owners. The tools are provided for personal and commercial use of images, not for redistribution of the software itself.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-3">5. Changes to Terms</h2>
          <p>We reserve the right to update these terms at any time. Continued use of StarPNG after changes constitutes acceptance of the updated terms.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-3">6. Contact</h2>
          <p>For questions about these terms, contact <a href="mailto:hello@starpng.com" className="text-primary hover:underline">hello@starpng.com</a>.</p>
        </section>
      </div>
    </main>
  )
}
