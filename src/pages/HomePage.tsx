import { HeroSection } from '@/features/home/HeroSection'
import { ToolsSection } from '@/features/home/ToolsSection'
import { WhySection } from '@/features/home/WhySection'
import { HowItWorksSection } from '@/features/home/HowItWorksSection'
import { TestimonialsSection } from '@/features/home/TestimonialsSection'
import { FAQSection } from '@/features/home/FAQSection'
import { CTASection } from '@/features/home/CTASection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ToolsSection />
      <WhySection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
