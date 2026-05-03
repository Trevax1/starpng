import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { ContactPage } from '@/pages/ContactPage'
import { PrivacyPage } from '@/pages/PrivacyPage'
import { TermsPage } from '@/pages/TermsPage'
import { BlogPage } from '@/pages/BlogPage'
import { BlogPostPage } from '@/pages/BlogPostPage'
import { ResizeTool } from '@/features/tools/ResizeTool'
import { ConvertTool } from '@/features/tools/ConvertTool'
import { CompressTool } from '@/features/tools/CompressTool'
import { FiltersTool } from '@/features/tools/FiltersTool'
import { BackgroundRemoverTool } from '@/features/tools/BackgroundRemoverTool'
import { WatermarkTool } from '@/features/tools/WatermarkTool'
import { RotateTool } from '@/features/tools/RotateTool'
import { BlurTool } from '@/features/tools/BlurTool'
import { ColorPickerTool } from '@/features/tools/ColorPickerTool'
import { MemeGeneratorTool } from '@/features/tools/MemeGeneratorTool'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="font-display text-5xl font-bold gradient-hero-text">404</h1>
      <p className="text-xl text-foreground font-semibold">Page not found</p>
      <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn-primary mt-2">Back to Home</a>
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/"                   element={<HomePage />} />
        <Route path="/resize"             element={<ResizeTool />} />
        <Route path="/convert"            element={<ConvertTool />} />
        <Route path="/compress"           element={<CompressTool />} />
        <Route path="/filters"            element={<FiltersTool />} />
        <Route path="/background-remover" element={<BackgroundRemoverTool />} />
        <Route path="/watermark"          element={<WatermarkTool />} />
        <Route path="/rotate"             element={<RotateTool />} />
        <Route path="/blur"               element={<BlurTool />} />
        <Route path="/color-picker"       element={<ColorPickerTool />} />
        <Route path="/meme-generator"     element={<MemeGeneratorTool />} />
        <Route path="/blog"               element={<BlogPage />} />
        <Route path="/blog/:slug"         element={<BlogPostPage />} />
        <Route path="/about"              element={<AboutPage />} />
        <Route path="/contact"            element={<ContactPage />} />
        <Route path="/privacy"            element={<PrivacyPage />} />
        <Route path="/terms"              element={<TermsPage />} />
        <Route path="*"                   element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  )
}
