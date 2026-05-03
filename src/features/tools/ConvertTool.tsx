import { useState } from 'react'
import { Download } from 'lucide-react'
import { ToolLayout } from '@/components/layout/ToolLayout'
import { ImageDropzone } from '@/components/shared/ImageDropzone'
import { loadImage, imageToCanvas, canvasToBlob, downloadBlob } from '@/lib/canvas'

type Format = 'image/png' | 'image/jpeg' | 'image/webp' | 'image/bmp'
const FORMATS: { label: string; value: Format; ext: string }[] = [
  { label: 'PNG', value: 'image/png', ext: 'png' },
  { label: 'JPG', value: 'image/jpeg', ext: 'jpg' },
  { label: 'WebP', value: 'image/webp', ext: 'webp' },
  { label: 'BMP', value: 'image/bmp', ext: 'bmp' },
]

export function ConvertTool() {
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [preview, setPreview] = useState('')
  const [format, setFormat] = useState<Format>('image/webp')
  const [quality, setQuality] = useState(90)
  const [processing, setProcessing] = useState(false)

  const isLossy = format === 'image/jpeg' || format === 'image/webp'

  const handleFile = async (file: File) => {
    const image = await loadImage(file)
    setImg(image)
    setPreview(URL.createObjectURL(file))
  }

  const handleDownload = async () => {
    if (!img) return
    setProcessing(true)
    const canvas = imageToCanvas(img)
    const q = isLossy ? quality / 100 : undefined
    const blob = await canvasToBlob(canvas, format, q)
    const ext = FORMATS.find(f => f.value === format)!.ext
    downloadBlob(blob, `converted.${ext}`)
    setProcessing(false)
  }

  return (
    <ToolLayout
      title="Convert Between Image Formats"
      subtitle="Convert between PNG, JPG, WebP, and BMP formats"
      tip="Converting to a lossless format like PNG preserves full quality. Converting to lossy formats (JPG, WebP) applies compression — use the quality slider to balance file size and visual fidelity. We recommend 80–90% quality for most use cases."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          {!img ? (
            <ImageDropzone onFile={handleFile} />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
              <img src={preview} alt="Preview" className="w-full object-contain max-h-72" />
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-primary/10 bg-white p-6 space-y-5">
            <div>
              <p className="mb-2.5 text-sm font-semibold">Output Format</p>
              <div className="grid grid-cols-4 gap-2">
                {FORMATS.map(f => (
                  <button
                    key={f.value}
                    onClick={() => setFormat(f.value)}
                    className={`rounded-xl border py-2.5 text-sm font-medium transition-all ${
                      format === f.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/30 text-foreground'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {isLossy && (
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">Quality</span>
                  <span className="font-semibold text-primary">{quality}%</span>
                </div>
                <input type="range" min={5} max={100} value={quality}
                  onChange={e => setQuality(Number(e.target.value))}
                  className="w-full accent-primary" />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>Smaller file</span><span>Better quality</span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleDownload}
            disabled={!img || processing}
            className="btn-primary w-full justify-center py-3 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {processing ? 'Converting…' : `Download as ${FORMATS.find(f => f.value === format)?.label}`}
          </button>
        </div>
      </div>
    </ToolLayout>
  )
}
