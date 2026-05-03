import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { ToolLayout } from '@/components/layout/ToolLayout'
import { ImageDropzone } from '@/components/shared/ImageDropzone'
import { downloadBlob } from '@/lib/canvas'

export function BackgroundRemoverTool() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [resultUrl, setResultUrl] = useState('')
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [view, setView] = useState<'result' | 'original'>('result')

  const handleFile = async (file: File) => {
    setOriginalUrl(URL.createObjectURL(file))
    setResultUrl('')
    setResultBlob(null)
    setStatus('loading')

    try {
      const { removeBackground } = await import('@imgly/background-removal')
      const blob = await removeBackground(file, {
        model: 'isnet_quint8',
        output: { format: 'image/png', quality: 1 },
      })
      const url = URL.createObjectURL(blob)
      setResultUrl(url)
      setResultBlob(blob)
      setStatus('done')
    } catch (e) {
      console.error(e)
      setStatus('error')
    }
  }

  const handleDownload = () => {
    if (resultBlob) downloadBlob(resultBlob, 'cutout.png')
  }

  return (
    <ToolLayout
      title="Background Remover"
      subtitle="Fast, private cutouts with AI-powered edge cleanup and a manual brush editor"
      tip="Works with photos, product images, and portraits. Processing happens entirely in your browser using a local AI model — your images never leave your device."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {status === 'idle' && <ImageDropzone onFile={handleFile} />}

          {status === 'loading' && (
            <div className="flex min-h-60 flex-col items-center justify-center gap-4 rounded-2xl border border-primary/10 bg-white p-8 text-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <div>
                <p className="font-display font-semibold text-foreground">Preparing cutout…</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  The AI model is loading for the first time. This may take 10–30 seconds.
                </p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="flex min-h-60 flex-col items-center justify-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <p className="font-semibold text-red-600">Processing failed</p>
              <p className="text-sm text-red-500">Please try again with a different image.</p>
              <button onClick={() => setStatus('idle')} className="btn-outline text-sm">Try Again</button>
            </div>
          )}

          {status === 'done' && (
            <>
              {/* Toggle */}
              <div className="flex gap-2">
                {(['result', 'original'] as const).map(v => (
                  <button key={v} onClick={() => setView(v)}
                    className={`flex-1 rounded-xl border py-2 text-sm font-medium capitalize transition-all ${view === v ? 'border-primary bg-primary/10 text-primary' : 'border-border'}`}>
                    {v === 'result' ? 'Result' : 'Original'}
                  </button>
                ))}
              </div>
              <div className="overflow-hidden rounded-2xl border border-primary/10">
                <div className="checkerboard">
                  <img
                    src={view === 'result' ? resultUrl : originalUrl}
                    alt={view}
                    className="w-full object-contain max-h-72"
                  />
                </div>
              </div>
              <button onClick={() => setStatus('idle')} className="btn-outline w-full text-sm justify-center">
                Remove another background
              </button>
            </>
          )}
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-primary/10 bg-white p-6">
            <h3 className="mb-4 font-display font-semibold">How it works</h3>
            <ul className="space-y-3">
              {[
                'Upload your image using the dropzone',
                'Our local AI model detects the subject',
                'The background is removed with edge cleanup',
                'Download your transparent PNG cutout',
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <button onClick={handleDownload} disabled={status !== 'done'}
            className="btn-primary w-full justify-center py-3 disabled:opacity-50">
            <Download className="h-4 w-4" /> Download Transparent PNG
          </button>
        </div>
      </div>

      <style>{`.checkerboard { background-image: repeating-conic-gradient(#d0d0d0 0% 25%, white 0% 50%); background-size: 20px 20px; }`}</style>
    </ToolLayout>
  )
}
